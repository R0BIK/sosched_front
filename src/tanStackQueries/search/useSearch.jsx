import { useQuery } from "@tanstack/react-query";
import { getUsersAndTags } from "../../services/searchApi.js";

export function useSearch(domain, search) {
    return useQuery({
        queryKey: ["search", domain, search],
        queryFn: () => getUsersAndTags(domain, 10, search),
        enabled: !!domain && search.trim().length > 0,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}