import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTagType } from "../../services/tagTypeApi.js";

export function useDeleteTagType(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteTagType(id, domain),

        onSuccess: () => {
            void queryClient.invalidateQueries(["tagTypes", domain]);
        },

        onError: (err) => {
            console.error("Error deleting tag type:", err);
        }
    });
}