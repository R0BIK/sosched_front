import { useMutation } from '@tanstack/react-query';
import { createSpace } from '../../services/spaceApi.js';

export function useCreateSpace() {
    return useMutation({
        mutationFn: (spaceData) => createSpace(spaceData),
        onSuccess: (data) => {
            console.log('Space created successfully:', data);
        },
        onError: (error) => {
            console.error('Error creating space:', error);
        },
    });
}