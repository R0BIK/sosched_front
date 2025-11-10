import {useState} from "react";
import {EditIcon} from "../../img/svg/Icons.jsx";
import EditTagModal from "../../components/Modals/EditTagModal.jsx";
import Badge from "../../components/Badges/Badge.jsx";
import {useLockBodyScroll} from "../../hooks/useLockBodyScroll.js";

const tags1 = [
    {id: "1", name: "IP-33", members: "20", tag: "ІП-33", tagColor: "red"},
    {id: "2", name: "IP-31", members: "21", tag: "ІП-31", tagColor: "green"},
    {id: "3", name: "IP-32", members: "22", tag: "ІП-32", tagColor: "yellow"},
    {id: "4", name: "IP-33", members: "19", tag: "ІП-33", tagColor: "pink"},
];

export default function Tags() {
    const [tags, setTags] = useState(tags1);
    const [selectedTag, setSelectedTag] = useState(null);
    useLockBodyScroll(!!selectedTag);

    const handleEdit = (tag) => setSelectedTag(tag);
    const handleClose = () => setSelectedTag(null);

    const handleCreate = () => {
        setSelectedTag({
            id: null,
            name: "",
            members: "0",
            tag: "",
            tagColor: "gray",
        });
    };

    const handleDeleteTag = (id) => {
        setTags((prevTags) => prevTags.filter((t) => t.id !== id));
        setSelectedTag(null);
    };

    const handleSaveTag = (updatedTag) => {
        setTags((prevTags) => {
            if (updatedTag.id) {
                return prevTags.map((t) => (t.id === updatedTag.id ? updatedTag : t));
            } else {
                const newTag = {
                    ...updatedTag,
                    id: Date.now().toString(), // уникальный ID
                };
                return [...prevTags, newTag];
            }
        });
        setSelectedTag(null);
    };

    return (
        <div className="py-5 px-9 w-full overflow-auto">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Теги</h1>
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
                        Створити тег
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
                                Тег – {tags.length}
                            </th>
                            <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                Учасники
                            </th>
                            <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                Бейдж
                            </th>
                            <th scope="col" className="w-1/20 py-3.5">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-transparent">
                        {tags.map((tag) => (
                            <tr key={tag.id} className="w-full">
                                <td className="w-9/20 py-4 text-sm break-all text-main-black">
                                    {tag.name}
                                </td>
                                <td className="w-1/4 py-4 text-sm break-all text-second-text text-center">{tag.members}</td>
                                <td className="w-1/4 py-4 text-center text-sm whitespace-nowrap text-main-black">
                                    <Badge text={tag.tag} color={tag.tagColor} />
                                </td>
                                <td className="w-1/20 text-right">
                                    <button
                                        onClick={() => handleEdit(tag)}
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

            {selectedTag && (
                <EditTagModal handleClose={handleClose} tag={selectedTag} handleSaveTag={handleSaveTag} handleDeleteTag={handleDeleteTag}/>
            )}
        </div>
    );
}