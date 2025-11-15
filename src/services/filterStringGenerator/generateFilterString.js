export function generateFilterString(filterObj) {
    if (!filterObj || typeof filterObj !== "object") return "";

    return Object.entries(filterObj)
        .map(([key, values]) => {
            if (!values || values.length === 0) return null;

            // Строка: key=value1,value2,value3
            return `${key}=${values.join(",")}`;
        })
        .filter(Boolean)
        .join(";");
}