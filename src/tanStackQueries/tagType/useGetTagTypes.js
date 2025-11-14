import { useInfiniteQuery } from "@tanstack/react-query";
import { getTagTypes } from "../../services/tagTypeApi";

export function useGetTagTypes(domain) {
    return useInfiniteQuery({
        queryKey: ["tagTypes", domain],

        queryFn: async ({ pageParam = 1 }) => {
            const response = await getTagTypes(domain, {
                page: pageParam,
                pageSize: 10,
            });

            return {
                ...response
            };
        },

        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage
                ? lastPage.page + 1
                : undefined;
        },

        enabled: !!domain,
    });
}