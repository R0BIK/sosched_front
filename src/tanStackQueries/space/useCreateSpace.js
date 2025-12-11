import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpace } from "../../services/api/spaceApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

export const useCreateSpace = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: createSpace,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["spaces", user?.id] });
        },
        onError: (err) => {
            console.error("Error creating space:", err);
        },
    });
};