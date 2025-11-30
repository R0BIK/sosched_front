import {useState, useCallback, useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";
import { ToastContext } from './useToast.js'; // Предполагаемый путь
import {ToastNotification} from "./ToastNotification.jsx";
import autoAnimate, {getTransitionSizes} from "@formkit/auto-animate";

const TOAST_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
}

// Глобальный ID (для уникальности)
let toastId = 0;

export function ToastProvider({ children }) {
    // Храним массив активных тостов
    const [toasts, setToasts] = useState([]);

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        autoAnimate(container, (el, action, oldCoords, newCoords) => {
            let keyframes
            // supply a different set of keyframes for each action
            if (action === 'add') {
                keyframes = [
                    // Схоже с вашим предыдущим кодом, но более детально:
                    { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' }
                ];
            }

            // 2. Анимация удаления (remove)
            if (action === 'remove') {
                const top = oldCoords.top

                keyframes = [
                    // Удаляем без смещения других элементов — только fade-out и немного сжатие
                    // { opacity: 1, transform: `translateY(${top}px) scale(1)` },
                    // { opacity: 0, transform: `translateY(${top}px) scale(0.9)` }
                    { opacity: 1, transform: `scale(1)` },
                    { opacity: 0, transform: `scale(0.9)` }
                ];
            }

            // 3. Анимация перемещения (remain / update)
            if (action === 'remain' && oldCoords && newCoords) {
                // Расчет дельты (смещения)
                const deltaX = oldCoords.left - newCoords.left;
                const deltaY = oldCoords.top - newCoords.top;

                // Получаем старые и новые размеры
                const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);

                // Создаем ключевые кадры для перемещения
                const start = {
                    transform: `translate(${deltaX}px, ${deltaY}px)`
                };
                const end = {
                    transform: `translate(0, 0)`
                };

                // Если размеры изменились, добавляем их в ключевые кадры
                if (widthFrom !== widthTo) {
                    start.width = `${widthFrom}px`;
                    end.width = `${widthTo}px`;
                }
                if (heightFrom !== heightTo) {
                    start.height = `${heightFrom}px`;
                    end.height = `${heightTo}px`;
                }

                keyframes = [start, end];
            }
            // if (action === 'add') {
            //     keyframes = [
            //         { transform: 'scale(0)', opacity: 0 },
            //         { transform: 'scale(1.15)', opacity: 1, offset: 0.75 },
            //         { transform: 'scale(1)', opacity: 1 }
            //     ]
            // }
            // // keyframes can have as many "steps" as you prefer
            // // and you can use the 'offset' key to tune the timing
            // if (action === 'remove') {
            //     keyframes = [
            //         { transform: 'scale(1)', opacity: 1 },
            //         { transform: 'scale(1.15)', opacity: 1, offset: 0.33 },
            //         { transform: 'scale(0.75)', opacity: 0.1, offset: 0.5 },
            //         { transform: 'scale(0.5)', opacity: 0 }
            //     ]
            // }
            // if (action === 'remain') {
            //     // for items that remain, calculate the delta
            //     // from their old position to their new position
            //     const deltaX = oldCoords.left - newCoords.left
            //     const deltaY = oldCoords.top - newCoords.top
            //     // use the getTransitionSizes() helper function to
            //     // get the old and new widths of the elements
            //     const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords)
            //     // set up our steps with our positioning keyframes
            //     const start = { transform: `translate(${deltaX}px, ${deltaY}px)` }
            //     const mid = { transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`, offset: 0.75 }
            //     const end = { transform: `translate(0, 0)` }
            //     // if the dimensions changed, animate them too.
            //     if (widthFrom !== widthTo) {
            //         start.width = `${widthFrom}px`
            //         mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`
            //         end.width = `${widthTo}px`
            //     }
            //     if (heightFrom !== heightTo) {
            //         start.height = `${heightFrom}px`
            //         mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`
            //         end.height = `${heightTo}px`
            //     }
            //     keyframes = [start, mid, end]
            // }
            // return our KeyframeEffect() and pass
            // it the chosen keyframes.
            return new KeyframeEffect(el, keyframes, { duration: 250, easing: 'ease-out' })
        })

    }, []);

    // 1. Функция для удаления тоста (вызывается по таймауту или клику)
    const handleRemoveToast = useCallback((id) => {
        // Здесь можно добавить анимацию исчезновения, установив флаг isAnimatingOut: true
        // Но для простоты, пока просто удаляем
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // 2. Функция для вызова нового уведомления
    const showToast = useCallback((message, description = null, type = TOAST_TYPE.SUCCESS, duration = 4000) => {

        const newToast = {
            id: toastId++, // Уникальный ID
            message,
            description,
            type,
            duration,
        };

        // console.log(newToast.id, toastId);

        // Добавляем новый тост в конец массива
        setToasts(prev => [...prev, newToast]);

    }, []);

    // Проверяем, существует ли корневой элемент для портала
    const portalRoot = document.getElementById('portal-root');

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {portalRoot && createPortal(
                <div ref={containerRef}
                    className="fixed bottom-0 left-1/2 -translate-x-1/2 w-100
                                flex flex-col items-center p-4 space-y-4 z-[9999]">
                    {toasts.map((toast) => (
                        <ToastNotification
                            key={toast.id}
                            {...toast}
                            handleRemove={handleRemoveToast}
                        />
                    ))}
                </div>,
                portalRoot
            )}
        </ToastContext.Provider>
    );
}

ToastProvider.propTypes = {
    children: PropTypes.node,
};
