import { useCallback } from "react";
import {Special} from "../../data.js";

export const useKeyDownEnterHandler = () => {
    const handleEnterSubmit = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            e.target.classList.add('isActive');
            document.activeElement.blur();
            e.target?.click();
            setTimeout(() => {
                e.target.classList.remove('isActive');
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


        if (e.key === Special.KeyboardKey.Enter.name) {
            e.preventDefault();

            if (index < formFields.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                document.activeElement.blur();
                buttonRef.current?.dispatchEvent(Special.KeyboardKey.Enter.KeyboardEvent);
            }
        }
    }, []);

    return { handleEnterSubmit, handleEnterAsTab };
};