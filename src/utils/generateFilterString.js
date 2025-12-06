export function generateFilterString(filterObj) {
    if (!filterObj || typeof filterObj !== "object") return "";

    return Object.entries(filterObj)
        .map(([key, values]) => {
            if (values === null || values === undefined) return null;

            if (Array.isArray(values)) {
                if (values.length === 0) return null; // Пустой массив пропускаем
                return `${key}=${values.join(",")}`;
            }

            if (values === "") return null; // Пустую строку тоже можно пропустить
            return `${key}=${values}`;
        })
        .filter(Boolean)
        .join(";");
}