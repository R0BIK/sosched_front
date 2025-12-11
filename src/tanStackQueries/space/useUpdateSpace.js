import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpace } from "../../services/api/spaceApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

export const useUpdateSpace = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: ({ id, data }) => updateSpace(id, data),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["spaces", user?.id] });

            // Если у вас есть запрос на конкретный спейс, можно инвалидировать и его
            // void queryClient.invalidateQueries({ queryKey: ["space", data.id] });
        },
        onError: (err) => {
            console.error("Error updating space:", err);
        },
    });
};