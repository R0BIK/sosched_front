import PropTypes from "prop-types";

export default function InputBox({ id, type="text", name, label, placeholder, className, inputClassName, onChange, onBlur, value, error, disabled=false }) {
    return (
        <div className={className + " group"}
             data-disabled={disabled ? '' : undefined}
        >
            <label htmlFor={id} className="block font-semibold ml-1 text-main-black group-data-disabled:text-second-text" onClick={(e) => e.preventDefault()}>
                {label}
            </label>
            <div className="my-2">
                <input
                    disabled={disabled}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    autoComplete="off"
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={"disabled:cursor-not-allowed disabled:bg-gray-200 block w-full rounded-md bg-main-white px-3 py-1.5 text-main-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-on-hover text-sm/6" + " " + inputClassName }
                />
            </div>
            <p className="block text-xs ml-1 text-red-false">
                {error}
            </p>
        </div>
    )
}

InputBox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    error: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}