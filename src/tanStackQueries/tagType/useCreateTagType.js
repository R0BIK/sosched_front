import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createTagType} from "../../services/tagTypeApi.js";

export function useCreateTagType(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => createTagType(request, domain),
        onSuccess: async (data) => {
            console.log('Tag type created successfully:', data);
            void queryClient.invalidateQueries(['tagType']);
        },
        onError: (error) => {
            console.error('Error creating tag type:', error);
        },
    });
}