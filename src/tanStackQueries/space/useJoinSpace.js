import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinSpace } from "../../services/api/spaceApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

export function useJoinSpace() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        /**
         * @param {object} data - Объект с данными для присоединения: { domain: string, password: string }
         */
        mutationFn: joinSpace,

        onSuccess: (newSpace) => {
            void queryClient.invalidateQueries({ queryKey: ["spaces", user?.id] });
            console.log("Successfully joined new space:", newSpace);
        },

        onError: (error) => {
            // Ошибка уже выброшена и обработана в UI, но логируем для отладки
            console.error("Failed to join space:", error);
        },
    });
}