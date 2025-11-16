import PropTypes from "prop-types";
import InputBox from "../../BasicInputs/InputBox.jsx";
import SelectMenu from "../../BasicInputs/SelectMenu.jsx";
import { DateBox } from "../../BasicInputs/DateBox.jsx";
import { TimeBox } from "../../BasicInputs/TimeBox.jsx";
import Checkbox from "../../BasicInputs/CheckBox.jsx";
import RepeatSelector from "../RepeatSelector.jsx";
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
        duration = `${hours} год${hours !== 1 ? "и" : ""} ${mins} хв`;
    }

    return (
        <>
            <h2 className="text-lg font-noto font-semibold mb-4">Інформація про подію</h2>
            <div className="flex flex-col gap-4">
                <DisplayBox id="name" label="Назва" value={eventForm.name} />
                <DisplayBox
                    id="eventType"
                    label="Тип події"
                    value={eventForm.eventTypeId || ""}
                />
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
    repeatRule: PropTypes.object.isRequired,
    isRepeating: PropTypes.bool.isRequired,
    eventTypes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    handleRepeatChange: PropTypes.func.isRequired,
    handleRepeatToggle: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
};