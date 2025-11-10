import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/userApi.js';

export function useUserById(userId) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}