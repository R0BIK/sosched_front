import { useQuery } from '@tanstack/react-query';
import {getEventTypes} from "../../services/eventTypeApi.js";

export function useGetEventTypes() {
    return useQuery({
        queryKey: ['eventType'],
        queryFn: () => getEventTypes(),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}