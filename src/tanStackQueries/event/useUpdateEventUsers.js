import { useMutation, useQueryClient } from "@tanstack/react-query";
import {updateEventUsers} from "../../services/api/eventApi.js";

export function useUpdateEventUsers(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ eventId, data }) => updateEventUsers(eventId, data, domain),

        onSuccess: (data) => {
            console.log("update success:", data);
            void queryClient.invalidateQueries(["events", domain]);

            void queryClient.invalidateQueries(["users", domain]);
        },

        onError: (error) => {
            console.error("Failed to update event users:", error);
        },
    });
}