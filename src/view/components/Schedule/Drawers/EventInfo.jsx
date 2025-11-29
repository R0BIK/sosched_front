import PropTypes from "prop-types";
import DisplayBox from "../../BasicInputs/DisplayBox.jsx";
import { format, differenceInMinutes } from "date-fns";
import {
    InformationCircleIcon,
    ClockIcon,
    ArrowLongRightIcon,
    MapPinIcon,
    UserIcon,
    UsersIcon,
    PaperClipIcon,
} from "@heroicons/react/24/solid/index.js";
import {uk} from "date-fns/locale";

export default function EventInfo({
    eventForm
}) {
    // Форматируем даты и время для отображения
    const formattedDate = eventForm.dateStart
        ? format(
            new Date(eventForm.dateStart),
            "iii, d MMMM, yyyy 'рік'", // 👈 Новый формат
            { locale: uk }              // 👈 Обязательно передаем локаль
        )
        : "";
    const formattedTimeStart = eventForm.dateStart
        ? format(new Date(eventForm.dateStart), "HH:mm")
        : "";
    const formattedTimeEnd = eventForm.dateEnd
        ? format(new Date(eventForm.dateEnd), "HH:mm")
        : "";

    // Вычисляем длительность в часах и минутах
    let duration = "";
    if (eventForm.dateStart && eventForm.dateEnd) {
        const minutes = differenceInMinutes(
            new Date(eventForm.dateEnd),
            new Date(eventForm.dateStart)
        );
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const hoursString = hours > 0 ? `${hours} год` : "";
        const minsString = mins > 0 ? `${mins} хв` : "";

        duration = `${hoursString} ${minsString}`.trim();
    }

    return (
        <>
            <div className="flex gap-4 p-4 mb-2 items-center">
                <InformationCircleIcon aria-hidden="true" className="size-6" />
                <h2 className="text-xl font-noto font-semibold">Інформація</h2>
            </div>
            <div className="flex flex-col font-medium">
                <div className="flex border-b border-gray-200 border-t p-4">
                    <p className="">
                        {eventForm.name}
                    </p>
                </div>

                <div className="flex px-4 py-6 gap-4 text-gray-600 border-b border-gray-200">
                    <ClockIcon className="size-5 shrink-0 mt-1" />
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-5">
                                <p className="">
                                    {formattedTimeStart}
                                </p>
                                <ArrowLongRightIcon className="size-5" />
                                <p className="">
                                    {formattedTimeEnd}
                                </p>
                            </div>
                            <p className="">
                                {duration}
                            </p>
                        </div>
                        <p>
                            {formattedDate}
                        </p>
                    </div>
                </div>

                {eventForm.location && (
                    <div className="flex px-4 py-6 gap-4 text-gray-600 border-b border-gray-200">
                        <MapPinIcon className="size-5 shrink-0 mt-1" />
                        <p>
                            {eventForm.location}
                        </p>
                    </div>
                )}
                <div className="flex flex-col border-b border-gray-200 py-6 gap-4">
                    {eventForm.coordinator && (
                        <div className="flex px-4 gap-4 text-gray-600 items-center">
                            <UserIcon className="size-5 shrink-0" />
                            <div className="flex flex-col w-full gap-1">
                                <p className="font-bold">
                                    Організатор
                                </p>
                                <p>
                                    {eventForm.coordinator.fullName}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex px-4 gap-4 text-gray-600 items-center">
                        <UsersIcon className="size-5 shrink-0" />
                        <p>
                            Кількість учасників: {eventForm.usersCount}
                        </p>
                    </div>
                </div>

                {eventForm.description && (
                    <div className="flex px-4 gap-4 py-6 text-gray-600">
                        <PaperClipIcon className="size-5 shrink-0 mt-1" />
                        <div className="flex flex-col w-full gap-1">
                            <p className="font-bold">
                                Опис
                            </p>
                            <p>
                                {eventForm.description}
                            </p>
                        </div>
                    </div>
                )}


                {/*<DisplayBox id="name" label="Назва" value={eventForm.name} />*/}
                {/*<DisplayBox id="location" label="Місце проведення" value={eventForm.location || ""} />*/}
                {/*<DisplayBox id="date" label="Дата події" value={formattedDate} />*/}
                {/*<DisplayBox id="timeStart" label="Початок" value={formattedTimeStart} />*/}
                {/*<DisplayBox id="timeEnd" label="Кінець" value={formattedTimeEnd} />*/}
                {/*<DisplayBox id="duration" label="Тривалість" value={duration} />*/}
            </div>
        </>
    );
}

EventInfo.propTypes = {
    eventForm: PropTypes.object.isRequired,
};