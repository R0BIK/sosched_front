import { useEffect } from "react";

/**
 * Locks the page scroll when the given condition is true (e.g., when a modal is open).
 * @param {boolean} isLocked — true to disable scrolling, false to restore it.
 */
export function useLockBodyScroll(isLocked) {
    useEffect(() => {
        if (isLocked) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";

            // Восстанавливаем стиль при размонтировании
            return () => {
                document.body.style.overflow = originalStyle;
            };
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLocked]);
}