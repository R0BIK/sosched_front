import PropTypes from "prop-types";

export default function ClassicInputBox({ id, type, name, placeholder, className, onChange, value  }) {
    return (
        <div className={className + " font-noto"}>
            <label htmlFor={id} className="block font-semibold ml-1 text-gray-900">
                {name}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={type}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="block w-full rounded-md bg-main-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    )
}

ClassicInputBox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
}