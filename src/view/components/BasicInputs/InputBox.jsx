import PropTypes from "prop-types";

export default function InputBox({ id, type="text", name, label, placeholder, className, onChange, value  }) {
    return (
        <div className={className}>
            <label className="block font-semibold ml-1 text-main-black">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="block w-full rounded-md bg-main-white px-3 py-1.5 text-main-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-on-hover text-sm/6"
                />
            </div>
        </div>
    )
}

InputBox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
}