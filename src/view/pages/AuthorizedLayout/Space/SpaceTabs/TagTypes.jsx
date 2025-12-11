import { useCallback, useState } from "react";
import { EditIcon } from "../../../../../img/svg/Icons.jsx";
import DeleteIcon from '@mui/icons-material/Delete';

// Компоненты
import EditTagTypeModal from "../../../../components/Modals/EditTagTypeModal.jsx";
import InfiniteScrollTrigger from "../../../../components/InfinityScroll/InfiniteScrollTrigger.jsx";

// Хуки и контекст
import { useLockBodyScroll } from "../../../../../hooks/useLockBodyScroll.js";
import { useSpace } from "../../../../../context/Space/useSpace.js";
import { useInfiniteScroll } from "../../../../components/InfinityScroll/useInfiniteScroll.js";

// Запросы
import { useCreateTagType } from "../../../../../tanStackQueries/tagType/useCreateTagType.js";
import { useGetTagTypes } from "../../../../../tanStackQueries/tagType/useGetTagTypes.js";
import { useDeleteTagType } from "../../../../../tanStackQueries/tagType/useDeleteTagType.js";
import {useValidate} from "../../../../../hooks/useValidate.js";
import {getChangedFields} from "../../../../../utils/getChangedFields.js";
import {getValidationErrorsMap} from "../../../../../utils/errorMapping.js";
import {useToast} from "../../../../../context/Toast/useToast.js";
import {useUpdateTagType} from "../../../../../tanStackQueries/tagType/useUpdateTagType.js";

const FORM_CONFIG = {
    name: true
}

export default function TagTypes() {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const validation = useValidate(FORM_CONFIG);
    const { showToast } = useToast();

    const { validateForm, addExternalError, resetErrors } = validation;

    // --- Queries ---
    const tagTypesQuery = useGetTagTypes(domain);

    const tagTypes = tagTypesQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = tagTypesQuery.data?.pages?.[0]?.totalCount ?? 0;

    // --- Infinite Scroll Hook ---
    const loadMoreRef = useInfiniteScroll(tagTypesQuery);

    // --- Mutations ---
    const { mutateAsync: createTagTypeMutate } = useCreateTagType(domain);
    const { mutateAsync: updateTagTypeMutate } = useUpdateTagType(domain);
    const { mutateAsync: deleteTagTypeMutate } = useDeleteTagType(domain);

    // --- State ---
    const [selectedTagType, setSelectedTagType] = useState(null);
    useLockBodyScroll(!!selectedTagType);

    // --- Handlers ---
    const handleEdit = (tagType) => {
        setSelectedTagType({
            tagType: tagType,
            type: "edit",
        });
    }
    const handleClose = useCallback(() => {
        setSelectedTagType(null);
        resetErrors();
    }, [resetErrors])

    const handleCreate = () => {
        setSelectedTagType({
            tagType: {
                id: null,
                name: ""
            },
            type: "create"
        });
    };

    const handleDeleteTagType = useCallback(async (id) => {
        try {
            await deleteTagTypeMutate(id);
            showToast("Успішно!", "Ви видалили тип тегу.")
        } catch (error) {
            const errors = getValidationErrorsMap(error)
            for (const value of Object.values(errors)) {
                showToast("Помилка!", value, "error");
            }
        }

    }, [deleteTagTypeMutate, showToast]);

    const handleSaveTagType = useCallback(async (updatedTagType, type) => {
        const isValid = validateForm(updatedTagType);
        if (!isValid) return;

        try {
            if (type === "edit") {
                const changedData = getChangedFields(selectedTagType?.tagType, updatedTagType);
                if (changedData.isChanged) {
                    await updateTagTypeMutate({
                        id: updatedTagType.id,
                        data: changedData.data
                    });
                    showToast("Успішно!", "Ви змінили тип тегу.")
                }
            } else {
                await createTagTypeMutate(updatedTagType);
                showToast("Успішно!", "Ви створили тип тегу.")
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

    }, [addExternalError, createTagTypeMutate, handleClose, selectedTagType?.tagType, showToast, updateTagTypeMutate, validateForm]);

    return (
        <div className="pt-5 px-9 w-full h-full flex flex-col overflow-auto">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Типи тегів</h1>
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
                        Створити тип тегу
                    </button>
                </div>
            </div>

            <div className="mt-8 w-full flex flex-col min-h-0">
                <div className="flex w-full border-b border-gray-300 py-3.5 text-sm font-semibold text-main-black z-10">
                    <div className="w-9/20 text-left">
                        Тип тегу – {totalCount}
                    </div>
                    <div className="w-1/4 text-center">
                        Теги
                    </div>
                    <div className="w-1/4 text-center">
                        Учасники
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
                        {tagTypes?.map((tagType) => (
                            <div key={tagType.id} className="flex w-full items-center py-3">
                                <div className="w-9/20 text-sm break-all text-main-black">
                                    {tagType.name}
                                </div>
                                <div className="w-1/4 text-sm break-all text-second-text text-center">
                                    {tagType.tagsCount}
                                </div>
                                <div className="w-1/4 text-sm break-all text-second-text text-center">
                                    {tagType.usersCount}
                                </div>
                                <div className="w-1/40 text-right flex justify-end min-w-8">
                                    <button
                                        onClick={() => handleEdit(tagType)}
                                        title="Редагувати"
                                        className="p-1 inline-block group relative"
                                    >
                                        <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                    </button>
                                </div>
                                <div className="w-1/40 flex justify-end min-w-8">
                                    <button
                                        onClick={() => handleDeleteTagType(tagType.id)}
                                        title="Видалити"
                                        className="p-1 inline-block group relative text-second-text hover:text-red-600"
                                    >
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <InfiniteScrollTrigger
                        ref={loadMoreRef}
                        isFetching={tagTypesQuery.isFetchingNextPage}
                    />
                </div>
            </div>

            {selectedTagType && (
                <EditTagTypeModal
                    handleClose={handleClose}
                    selected={selectedTagType}
                    handleSaveTagType={handleSaveTagType}
                    handleDeleteTagType={handleDeleteTagType}
                    validation={validation}
                />
            )}
        </div>
    );
}