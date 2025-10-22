import PropTypes from "prop-types";

export default function InputBox({name, placeholder, className, value}) {
    return (
        <div className={"relative " + className}>
            <label
                htmlFor={name}
                className="absolute -top-3 font-noto left-4 inline-block rounded-lg bg-main-white px-1 text-xm font-medium text-main-black"
            >
                { name }
            </label>
            <input
                id={name}
                name={name}
                type="text"
                value={value}
                placeholder={placeholder}
                className="block w-full font-noto text-xl rounded-xl bg-main-white px-3 py-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent "
            />
        </div>
    )
}

InputBox.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
}