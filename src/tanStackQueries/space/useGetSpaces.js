import { useInfiniteQuery } from "@tanstack/react-query";
import { getSpaces } from "../../services/api/spaceApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

export const useGetSpaces = () => {
    const { user } = useAuth();

    return useInfiniteQuery({
        queryKey: ["spaces", user?.id],
        queryFn: async ({ pageParam = 1 }) => {
            return await getSpaces({ page: pageParam, pageSize: 5 });
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.page + 1 : undefined,
        enabled: !!user,
    });
};