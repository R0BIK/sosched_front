import {useEffect, useState} from "react";
import {EditIcon} from "../../img/svg/Icons.jsx";
import EditTagModal from "../../components/EditTagModal.jsx";

const people = [
    { name: "Викладач", title: "20", tag: "KPI" },
    { name: "Староста", title: "50", tag: "KPI"  },
    { name: "Студент", title: "300", tag: "KPI"  },
    { name: "Декан", title: "1", tag: "KPI" },
    { name: "Керуючий", title: "2", tag: "KPI"  },
    { name: "Старший викладач", title: "15", tag: "KPI"  },
    { name: "Старший викладач", title: "15", tag: "KPI"  },
    { name: "Старший викладач", title: "15", tag: "KPIHFD"  },
    { name: "Старший викладач", title: "15", tag: "KPI"  },
    { name: "Старший викладач", title: "15", tag: "KPI"  },
    { name: "Старший викладач", title: "15", tag: "KPI"  },
];

export default function Tags() {
    const [selectedTag, setSelectedTag] = useState(null);

    const handleEdit = (tag) => {
        setSelectedTag(tag);
    };

    const handleClose = () => {
        setSelectedTag(null);
    };

    useEffect(() => {
        if (selectedTag) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Очистка (на случай размонтирования)
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedTag]);

    return (
        <div className="py-5 px-30 flex flex-col w-full relative">
            <div className="flex items-center w-full justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-gray-900">Теги</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <button
                    type="button"
                    className="flex whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Створити тег
                </button>
            </div>

            <div className="flex flex-col mt-8 font-noto">
                <div className="border-b flex border-gray-300 w-full py-4">
                    <div className="w-9/20 whitespace-nowrap font-bold">Назва</div>
                    <div className="w-1/4 whitespace-nowrap font-bold flex justify-center">Учасники</div>
                    <div className="w-1/4 whitespace-nowrap font-bold flex justify-center">Тег</div>
                    <div className="w-1/20 whitespace-nowrap font-bold"></div>
                </div>

                <div className="overflow-y-visible">
                    {people.map((item, index) => (
                        <div key={index} className="border-b flex border-gray-300 py-4 items-center">
                            <div className="w-9/20 break-all pr-10">{item.name}</div>
                            <div className="w-1/4 break-all flex justify-center">{item.title}</div>
                            <div className="w-1/4 flex justify-center">
                                <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                    {item.tag}
                                </span>
                            </div>
                            <div className="w-1/20 flex justify-end">
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

            {selectedTag && (
                <EditTagModal handleClose={handleClose} name={"selectedRole.name"} />
            )}
        </div>
    );
}