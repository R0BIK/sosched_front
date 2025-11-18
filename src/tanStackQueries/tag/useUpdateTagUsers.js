import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsers } from "../../services/tagApi.js";

export function useUpdateTagUsers(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ tagId, data }) => updateUsers(tagId, data, domain),

        onSuccess: (data) => {
            console.log("update success:", data);
            void queryClient.invalidateQueries(["tags", domain]);

            void queryClient.invalidateQueries(["users", domain]);
        },

        onError: (error) => {
            console.error("Failed to update tag users:", error);
        },
    });
}