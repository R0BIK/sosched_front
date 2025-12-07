import PropTypes from "prop-types";
import { useMemo } from "react";
import SelectMenu from "../BasicInputs/SelectMenu.jsx";
import { DateBox } from "../BasicInputs/DateBox.jsx";

const LIMITS = {
    Day: 31,
    Week: 5,
    Month: 6,
};

const PERIOD_LABELS = {
    Day: "День",
    Week: "Тиждень",
    Month: "Місяць",
};

const LABEL_TO_KEY = Object.entries(PERIOD_LABELS).reduce((acc, [key, label]) => {
    acc[label] = key;
    return acc;
}, {});

export default function RepeatSelector({ repeatType, repeatNumber, repeatEnd, onChange }) {
    // Массив объектов для count
    const numbers = useMemo(() => {
        const max = LIMITS[repeatType];
        return Array.from({ length: max }, (_, i) => ({ id: i + 1, name: (i + 1).toString() }));
    }, [repeatType]);

    // Массив объектов для period
    const periodOptions = useMemo(() => {
        return Object.entries(PERIOD_LABELS).map(([key, label]) => ({ id: key, name: label }));
    }, []);

    const handlePeriodChange = (id) => {
        const value = id; // id = "Day" | "Week" | "Month"
        const max = LIMITS[value];
        onChange("repeatType", value);
        if (repeatNumber > max) onChange("repeatNumber", max);
    };

    const handleRepeatEndChange = (e) => {
        onChange("repeatEnd", e.target.value);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <p className="font-noto pt-4">Кожен</p>
                <div>
                    <SelectMenu
                        array={numbers}
                        value={repeatNumber}
                        onChange={(val) => onChange("repeatNumber", Number(val))}
                    />
                </div>
                <div className="w-full">
                    <SelectMenu
                        array={periodOptions}
                        value={repeatType}
                        onChange={handlePeriodChange}
                    />
                </div>
                <p className="font-noto pt-4">До</p>
                <DateBox
                    id="repeatEnd"
                    name="repeatEnd"
                    value={repeatEnd || ""}
                    onChange={handleRepeatEndChange}
                />
                <p className="font-noto pt-4">включно</p>
            </div>

            <div className="flex items-center gap-4">

            </div>
        </div>
    );
}

RepeatSelector.propTypes = {
    repeatType: PropTypes.oneOf(["Day", "Week", "Month"]).isRequired,
    repeatNumber: PropTypes.number.isRequired,
    repeatEnd: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};