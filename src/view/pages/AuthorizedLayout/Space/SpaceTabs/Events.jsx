import { useCallback, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditIcon } from "../../../../../img/svg/Icons.jsx";
import InfiniteScrollTrigger from "../../../../components/InfinityScroll/InfiniteScrollTrigger.jsx"; // <-- Новый компонент

// Хуки и контекст
import { useLockBodyScroll } from "../../../../../hooks/useLockBodyScroll.js";
import { useSpace } from "../../../../../context/SpaceContext.jsx";
import { useInfiniteScroll } from "../../../../components/InfinityScroll/useInfiniteScroll.js"; // <-- Новый хук

import { SPECIAL } from "../../../../../constants/constants.js";
import {useGetPagedEvents} from "../../../../../tanStackQueries/event/useGetPagedEvents.js";
import EditEventModal from "../../../../components/Modals/EditEventModal.jsx";
import {useUpdateEventUsers} from "../../../../../tanStackQueries/event/useUpdateEventUsers.js";
import {useUpdateEvent} from "../../../../../tanStackQueries/event/useUpdateEvent.js";
import {useDeleteEvent} from "../../../../../tanStackQueries/event/useDeleteEvent.js";
import {useCreateEvent} from "../../../../../tanStackQueries/event/useCreateEvent.js";
import {useValidate} from "../../../../../hooks/useValidate.js";
import {useToast} from "../../../../../context/Toast/useToast.js";
import {getValidationErrorsMap} from "../../../../../utils/errorMapping.js";

const FORM_CONFIG = {
    name: true,
    location: false,
    description: false,
    coordinatorId: false,
    date: true,
    timeStart: true,
    timeEnd: true,
    color: true,
}

