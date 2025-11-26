import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";
import { ToastContext } from './useToast.js';
import {CheckCircleIcon} from "@heroicons/react/24/solid/index.js";
import {XMarkIcon} from "@heroicons/react/20/solid/index.js";

const TOAST_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
}

const ToastNotification = ({ message, description, type, duration = 3000, handleClose }) => {
    const animationStyle = {
        animation: `toast-shrink ${duration}ms linear forwards`,
    };

    return (
        <div className="w-100 h-auto fixed bottom-10 left-1/2 shadow-xl rounded-lg overflow-hidden z-[9999] animate-[toast-slide-in_0.3s_ease-out_forwards]">
            <div className="p-4 font-noto relative bg-white border border-gray-200 rounded-lg">
                <div className="flex items-start">
                    <div className="shrink-0 mt-1">
                        <CheckCircleIcon aria-hidden="true" className="size-6 text-green-true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{message}</p>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>
                    <div className="ml-4 flex shrink-0">
                        <button
                            type="button"
                            onClick={handleClose}
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
                    className={`h-full bg-green-true`}
                    style={animationStyle}
                />
            </div>
        </div>
    );
};

ToastNotification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.number,
    description: PropTypes.string,
    handleClose: PropTypes.func,
}

// 2. Компонент-Контейнер, который управляет отображением и таймаутами
export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    // Функция для вызова уведомления
    const showToast = useCallback((message, description, type = 'success', duration = 3000) => {
        setToast({ message, description, type, duration, visible: true });

        // Автоматически скрываем через duration
        setTimeout(() => {
            setToast(prev => (prev ? { ...prev, visible: false } : null));
        }, duration);
    }, []);

    // Проверяем, существует ли корневой элемент для портала
    const portalRoot = document.getElementById('portal-root');

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Рендерим уведомление через Portal */}
            {toast?.visible && portalRoot && createPortal(
                <ToastNotification {...toast} handleClose={() => setToast(null)}/>,
                portalRoot
            )}
        </ToastContext.Provider>
    );
}

ToastProvider.propTypes = {
    children: PropTypes.node,
}