import PropTypes from "prop-types";

export function DateBox({ id, name, label, className, value, onChange }) {
    return (
        <div className={className + " font-noto"}>
            {label && <label className="block font-semibold ml-1 text-gray-900">{label}</label>}
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type="date"
                    value={value}
                    onChange={onChange}
                    className="block w-full rounded-md bg-main-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    );
}

DateBox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};