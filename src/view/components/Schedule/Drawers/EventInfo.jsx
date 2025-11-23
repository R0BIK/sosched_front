import PropTypes from "prop-types";
import DisplayBox from "../../BasicInputs/DisplayBox.jsx";
import { format, differenceInMinutes } from "date-fns";

export default function EventInfo({
    eventForm
}) {
    // Форматируем даты и время для отображения
    const formattedDate = eventForm.dateStart
        ? format(new Date(eventForm.dateStart), "dd.MM.yyyy")
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
        duration = `${hours} год ${mins} хв`;
    }

    return (
        <>
            <h2 className="text-lg font-noto font-semibold mb-4">Інформація про подію</h2>
            <div className="flex flex-col gap-4">
                <DisplayBox id="name" label="Назва" value={eventForm.name} />
                <DisplayBox id="location" label="Місце проведення" value={eventForm.location || ""} />
                <DisplayBox id="date" label="Дата події" value={formattedDate} />
                <DisplayBox id="timeStart" label="Початок" value={formattedTimeStart} />
                <DisplayBox id="timeEnd" label="Кінець" value={formattedTimeEnd} />
                <DisplayBox id="duration" label="Тривалість" value={duration} />
            </div>
        </>
    );
}

EventInfo.propTypes = {
    eventForm: PropTypes.object.isRequired,
};