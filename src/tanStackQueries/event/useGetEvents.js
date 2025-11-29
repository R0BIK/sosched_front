import {useQuery} from "@tanstack/react-query";
import {getEvents} from "../../services/api/eventApi.js";

export function useGetEvents(data, userId, domain) {
    const enabled = !!domain && !!data?.dateFrom && !!data?.dateTo;

    return useQuery({
        queryKey: ['events', domain, data, userId, 'list'],

        queryFn: () => getEvents(data, domain, userId, null),

        enabled,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}