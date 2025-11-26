import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/api/userApi.js';

export function useGetUserById(userId, domain) {
    return useQuery({
        queryKey: ['user', userId, domain],
        queryFn: () => getUserById(userId, domain),
        enabled: !!userId && !!domain,
        retry: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}