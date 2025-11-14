import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../constants.js";
import { api } from "../api/apiClient.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await api.get(API_ENDPOINTS.AUTH.CHECK_AUTH);
            return res.data;
        },
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: async (data) => {
            const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (data) => {
            const res = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
            return res.data;
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        },
        onSuccess: () => {
            queryClient.removeQueries(["user"]);
        },
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                loading: isLoading,
                isError,
                login: loginMutation.mutateAsync,
                register: registerMutation.mutateAsync,
                logout: logoutMutation.mutateAsync,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);