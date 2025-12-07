/**
 * Сравнивает два объекта и возвращает новый объект, содержащий только те поля,
 * которые отличаются в значениях между 'original' и 'updated'.
 *
 * Критерий: Изменения фиксируются только для КЛЮЧЕЙ, существующих в обоих объектах.
 * Новые ключи в 'updated' игнорируются (не попадают в результат).
 *
 * @param {object} original - Исходный объект (например, данные с сервера).
 * @param {object} updated - Обновленный объект (например, состояние формы).
 * @returns {object} Объект, содержащий только измененные поля ({ field: newValue }).
 */
export function getChangedFields(original, updated) {
    const changed = {};

    // Если один из объектов отсутствует, считаем, что изменений нет (так как нет общих ключей)
    if (!original || !updated) {
        return changed;
    }

    // Перебираем ключи обновленного объекта. Мы делаем это, чтобы проверить,
    // что именно пользователь потенциально изменил.
    const keysToCompare = Object.keys(updated);

    for (const key of keysToCompare) {
        const originalValue = original[key];
        const updatedValue = updated[key];

        // 1. Пропускаем, если ключ отсутствует в оригинальном объекте (игнорируем новые поля)
        if (!(key in original)) {
            continue;
        }

        // 2. Проверяем значения
        if (originalValue !== updatedValue) {

            // 2a. Специальная обработка Date (сравнение объектов Date/DateTimeOffset)
            if (originalValue instanceof Date && updatedValue instanceof Date) {
                if (originalValue.getTime() !== updatedValue.getTime()) {
                    changed[key] = updatedValue; // Добавляем изменение
                }
                continue;
            }

            // 2b. Специальная обработка сложных объектов (проверка JSON-строк)
            if (typeof originalValue === 'object' && originalValue !== null) {
                // Если значения отличаются, и это объект, сравниваем их структуру
                if (JSON.stringify(originalValue) !== JSON.stringify(updatedValue)) {
                    changed[key] = updatedValue; // Добавляем изменение
                }
            } else {
                // 2c. Простая разница (строки, числа, булевы, null/undefined)
                // Если значения отличаются, и это не сложные объекты, то разница найдена
                changed[key] = updatedValue; // Добавляем изменение
            }
        }
    }

    const isChanged = !(Object.keys(changed).length === 0);

    return { data: changed, isChanged: isChanged }; // Возвращаем объект с изменениями
}