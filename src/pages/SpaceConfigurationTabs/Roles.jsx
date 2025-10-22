import {useEffect, useState} from "react";
import EditRoleModal from "../../components/EditRoleModal.jsx";
import {EditIcon} from "../../img/svg/Icons.jsx";

const people = [
    { name: "Викладач", title: "20" },
    { name: "Староста", title: "50" },
    { name: "Студент", title: "300" },
    { name: "Декан", title: "1" },
    { name: "Керуючий", title: "2" },
    { name: "Старший викладач", title: "15" },
    { name: "Старший викладач", title: "15" },
    { name: "Старший викладач", title: "15" },
    { name: "Старший викладач", title: "15" },
    { name: "Старший викладач", title: "15" },
    { name: "Старший викладач", title: "15" },
    { name: "Старший викладач", title: "15" },
];

export default function Roles() {
    const [selectedRole, setSelectedRole] = useState(null);

    const handleEdit = (role) => {
        setSelectedRole(role);
    };

    const handleClose = () => {
        setSelectedRole(null);
    };

    useEffect(() => {
        if (selectedRole) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Очистка (на случай размонтирования)
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedRole]);

    return (
        <div className="py-5 px-30 flex flex-col w-full relative">
            <div className="flex items-center w-full justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-gray-900">Ролі</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <button
                    type="button"
                    className="flex whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Створити роль
                </button>
            </div>

            <div className="flex flex-col mt-8 font-noto">
                <div className="border-b flex border-gray-300 w-full py-4">
                    <div className="w-1/2 whitespace-nowrap font-bold">Назва</div>
                    <div className="w-1/2 whitespace-nowrap font-bold">Учасники</div>
                </div>

                <div className="overflow-y-visible">
                    {people.map((item, index) => (
                        <div key={index} className="border-b flex border-gray-300 py-4 items-center">
                            <div className="w-1/2 break-all pr-10">{item.name}</div>
                            <div className="w-1/4 break-all">{item.title}</div>
                            <div className="w-1/4 flex justify-end">
                                <button
                                    onClick={() => handleEdit(item)}
                                    title="Редагувати"
                                >
                                    <EditIcon className="fill-second-text size-6 hover:fill-main-black"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedRole && (
                <EditRoleModal handleClose={handleClose} name={selectedRole.name} />
            )}
        </div>
    );
}