import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTagType} from "../../services/api/tagTypeApi.js";

export function useUpdateTagType(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateTagType(id, domain, data),

        onSuccess: (data) => {
            console.log("TagType updated successfully:", data);

            void queryClient.invalidateQueries({
                queryKey: ["tagTypes", domain]
            });
        },

        onError: (error) => {
            console.error("Failed to update tagType:", error);
        },
    });
}