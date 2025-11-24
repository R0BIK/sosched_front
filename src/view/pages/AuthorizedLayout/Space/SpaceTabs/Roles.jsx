import {useEffect, useState} from "react";
import {EditIcon} from "../../../../../img/svg/Icons.jsx";
import EditRoleModal from "../../../../components/Modals/EditRoleModal.jsx";
import {useLockBodyScroll} from "../../../../../hooks/useLockBodyScroll.js";

export default function Roles() {
    const [roles, setRoles] = useState();
    const [selectedRole, setSelectedRole] = useState(null);
    useLockBodyScroll(!!selectedRole);

    const handleEdit = (role) => setSelectedRole(role);
    const handleClose = () => setSelectedRole(null);

    const handleCreate = () => {
        setSelectedRole({
            id: null,
            name: "",
            members: "0",
            permissions: null
        });
    };

    const handleDeleteRole = (id) => {
        setRoles((prevRoles) => prevRoles.filter((t) => t.id !== id));
        setSelectedRole(null);
    };

    const handleSaveRole = (updatedRole) => {
        setRoles((prevRoles) => {
            if (updatedRole.id) {
                return prevRoles.map((t) => (t.id === updatedRole.id ? updatedRole : t));
            } else {
                const newRole = {
                    ...updatedRole,
                    id: Date.now().toString(), // уникальный ID
                };
                return [...prevRoles, newRole];
            }
        });
        setSelectedRole(null);
    };

    return (
        <div className="py-5 px-9 w-full overflow-auto">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Ролі</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="flex items-start">
                    <button
                        type="button"
                        onClick={handleCreate}
                        className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Створити роль
                    </button>
                </div>
            </div>
            <div className="mt-8 w-full">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-300 font-noto">
                        <thead>
                        <tr>
                            <th
                                scope="col"
                                className="w-9/20 py-3.5 text-left text-sm font-semibold text-main-black"
                            >
                                Роль – {roles?.length}
                            </th>
                            <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                Учасники
                            </th>
                            <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                Дозволи
                            </th>
                            <th scope="col" className="w-1/20 py-3.5">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-transparent">
                        {roles?.map((role) => (
                            <tr key={role.id} className="w-full">
                                <td className="w-9/20 py-4 text-sm break-all text-main-black">
                                    {role.name}
                                </td>
                                <td className="w-1/4 py-4 text-sm break-all text-second-text text-center">{role.members}</td>
                                <td className="w-1/4 py-4 text-sm break-all text-second-text text-center">
                                    {role.permissions.filter(p => p.isGranted === "true").length}
                                </td>
                                <td className="w-1/20 text-right">
                                    <button
                                        onClick={() => handleEdit(role)}
                                        title="Редагувати"
                                        className="p-1 inline-block group relative"
                                    >
                                        <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedRole && (
                <EditRoleModal handleClose={handleClose} role={selectedRole} handleSaveRole={handleSaveRole} handleDeleteRole={handleDeleteRole}/>
            )}
        </div>
    );
}