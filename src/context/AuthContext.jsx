import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {API_ENDPOINTS} from "../../constants.js";
import {api} from "../api/apiClient.js";

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

    const login = async (data) => {
        const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, data)
        setUser(res.data);
    }

    const register = async (data) => {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    };

    const logout = async () => {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT, {});
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node
}