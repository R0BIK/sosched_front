import PropTypes from "prop-types";

export default function ClassicInputBox({ name, placeholder, className }) {
    return (
        <div className={className + " font-noto"}>
            <label htmlFor="name" className="block font-semibold ml-1 text-gray-900">
                {name}
            </label>
            <div className="mt-2">
                <input
                    id={name}
                    name={name}
                    type="name"
                    placeholder={placeholder}
                    className="block w-full rounded-md bg-main-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    )
}

ClassicInputBox.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
}