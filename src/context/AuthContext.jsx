import { createContext, useContext, useState, useEffect } from 'react';
import api from "../api/axios.js";
import PropTypes from "prop-types";
import {API_ENDPOINTS} from "../../constants.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(API_ENDPOINTS.AUTH.CHECK_AUTH)
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    console.log(user);

    const login = async (credentials) => {
        await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        const res = await api.get(API_ENDPOINTS.AUTH.CHECK_AUTH);
        setUser(res.data);
    }

    const logout = async () => {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT, {});
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node
}