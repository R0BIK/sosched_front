import PropTypes from "prop-types";
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useAuth } from "./AuthContext.jsx";
import { LOCAL_STORAGE_NAMES } from "../constants/constants.js";
import {getSpaces, createSpace, updateSpace} from "../services/api/spaceApi.js";
import {useMutation, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";

const SpaceContext = createContext();

const getSpaceStorageKey = (userId) => {
    return `${LOCAL_STORAGE_NAMES.ACTIVE_SPACE}_${userId}`;
};

export function SpaceProvider({ children }) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [activeSpace, setActiveSpace] = useState(null);

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["spaces", user?.id],
        queryFn: async ({ pageParam = 1 }) => {
            return await getSpaces({ page: pageParam, pageSize: 5 });
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.page + 1 : undefined,
        enabled: !!user,
    });

    const spaces = useMemo(() => {
        return infiniteQuery?.data?.pages.flatMap(page => page.items) || [];
    }, [infiniteQuery?.data]);

    const isLoading = infiniteQuery?.isLoading;
    const isError = infiniteQuery?.isError;

    const switchSpace = useCallback((space) => {
        setActiveSpace(space);
        localStorage.setItem(getSpaceStorageKey(user?.id), space.domain);
    }, [user?.id]);

    useEffect(() => {
        const userId = user?.id;

        if (!userId) {
            setActiveSpace(null);
            return;
        }

        if (!spaces.length) return;

        const storageKey = getSpaceStorageKey(userId);

        // Чтение домена, привязанного к текущему пользователю
        const savedDomain = localStorage.getItem(storageKey);


        // Находим сохраненный Space или берем первый в списке
        const defaultSpace = spaces.find(s => s.domain === savedDomain) || spaces[0];

        switchSpace(defaultSpace);
    }, [spaces, user, switchSpace]);


    const createSpaceMutation = useMutation({
        mutationFn: createSpace,
        onSuccess: (newSpace) => {
            void queryClient.invalidateQueries({ queryKey: ["spaces", user?.id] });
            switchSpace(newSpace);
        },
        onError: (err) => {
            console.error("Error creating space:", err);
        },
    });

    const updateSpaceMutation = useMutation({
        mutationFn: ({id, data}) => updateSpace(id, data),
        onSuccess: (newSpace) => {
            void queryClient.invalidateQueries({queryKey: ["spaces", user?.id] });
        },
        onError: (err) => {
            console.error("Error editing space:", err);
        },
    })

    return (
        <SpaceContext.Provider
            value={{
                spaces,
                activeSpace,
                spaceQuery: infiniteQuery,
                switchSpace,
                createSpace: createSpaceMutation.mutateAsync,
                updateSpace: updateSpaceMutation.mutateAsync,
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