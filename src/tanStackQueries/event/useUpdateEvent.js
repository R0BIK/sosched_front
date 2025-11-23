import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateEvent} from "../../services/api/eventApi.js";

export function useUpdateEvent(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateEvent(id, domain, data),

        onSuccess: (data) => {
            console.log("Event updated successfully:", data);

            void queryClient.invalidateQueries({
                queryKey: ["event", domain]
            });
        },

        onError: (error) => {
            console.error("Failed to update event:", error);
        },
    });
}