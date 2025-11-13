import { useQuery } from '@tanstack/react-query';
import {getEvents} from "../../services/eventApi.js";

export function useGetEvents(data, domain) {
    return useQuery({
        queryKey: ['event', data, domain],
        queryFn: () => getEvents(data, domain),
        enabled: !!data && !!domain,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}