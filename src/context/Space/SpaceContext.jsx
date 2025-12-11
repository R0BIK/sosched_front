import PropTypes from "prop-types";
import {useCallback, useEffect, useMemo, useState} from "react";
import { useAuth } from "../AuthContext.jsx";
import { LOCAL_STORAGE_NAMES } from "../../constants/constants.js";
import { SpaceContext } from './useSpace.js';
import {useGetSpaces} from "../../tanStackQueries/space/useGetSpaces.js";

const getSpaceStorageKey = (userId) => {
    return `${LOCAL_STORAGE_NAMES.ACTIVE_SPACE}_${userId}`;
};

export function SpaceProvider({ children }) {
    const { user } = useAuth();
    const [activeSpace, setActiveSpace] = useState(null);
    const infiniteQuery = useGetSpaces();

    const spaces = useMemo(() => {
        return infiniteQuery?.data?.pages.flatMap(page => page.items) || [];
    }, [infiniteQuery?.data]);

    const switchSpace = useCallback((space) => {
        setActiveSpace(space);
        if (user?.id) {
            localStorage.setItem(getSpaceStorageKey(user.id), space.domain);
        }
    }, [user?.id]);

    useEffect(() => {
        const userId = user?.id;

        if (!userId) {
            setActiveSpace(null);
            return;
        }

        if (!spaces.length) return;

        const storageKey = getSpaceStorageKey(userId);
        const savedDomain = localStorage.getItem(storageKey);

        const defaultSpace = spaces.find(s => s.domain === savedDomain) || spaces[0];

        if (!activeSpace || (defaultSpace && activeSpace.id !== defaultSpace.id)) {
            switchSpace(defaultSpace);
        }
    }, [spaces, user, switchSpace, activeSpace]);

    return (
        <SpaceContext.Provider
            value={{
                spaces,
                domain: activeSpace?.domain,
                activeSpace,
                spaceQuery: infiniteQuery,
                switchSpace,
            }}
        >
            {children}
        </SpaceContext.Provider>
    );
}

SpaceProvider.propTypes = {
    children: PropTypes.node,
};