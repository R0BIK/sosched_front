import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { API_ENDPOINTS, LOCAL_STORAGE_NAMES } from "../constants/constants.js";
import { api } from "../api/apiClient.js";
import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from "@tanstack/react-query";

const SpaceContext = createContext();

export function SpaceProvider({ children }) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [activeSpace, setActiveSpace] = useState(null);

    const infiniteQuery= useInfiniteQuery({
        queryKey: ["spaces", user?.id],
        queryFn: async ({ pageParam = 1 }) => { // Принимаем pageParam для пагинации
            const res = await api.get(API_ENDPOINTS.SPACE, {
                params: {
                    page: pageParam,
                    pageSize: 5,
                }
            });
            return res.data;
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.page + 1 : undefined,
        enabled: !!user,
    });

    const spaces = infiniteQuery?.data?.pages.flatMap(page => page.items) || [];
    const isLoading = infiniteQuery?.isLoading;
    const isError = infiniteQuery?.isError;

    useEffect(() => {
        if (!spaces.length) return;

        const savedDomain = localStorage.getItem(LOCAL_STORAGE_NAMES.ACTIVE_SPACE);
        const defaultSpace = spaces.find(s => s.domain === savedDomain) || spaces[0];

        setActiveSpace(defaultSpace);
    }, [spaces]);

    const switchSpace = (space) => {
        setActiveSpace(space);
        localStorage.setItem(LOCAL_STORAGE_NAMES.ACTIVE_SPACE, space.domain);
    };

    const createSpaceMutation = useMutation({
        mutationFn: async (data) => {
            const res = await api.post(API_ENDPOINTS.SPACE, data);
            return res.data;
        },
        onSuccess: (newSpace) => {
            queryClient.setQueryData(["spaces", user?.id], (old = []) => [...old, newSpace]);
            switchSpace(newSpace);
        },
        onError: (err) => {
            console.error("Error creating space:", err);
        },
    });

    return (
        <SpaceContext.Provider
            value={{
                spaces,
                activeSpace,
                spaceQuery: infiniteQuery,
                switchSpace,
                createSpace: createSpaceMutation.mutateAsync,
                loading: isLoading,
                isError,
            }}
        >
            {children}
        </SpaceContext.Provider>
    );
}

SpaceProvider.propTypes = {
    children: PropTypes.node,
};

export const useSpace = () => useContext(SpaceContext);