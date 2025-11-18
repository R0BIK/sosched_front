import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTag } from "../../services/tagApi.js";

export function useCreateTag(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => createTag(request, domain),
        onSuccess: async (data) => {
            console.log('Tag created successfully:', data);
            void queryClient.invalidateQueries(['tags', domain]);
            return data;
        },
        onError: (error) => {
            console.error('Error creating tag:', error);
        },
    });
}