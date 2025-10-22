import PropTypes from "prop-types";
import { useState } from "react";

export default function InputArea({ name, placeholder, className, maxLength = 200 }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setValue(e.target.value);
        }
    };

    return (
        <div className={"relative " + className}>
            <label
                htmlFor={name}
                className="absolute -top-3 font-noto left-4 inline-block rounded-lg bg-main-white px-1 text-xm font-medium text-main-black"
            >
                {name}
            </label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="block w-full resize-none h-50 font-noto text-xl rounded-xl bg-main-white pl-3 pr-18 py-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
            />
            {/* Счётчик символов */}
            <span className="absolute bottom-2 right-3 text-xs text-gray-500 font-noto">
                {value.length}/{maxLength}
            </span>
        </div>
    );
}

InputArea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    maxLength: PropTypes.number,
};