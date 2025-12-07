import PropTypes from "prop-types";

export function TimeBox({ id, name, label, className, value, error, onChange, onBlur }) {
    return (
        <div className={className + " font-noto"}>
            {label && <label className="block font-semibold ml-1 text-gray-900">{label}</label>}
            <div className="my-2">
                <input
                    id={id}
                    name={name}
                    type="time"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="block w-full rounded-md bg-main-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <p className="block text-xs ml-1 text-red-false h-4">
                {error}
            </p>
        </div>
    );
}

TimeBox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.string,
};