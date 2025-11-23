import {useMutation, useQueryClient} from '@tanstack/react-query';
import { createEvent } from "../../services/api/eventApi.js";

export function useCreateEvent(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => createEvent(request, domain),
        onSuccess: async (data) => {
            console.log('Event created successfully:', data);
            await queryClient.invalidateQueries(['event']);
        },
        onError: (error) => {
            console.error('Error creating event:', error);
        },
    });
}