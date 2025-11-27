import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";
import {updateUser} from "../../services/api/userApi.js";

export function useUpdateUser(domain) {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: (updatedForm) => updateUser(updatedForm, domain),

        onSuccess: (data) => {
            void queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
            void queryClient.invalidateQueries({ queryKey: ["user", user?.id, domain] });
        },

        onError: (error) => {
            console.error("Failed to update user profile:", error);
        },
    });
}