import { useInfiniteQuery } from "@tanstack/react-query";
import {getRoles} from "../../services/api/roleApi.js";

export function useGetRoles(domain) {
    return useInfiniteQuery({
        queryKey: ["roles", domain],

        queryFn: async ({ pageParam = 1 }) => {
            const response = await getRoles(domain, {
                page: pageParam,
                pageSize: 10, // можно подстроить под нужный размер страницы
            });

            return {
                ...response // ожидается: items, page, pageSize, totalPages, hasNextPage
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