import { useCallback } from "react";
import {SPECIAL} from "../constants/constants.js";

export const useKeyDownEnterHandler = () => {
    const handleEnterSubmit = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            e.target.setAttribute("data-active", true);
            document.activeElement.blur();
            e.target?.click();
            setTimeout(() => {
                e.target.removeAttribute("data-active");
            }, 250);
        }
    }, []);

    const handleEnterAsTab = useCallback((props = {}) => {
        const {
            e,
            index,
            formFields,
            inputRefs,
            buttonRef,
        } = props;


        if (e.key === SPECIAL.KEYBOARD_KEYS.Enter.name) {
            e.preventDefault();

            console.log(formFields)

            if (index < formFields.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                document.activeElement.blur();
                buttonRef.current?.dispatchEvent(SPECIAL.KEYBOARD_KEYS.Enter.KeyboardEvent);
            }
        }
    }, []);

    return { handleEnterSubmit, handleEnterAsTab };
};