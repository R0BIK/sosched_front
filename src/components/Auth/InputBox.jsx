import PropTypes from "prop-types";
import { useSessionStorage } from "../../hooks/SignFormHooks.jsx";
import { CrossIcon } from "../../img/svg/Icons.jsx";
import PasswordRules from "./PasswordRules.jsx";

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
            data-new-password={name === "newPassword" ? '' : undefined}
            className="relative group flex flex-col w-full data-new-password:mb-[60px]"
            data-filled={values !== '' ? '' : undefined}
        >
            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                placeholder=" "
                value={values}
                onChange={ handleChange }
                onBlur={onBlur}
                ref={ref}
                onKeyDown={onKeyDown}
                required
                className="peer h-10 w-full text-noto text-sm border-none outline-none bg-transparent text-main-black px-1
                   group-data-filled:pr-[30px]"
            />

            <label
                htmlFor={name}
                className="
                    absolute left-1 font-noto text-sm text-second-text
                    transition-all duration-300 ease-in-out
                    top-3.5
                    peer-focus:-top-3 peer-focus:text-accent
                    group-data-filled:-top-3 group-data-filled:text-accent
                "
            >
                {placeholder}
            </label>

            <span className="relative block h-[2px] w-full rounded-full bg-second-text">
                <span
                    className="absolute inset-0 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent
                             transition-transform duration-300 ease-in-out peer-focus:scale-x-100"
                />
            </span>
            <p
                className="absolute font-noto text-xm left-1 top-10 text-sm text-red-false opacity-0 transition-all duration-300
                   not-group-data-new-password:peer-data-error:opacity-100 peer-data-error:top-[50px] group-data-new-password:opacity-0"
            >
                {errorText}
            </p>

            <button
                type="button"
                className="absolute right-2 top-3 invisible group-data-filled:visible
                   transition duration-300 text-second-text hover:text-main-black"
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={ onClick }
            >
                <CrossIcon className="h-4 w-4 rotate-[-45deg] fill-transparent group-data-filled:rotate-0 group-data-filled:fill-current transition-all duration-300" />
            </button>

            {name === "newPassword" && (
                <PasswordRules values={values} className="absolute top-10 left-1 list-none text-sm text-second-text opacity-0 invisible
                     transition-all duration-500 ease-in-out
                     peer-focus:opacity-100 peer-focus:visible peer-focus:top-[55px]
                     group-data-filled:opacity-100 group-data-filled:visible group-data-filled:top-[55px]
                     peer-data-error:opacity-100 peer-data-error:top-[55px] peer-data-error:visible"/>
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