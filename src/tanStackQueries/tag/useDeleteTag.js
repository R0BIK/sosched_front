import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../../services/api/tagApi.js";

export function useDeleteTag(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteTag(id, domain),

        onSuccess: () => {
            void queryClient.invalidateQueries(["tags", domain]);
        },

        onError: (err) => {
            console.error("Error deleting tag:", err);
        }
    });
}