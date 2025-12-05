import { useInfiniteQuery } from "@tanstack/react-query";
import { getTags } from "../../services/api/tagApi.js";

export function useGetTags(domain, filterObj) {
    return useInfiniteQuery({
        queryKey: ["tags", domain, filterObj],

        queryFn: async ({ pageParam = 1 }) => {
            const response = await getTags(
                domain,
                {
                    page: pageParam,
                    pageSize: 10, // можно подстроить под нужный размер страницы
                },
                filterObj
            );

            return {
                ...response
            };
        },

        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage
                ? lastPage.page + 1
                : undefined;
        },

        enabled: !!domain, // не вызываем пока нет domain
    });
}