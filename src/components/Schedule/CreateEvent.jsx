import PropTypes from "prop-types";
import InputBox from "../BasicInputs/InputBox.jsx";
import SelectMenu from "../BasicInputs/SelectMenu.jsx";
import { DateBox } from "../BasicInputs/DateBox.jsx";
import { TimeBox } from "../BasicInputs/TimeBox.jsx";
import Checkbox from "../BasicInputs/CheckBox.jsx";
import RepeatSelector from "./RepeatSelector.jsx";

export default function CreateEvent({
    eventForm,
    repeatRule,
    isRepeating,
    eventTypes,
    handleInputChange,
    handleSelectChange,
    handleRepeatChange,
    handleRepeatToggle,
    handleSubmit,
    handleCancel
}) {
    return (
        <>
            <h2 className="text-lg font-noto font-semibold mb-4">Створення події</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <InputBox
                    id="0"
                    name="name"
                    label="Назва"
                    placeholder="Зустріч"
                    value={eventForm.name}
                    onChange={handleInputChange}
                />
                <SelectMenu
                    array={eventTypes}
                    label="Тип події"
                    value={eventForm.type}
                    onChange={handleSelectChange}
                />
                <InputBox
                    id="1"
                    name="location"
                    label="Місце проведення"
                    placeholder="Поляна"
                    value={eventForm.location}
                    onChange={handleInputChange}
                />
                <DateBox
                    id="3"
                    name="date"
                    label="Дата події"
                    value={eventForm.date}
                    onChange={handleInputChange}
                />
                <TimeBox
                    id="4"
                    name="timeStart"
                    label="Початок"
                    value={eventForm.timeStart}
                    onChange={handleInputChange}
                />
                <TimeBox
                    id="5"
                    name="timeEnd"
                    label="Кінець"
                    value={eventForm.timeEnd}
                    onChange={handleInputChange}
                />
                <Checkbox
                    id="6"
                    name="repeat"
                    label="Повторювати цю подію"
                    checked={isRepeating}
                    onChange={handleRepeatToggle}
                />
                {isRepeating && (
                    <RepeatSelector
                        period={repeatRule.period}
                        count={repeatRule.count}
                        repeatEnd={repeatRule.repeatEnd}
                        onChange={handleRepeatChange}
                    />
                )}
                <div className="flex flex-row gap-4 mt-10">
                    <button
                        type="submit"
                        className="flex w-full justify-center items-center whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
                    >
                        Створити
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex w-full justify-center items-center whitespace-nowrap rounded-md bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-400"
                    >
                        Відхилити
                    </button>
                </div>
            </form>
        </>
    );
}

CreateEvent.propTypes = {
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