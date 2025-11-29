import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { checkAuth, login, register, logout } from "../services/api/authApi.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: checkAuth,
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            // queryClient.setQueryData(["user"], data);
            void queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        // onError: (error) => {
        //     console.error(error);
        // },
    });

    const registerMutation = useMutation({
        mutationFn: register, // Используем импортированную функцию
        // Здесь можно добавить onSuccess, если после регистрации должен быть автоматический вход
        // onSuccess: (data) => queryClient.setQueryData(["user"], data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),

        onError: (error) => {
            console.error('Error register:', error);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logout, // Используем импортированную функцию
        onSuccess: () => {
            // После успешного выхода очищаем данные пользователя в кэше
            queryClient.setQueryData(["user"], null);
            // queryClient.removeQueries(["user"]); // Альтернатива: удалить ключ
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