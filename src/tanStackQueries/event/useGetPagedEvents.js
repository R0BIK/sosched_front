import {useInfiniteQuery} from "@tanstack/react-query";
import {getEvents} from "../../services/api/eventApi.js";

export function useGetPagedEvents(data, domain) {

    const enabled = !!domain;

    return useInfiniteQuery({
        queryKey: ["events", domain, data, 'paged'],
        queryFn: async ({ pageParam = 1 }) => {
            const pagination = {
                page: pageParam,
                pageSize: 10,
            };

            const response = await getEvents(data, domain, true, pagination);

            return {
                ...response
            };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage
                ? lastPage.page + 1
                : undefined;
        },
        enabled,
    });
}