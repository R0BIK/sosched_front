import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpaceUser } from "../../services/api/userApi.js"; // Переконайтеся у правильному шляху імпорту

/**
 * Хук для видалення користувача з простору.
 * @param {string} domain - Домен поточного простору (потрібен для оновлення кешу списку користувачів).
 */
export function useLeaveSpace(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        /**
         * @param {number|string} userId - ID користувача для видалення
         */
        mutationFn: (userId) => deleteSpaceUser(domain, userId),

        onSuccess: (data, userId) => {

            // Оновлюємо список користувачів для цього домену
            // Це змусить useGetUsers (у модалках та списках) перезавантажити дані
            void queryClient.invalidateQueries({ queryKey: ["users", domain] });

            // Якщо ви використовуєте окремий запит для учасників подій/тегів,
            // можна додати додаткові інвалідації тут, наприклад:
            // void queryClient.invalidateQueries({ queryKey: ["spaceUsers", domain] });
        },

        onError: (error) => {
            console.error("Failed to remove user:", error);
        },
    });
}