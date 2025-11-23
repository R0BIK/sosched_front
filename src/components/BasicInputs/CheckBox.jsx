import PropTypes from "prop-types";

export default function Checkbox({ id, name, label, checked, onChange, className }) {
    return (
        <div className={`flex items-center gap-2 font-noto ${className || ""}`}>
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
            />
            {label && (
                <label htmlFor={id}
                    className="text-sm text-gray-900 cursor-pointer select-none"
                >
                    {label}
                </label>
            )}
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};