/**
 * Вспомогательная функция: Получает сегодняшнюю дату в формате YYYY-MM-DD.
 * @returns {string}
 */
// const getTodayDateString = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };

/**
 * Вспомогательная функция: Получает дату завтрашнего дня в формате YYYY-MM-DD.
 * @returns {string}
 */
const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const createDate = (fullDateTimeStr, timeStr) => {
    // 1. Логика "завтрашнего дня"
    const finalDateStr = fullDateTimeStr
        ? fullDateTimeStr.split('T')[0] // Используем split('T') для извлечения даты из ISO-подобного формата
        : getTomorrowDateString();

    // 2. Гарантируем формат HH:mm:ss (если пришел HH:mm)
    const finalTimeStr = timeStr && timeStr.length <= 5 ? `${timeStr}:00` : timeStr;

    // 3. Создаем строку YYYY-MM-DDTHH:mm:ss.
    // new Date() интерпретирует эту строку в ЛОКАЛЬНОМ часовом поясе браузера.
    const combinedString = `${finalDateStr}T${finalTimeStr}`;

    return new Date(combinedString);
};

export const getDateAndTime = (dateObject) => {

    // 1. Извлекаем дату (YYYY-MM-DD)
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    // 2. Извлекаем время (HH:mm:ss)
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    return { date, time };
};