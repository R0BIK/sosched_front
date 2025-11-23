import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteEvent} from "../../services/api/eventApi.js";

export function useDeleteEvent(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteEvent(id, domain),

        onSuccess: () => {
            void queryClient.invalidateQueries(["events", domain]);
        },

        onError: (err) => {
            console.error("Error deleting event:", err);
        }
    });
}