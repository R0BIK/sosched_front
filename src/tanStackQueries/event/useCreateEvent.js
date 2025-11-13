import { useMutation } from '@tanstack/react-query';
import { createEvent } from "../../services/eventApi.js";

export function useCreateEvent(domain) {
    return useMutation({
        mutationFn: (request) => createEvent(request, domain),
        onSuccess: (data) => {
            console.log('Event created successfully:', data);
        },
        onError: (error) => {
            console.error('Error creating event:', error);
        },
    });
}