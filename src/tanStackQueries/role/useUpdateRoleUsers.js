import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateRoleUsers} from "../../services/api/roleApi.js";

export function useUpdateRoleUsers(domain) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ roleId, data }) => updateRoleUsers(roleId, data, domain),

        onSuccess: () => {
            void queryClient.invalidateQueries(["tags", domain]);

            void queryClient.invalidateQueries(["users", domain]);
        },

        onError: (error) => {
            console.error("Failed to update tag users:", error);
        },
    });
}