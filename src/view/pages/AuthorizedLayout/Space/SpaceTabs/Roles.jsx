import {useEffect, useState, useCallback} from "react";
import {EditIcon} from "../../../../../img/svg/Icons.jsx";
import EditRoleModal from "../../../../components/Modals/EditRoleModal.jsx";
import {useLockBodyScroll} from "../../../../../hooks/useLockBodyScroll.js";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types"; // Добавляем PropTypes

export default function Roles() {
    // ВАЖНО: Инициализируем roles пустым массивом для маппинга
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    useLockBodyScroll(!!selectedRole);

    // Временная инициализация данных (для демонстрации)
    useEffect(() => {
        setRoles([
            { id: 1, name: "Адміністратор", members: 5, permissions: [{ isGranted: "true" }, { isGranted: "false" }, { isGranted: "true" }] },
            { id: 2, name: "Координатор", members: 12, permissions: [{ isGranted: "false" }, { isGranted: "true" }, { isGranted: "false" }] },
        ]);
    }, []);

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

    // const handleDeleteRole = useCallback((id) => {
    //     setRoles((prevRoles) => prevRoles.filter((t) => t.id !== id));
    //     setSelectedRole(null);
    // }, []);
    //
    // const handleSaveRole = useCallback((updatedRole) => {
    //     setRoles((prevRoles) => {
    //         if (updatedRole.id) {
    //             return prevRoles.map((t) => (t.id === updatedRole.id ? updatedRole : t));
    //         } else {
    //             const newRole = {
    //                 ...updatedRole,
    //                 id: Date.now().toString(), // уникальный ID
    //             };
    //             return [...prevRoles, newRole];
    //         }
    //     });
    //     setSelectedRole(null);
    // }, []);

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

            {/* --- БЛОК ТАБЛИЦЫ FLEXBOX --- */}
            <div className="mt-8 w-full flex flex-col font-noto">

                {/* Шапка (Header) */}
                <div className="flex w-full border-b border-gray-300 py-3.5 text-sm font-semibold text-main-black shrink-0">
                    <div className="w-9/20 text-left">
                        Роль – {roles?.length}
                    </div>
                    <div className="w-1/4 text-center">
                        Учасники
                    </div>
                    <div className="w-1/4 text-center">
                        Дозволи
                    </div>
                    <div className="w-1/20 min-w-8">
                        <span className="sr-only">Edit</span>
                    </div>
                </div>

                {/* Тело (Body) со скроллом и разделителями */}
                <div className="flex flex-col divide-y divide-gray-200 w-full overflow-y-auto">
                    {roles?.map((role) => (
                        <div key={role.id} className="flex w-full items-center py-3">

                            {/* Колонка 1: Роль */}
                            <div className="w-9/20 text-sm break-all text-main-black">
                                {role.name}
                            </div>

                            {/* Колонка 2: Участники */}
                            <div className="w-1/4 text-sm break-all text-second-text text-center">
                                {role.members}
                            </div>

                            {/* Колонка 3: Разрешения */}
                            <div className="w-1/4 text-sm break-all text-second-text text-center">
                                {role.permissions.filter(p => p.isGranted === "true").length}
                            </div>

                            {/* Колонка 4: Edit */}
                            <div className="w-1/20 text-right min-w-8">
                                <button
                                    onClick={() => handleEdit(role)}
                                    title="Редагувати"
                                    className="p-1 inline-block group relative"
                                >
                                    <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* --- КОНЕЦ БЛОКА FLEXBOX --- */}

            {/*{selectedRole && (*/}
            {/*    <EditRoleModal handleClose={handleClose} role={selectedRole} handleSaveRole={handleSaveRole} handleDeleteRole={handleDeleteRole}/>*/}
            {/*)}*/}
        </div>
    );
}