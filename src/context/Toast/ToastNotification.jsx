import {useEffect} from "react";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/solid/index.js";
import {XMarkIcon} from "@heroicons/react/20/solid/index.js";
import PropTypes from "prop-types";

export const ToastNotification = ({ id, message, description, type, duration, handleRemove }) => {

    const finalDuration = duration || 3000;
    const color = type === "success" ? "var(--color-green-true)" : type === "error" ? "var(--color-red-false)" : "yellow";

    // Запускаем CSS анимацию с указанной длительностью
    const animationStyle = {
        animation: `toast-shrink ${finalDuration}ms linear forwards`,
        background: color
    };

    // Эффект, который запускает таймер на удаление
    useEffect(() => {
        const timer = setTimeout(() => {
            handleRemove(id);
        }, finalDuration);

        return () => clearTimeout(timer);
    }, [id, finalDuration, handleRemove]);


    return (
        <div className="w-full h-auto mb-4 shadow-xl rounded-lg overflow-hidden z-[9999] relative"
             role="alert"
        >
            <div className="p-4 font-noto bg-white border border-gray-200 rounded-lg">
                <div className="flex items-start">
                    <div className="shrink-0 mt-1">
                        {type === "success" && (
                            <CheckCircleIcon aria-hidden="true" className="size-6 text-green-true" />
                        )}
                        {type === "error" && (
                            <XCircleIcon aria-hidden="true" className="size-6 text-red-false" />
                        )}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{message}</p>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>
                    <div className="ml-4 flex shrink-0">
                        <button
                            type="button"
                            onClick={() => handleRemove(id)}
                            className="inline-flex rounded-md text-gray-400 hover:text-main-black"
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon aria-hidden="true" className="size-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div
                    className={`h-full`}
                    style={animationStyle}
                />
            </div>
        </div>
    );
};


ToastNotification.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.number,
    description: PropTypes.string,
    handleRemove: PropTypes.func.isRequired,
}