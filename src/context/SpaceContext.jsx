import PropTypes from "prop-types";
import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext.jsx";
import api from "../api/axios.js";
import {API_ENDPOINTS, LOCAL_STORAGE_NAMES} from "../../constants.js";
import {unpackResponse} from "../utils/unpackResponse.js";

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
                const { data, error, pagination } = unpackResponse(res.data);
                if (error) {
                    console.error("Error unpacking spaces:", error);
                    return;
                }

                setSpaces(data || []);
                const saved = localStorage.getItem(LOCAL_STORAGE_NAMES.ACTIVE_SPACE);
                const defaultSpace =
                    (pagination?.data.find(s => s.domain === saved) || data[0]) ?? null;
                setActiveSpace(defaultSpace);
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