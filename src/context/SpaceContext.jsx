import PropTypes from "prop-types";
import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext.jsx";
import {API_ENDPOINTS, LOCAL_STORAGE_NAMES} from "../../constants.js";
import {api} from "../api/apiClient.js";

const SpaceContext = createContext();

export function SpaceProvider({ children }) {
    const { user } = useAuth();
    const [spaces, setSpaces] = useState([]);
    const [activeSpace, setActiveSpace] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        api.get(API_ENDPOINTS.SPACE)
            .then((res) => {
                setSpaces(res.data.items || []);
                const saved = localStorage.getItem(LOCAL_STORAGE_NAMES.ACTIVE_SPACE);
                const defaultSpace = res.data.items.find(d => d.domain === saved) || res.data.items[0];
                switchSpace(defaultSpace);
            })
            .catch((err) => console.error("Error fetching spaces:", err))
            .finally(() => setLoading(false));
    }, [user]);

    const switchSpace = (space) => {
        setActiveSpace(space);
        localStorage.setItem(LOCAL_STORAGE_NAMES.ACTIVE_SPACE, space.domain);
    };

    const createSpace = async (data) => {
        const res = await api.post(API_ENDPOINTS.SPACE, data)
        switchSpace(res.data);
    }

    return (
        <SpaceContext.Provider value={{ spaces, activeSpace, switchSpace, createSpace, loading }}>
            {children}
        </SpaceContext.Provider>
    );
}


SpaceProvider.propTypes = {
    children: PropTypes.node,
};

export const useSpace = () => useContext(SpaceContext);