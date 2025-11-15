import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/userApi.js";

export function useGetUsers(domain, filterObj, search) {
    return useInfiniteQuery({
        queryKey: ["users", domain, filterObj, search],

        queryFn: async ({ pageParam = 1 }) => {
            const response = await getUsers(
                domain,
                {
                    page: pageParam,
                    pageSize: 20, // можешь изменить
                },
                filterObj,
                search
            );

            return { ...response }; // page, items, hasNextPage, etc.
        },

        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.page + 1 : undefined,

        enabled: !!domain,
    });
}