export default function Events() {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const validation = useValidate(FORM_CONFIG);
    const { showToast } = useToast();

    const { validateForm, addExternalError, resetErrors } = validation;

    // --- Queries ---
    const eventQuery = useGetPagedEvents(null, domain);

    const events = eventQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = eventQuery.data?.pages?.[0]?.totalCount ?? 0;

    const loadMoreRef = useInfiniteScroll(eventQuery);

    const { mutateAsync: createEventMutate } = useCreateEvent(domain);
    const { mutate: deleteEventMutate } = useDeleteEvent(domain);
    const { mutateAsync: updateEventMutate } = useUpdateEvent(domain);
    const { mutate: updateEventUsersMutate } = useUpdateEventUsers(domain);

    // --- State ---
    const [selectedEvent, setSelectedEvent] = useState(null);
    useLockBodyScroll(!!selectedEvent);

    // --- Handlers ---
    const handleEdit = (event) => setSelectedEvent({ event: event, type: "edit" });
    const handleClose = useCallback(() => {
        setSelectedEvent(null);
        resetErrors();
    }, [resetErrors])
    //
    const handleCreate = () => {
        setSelectedEvent({
            event: {
                id: null,
                name: "",
                location: "",
                description: "",
                coordinator: null,
                dateStart: null,
                dateEnd: null,
                color: SPECIAL.TAG_COLORS.gray.name,
            }, type: "create"
        });
    };

    const handleDeleteEvent = useCallback((id) => {
        deleteEventMutate(id);
    }, [deleteEventMutate]);

    const isUpdateDataEmpty = (updateData) => {
        return (
            (!updateData.add || updateData.add.length === 0) &&
            (!updateData.remove || updateData.remove.length === 0) &&
            (!updateData.addFromTags || updateData.addFromTags.length === 0)
        );
    };

    const handleSaveEvent = useCallback(async (updatedEvent, usersToAdd, type, repeatRule, isRepeating) => {
        const isValid = validateForm(updatedEvent);
        if (!isValid) return;

        const request = {
            name: updatedEvent.name,
            location: updatedEvent.location,
            description: updatedEvent.description,
            coordinatorId: updatedEvent.coordinator?.id,
            dateStart: updatedEvent.dateStart,
            dateEnd: updatedEvent.dateEnd,
            color: updatedEvent.color,
        }

        try {
            if (type === "edit") {
                const currentEvent = selectedEvent.event;

                const currentObj = {
                    name: currentEvent.name,
                    location: currentEvent.location,
                    description: currentEvent.description,
                    coordinatorId: currentEvent.coordinator?.id,
                    dateStart: currentEvent.dateStart,
                    dateEnd: currentEvent.dateEnd,
                    color: currentEvent.color,
                }

                const changedData = getChangedFields(currentObj, request);

                if (changedData) {
                    await updateEventMutate({
                        id: updatedEvent.id,
                        data: changedData
                    });

                    showToast("Успішно!", "Ви оновили подію.")
                }

                updateEventUsersMutate({
                    eventId: updatedEvent.id,
                    data: usersToAdd
                });
            } else {
                if (!isRepeating) repeatRule = null;

                const created = await createEventMutate({...request, repeatInfo: repeatRule, confirmed: true});

                showToast("Успішно!", "Ви створили подію.")

                if (isUpdateDataEmpty(usersToAdd)){
                    const data = {...usersToAdd, eventIds: created.eventIds};

                    updateEventUsersMutate({
                        eventId: created.id,
                        data: data
                    });
                }
            }

            handleClose();
        } catch (error) {
            const errors = getValidationErrorsMap(error);
            for (const [key, value] of Object.entries(errors)) {
                if (key === "default") {
                    showToast("Помилка!", "Сталась невідома помилка, спробуйте пізніше.", "error")
                    continue;
                }
                addExternalError(key, value);
            }
        }

    }, [validateForm, handleClose, selectedEvent?.event, updateEventUsersMutate, updateEventMutate, showToast, createEventMutate, addExternalError]);

    // console.log(events);

    return (
        <div className="pt-5 px-9 w-full h-full flex flex-col overflow-auto">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Події</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="flex items-start">
                    <button
                        type="button"
                        onClick={handleCreate}
                        className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Створити подію
                    </button>
                </div>
            </div>

            <div className="mt-8 w-full flex flex-col min-h-0">
                <div className="flex w-full border-b border-gray-300 py-3.5 text-sm font-semibold text-main-black z-10">
                    <div className="w-7/20 text-left">
                        Подія – {totalCount}
                    </div>
                    <div className="w-1/5 text-center">
                        Учасники
                    </div>
                    <div className="w-1/5 text-center">
                        Дата події
                    </div>
                    <div className="w-1/5 text-center">
                        Створив
                    </div>
                    <div className="w-1/40 min-w-8">
                        <span className="sr-only">Edit</span>
                    </div>
                    <div className="w-1/40 min-w-8">
                        <span className="sr-only">Delete</span>
                    </div>
                </div>

                <div className="w-full overflow-y-auto h-full min-h-40 no-scrollbar">
                    <div className="flex flex-col divide-y divide-gray-200">
                        {events?.map((event) => (
                            <div key={event.id} className="flex w-full items-center py-3">
                                <div className="w-7/20 text-sm break-all text-main-black">
                                    {event.name}
                                </div>
                                <div className="w-1/5 text-sm break-all text-second-text text-center">
                                    {event.usersCount}
                                </div>
                                <div className="w-1/5 text-sm break-all text-second-text text-center">
                                    {new Date(event.dateStart).toLocaleDateString('uk-UA', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                                <div className="w-1/5 text-center text-sm text-second-text flex justify-center">
                                    {event.creator.fullName}
                                </div>
                                <div className="w-1/40 text-right flex justify-end min-w-8">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        title="Редагувати"
                                        className="p-1 inline-block group relative"
                                    >
                                        <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                    </button>
                                </div>
                                <div className="w-1/40 flex justify-end min-w-8">
                                    <button
                                        onClick={() => handleDeleteEvent(event.id)}
                                        title="Видалити"
                                        className="p-1 inline-block text-second-text hover:text-red-600"
                                    >
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <InfiniteScrollTrigger
                        ref={loadMoreRef}
                        isFetching={eventQuery.isFetchingNextPage}
                    />
                </div>
            </div>

            {selectedEvent && (
                <EditEventModal
                    handleClose={handleClose}
                    selected={selectedEvent}
                    handleSaveEvent={handleSaveEvent}
                    handleDeleteEvent={handleDeleteEvent}
                    validation={validation}
                />
            )}
        </div>
    );
}

function getChangedFields(original, updated) {
    const changed = {};

    Object.keys(updated).forEach(key => {
        if (key === "coordinatorId") {
            changed[key] = updated[key];
            return;
        }
        if (updated[key] !== original[key]) {
            changed[key] = updated[key];
        }
    });

    return changed;
}