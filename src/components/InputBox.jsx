import PropTypes from "prop-types";
import { useSessionStorage } from "../hooks/SignFormHooks.jsx";
import { CrossIcon, FalseIcon, TrueIcon } from "../img/svg/Icons.jsx";

export default function InputBox({
     name,
     placeholder,
     type,
     autoComplete,
     onBlur,
     errorText,
     ref,
     onKeyDown,
     isSaving,
     formName,
 }) {
    const { values, handleChange } = useSessionStorage(formName, name, isSaving);

    const onClick = () => {
        handleChange({ target: { name, value: "" } });
        onBlur({ target: { name, value: "" } });
    };

    return (
        <div
            className={`relative flex flex-col w-full group ${
                name === "newPassword" ? "mb-[60px]" : ""
            }`}
            data-filled={!!values}
        >
            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                placeholder=" "
                value={values}
                onChange={handleChange}
                onBlur={onBlur}
                ref={ref}
                onKeyDown={onKeyDown}
                required
                className="peer h-10 w-full text-sm border-none outline-none bg-transparent text-mainBlack px-1
                   data-[filled=true]:pr-6"
                data-filled={values !== ""}
            />

            <label
                htmlFor={name}
                className="
                    absolute left-1 text-sm text-secondText
                    transition-all duration-300 ease-in-out
                    top-3.5
                    peer-focus:-top-3 peer-focus:text-accentColor
                    group-data-[filled=true]:-top-3 group-data-[filled=true]:text-accentColor
                "
            >
                {placeholder}
            </label>

            <span className="relative block h-[2px] w-full rounded-full bg-secondText">
        <span
            className="absolute inset-0 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-transparent via-accentColor to-transparent
                     transition-transform duration-300 ease-in-out peer-focus:scale-x-100"
        />
      </span>
            <p
                className="absolute left-1 top-10 text-sm text-redFalse opacity-0 transition-all duration-300
                   peer-[.error]:opacity-100 peer-[.error]:top-[50px]
                   data-[filled=true]:opacity-100"
            >
                {errorText}
            </p>

            <button
                type="button"
                className="absolute right-2 top-3 invisible group-data-[filled=true]:visible
                   transition duration-300 hover:text-mainBlack"
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={onClick}
            >
                <CrossIcon className="h-4 w-4 rotate-[-45deg] fill-transparent group-data-[filled=true]:rotate-0 group-data-[filled=true]:fill-secondText transition-all duration-300" />
            </button>

            {name === "newPassword" && (
                <ul
                    className="absolute top-10 left-1 list-none text-sm text-secondText opacity-0 invisible
                     transition-all duration-500 ease-in-out
                     peer-focus:opacity-100 peer-focus:visible peer-focus:top-[55px]
                     group-data-[filled=true]:opacity-100 group-data-[filled=true]:visible group-data-[filled=true]:top-[55px]"
                >
                    <li
                        className={`relative pl-6 transition-colors ${
                            /[A-Z]/.test(values) ? "text-greenTrue" : ""
                        }`}
                    >
                        <TrueIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/[A-Z]/.test(values) ? "opacity-100" : "opacity-0"}`} />
                        <FalseIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/[A-Z]/.test(values) ? "opacity-0" : "opacity-100"}`} />
                        At least one uppercase letter
                    </li>
                    <li
                        className={`relative pl-6 transition-colors ${
                            /[a-z]/.test(values) ? "text-greenTrue" : ""
                        }`}
                    >
                        <TrueIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/[a-z]/.test(values) ? "opacity-100" : "opacity-0"}`} />
                        <FalseIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/[a-z]/.test(values) ? "opacity-0" : "opacity-100"}`} />
                        At least one lowercase letter
                    </li>
                    <li
                        className={`relative pl-6 transition-colors ${
                            /\d/.test(values) ? "text-greenTrue" : ""
                        }`}
                    >
                        <TrueIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/\d/.test(values) ? "opacity-100" : "opacity-0"}`} />
                        <FalseIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/\d/.test(values) ? "opacity-0" : "opacity-100"}`} />
                        At least one number
                    </li>
                    <li
                        className={`relative pl-6 transition-colors ${
                            /.{8,}/.test(values) ? "text-greenTrue" : ""
                        }`}
                    >
                        <TrueIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/.{8,}/.test(values) ? "opacity-100" : "opacity-0"}`} />
                        <FalseIcon className={`absolute left-0 top-1 h-3 transition-opacity ${/.{8,}/.test(values) ? "opacity-0" : "opacity-100"}`} />
                        At least 8 characters
                    </li>
                </ul>
            )}
        </div>
    );
}

InputBox.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    isSaving: PropTypes.bool.isRequired,
    ref: PropTypes.object.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};