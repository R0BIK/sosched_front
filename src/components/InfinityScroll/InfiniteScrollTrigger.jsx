import { forwardRef } from "react";
import PropTypes from "prop-types";

// forwardRef позволяет родительскому компоненту передать ref прямо в div
const InfiniteScrollTrigger = forwardRef(({ isFetching }, ref) => {
    return (
        <div
            ref={ref}
            className="h-[1px] w-full flex justify-center items-center shrink-0"
        >
            {isFetching && (
                // Тут может быть спиннер вместо текста
                <span className="text-gray-400 text-sm font-noto animate-pulse">
                    Завантаження...
                </span>
            )}
        </div>
    );
});

// Для отладки в React DevTools
InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";

InfiniteScrollTrigger.propTypes = {
    isFetching: PropTypes.bool.isRequired,
};

export default InfiniteScrollTrigger;