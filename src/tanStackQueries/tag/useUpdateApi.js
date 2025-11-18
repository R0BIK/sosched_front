import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTag} from "../../services/tagApi.js";

export function useUpdateTag(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateTag(id, domain, data),

        onSuccess: (data) => {
            console.log("Tag updated successfully:", data);

            void queryClient.invalidateQueries({
                queryKey: ["tags", domain]
            });
        },

        onError: (error) => {
            console.error("Failed to update tag:", error);
        },
    });
}