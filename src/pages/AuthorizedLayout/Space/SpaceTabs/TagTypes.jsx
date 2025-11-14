import {useCallback, useState} from "react";
import {EditIcon} from "../../../../img/svg/Icons.jsx";
import {useLockBodyScroll} from "../../../../hooks/useLockBodyScroll.js";
import {useSpace} from "../../../../context/SpaceContext.jsx";
import EditTagTypeModal from "../../../../components/Modals/EditTagTypeModal.jsx";
import {useCreateTagType} from "../../../../tanStackQueries/tagType/useCreateTagType.js";
import {useGetTagTypes} from "../../../../tanStackQueries/tagType/useGetTagTypes.js";
import InfiniteScrollWrapper from "../../../../components/Scroll/InfiniteScrollWrapper.jsx";

import DeleteIcon from '@mui/icons-material/Delete';
import {useDeleteTagType} from "../../../../tanStackQueries/tagType/useDeleteTagType.js";

export default function TagTypes() {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const tagTypesQuery = useGetTagTypes(domain);

    const tagTypes = tagTypesQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = tagTypesQuery.data?.pages?.[0]?.totalCount ?? 0;

    const { mutate: createTagTypeMutate } = useCreateTagType(domain);
    const { mutate: deleteTagTypeMutate } = useDeleteTagType(domain);

    const [selectedTagType, setSelectedTagType] = useState(null);
    useLockBodyScroll(!!selectedTagType);

    const handleEdit = (tagType) => setSelectedTagType(tagType);
    const handleClose = () => setSelectedTagType(null);

    const handleCreate = () => {
        setSelectedTagType({
            id: null,
            name: ""
        });
    };

    const handleDeleteTagType = useCallback((id) => {
        deleteTagTypeMutate(id);
    }, [deleteTagTypeMutate]);

    const handleSaveTagType = useCallback((updatedTagType) => {
        if (!updatedTagType.name.trim()) return;

        createTagTypeMutate(updatedTagType);
    }, [createTagTypeMutate]);

    return (
        <div className="py-5 px-9 w-full overflow-hidden">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Типи тегів</h1>
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
                        Створити тип тегу
                    </button>
                </div>
            </div>
            <div className="mt-8 w-full h-[calc(100vh-200px)]">
                <InfiniteScrollWrapper query={tagTypesQuery}>
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-300 font-noto">
                            <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="w-9/20 py-3.5 text-left text-sm font-semibold text-main-black"
                                >
                                    Тип тегу – {totalCount}
                                </th>
                                <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Теги
                                </th>
                                <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Учасники
                                </th>
                                <th scope="col" className="w-1/40 py-3.5">
                                    <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="w-1/40 py-3.5">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-transparent">
                            {tagTypes?.map((tagType) => (
                                <tr key={tagType.id} className="w-full">
                                    <td className="w-9/20 py-4 text-sm break-all text-main-black">
                                        {tagType.name}
                                    </td>
                                    <td className="w-1/4 py-4 text-sm break-all text-second-text text-center">{tagType.tagsCount}</td>
                                    <td className="w-1/4 py-4 text-center text-sm whitespace-nowrap text-second-text">{tagType.usersCount}</td>
                                    <td className="w-1/40 text-right">
                                        <button
                                            onClick={() => handleEdit(tagType)}
                                            title="Редагувати"
                                            className="p-1 inline-block group relative"
                                        >
                                            <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                        </button>
                                    </td>
                                    <td className="w-1/40 text-right">
                                        <button
                                            onClick={() => handleDeleteTagType(tagType.id)}
                                            title="Видалити"
                                            className="p-1 inline-block group relative text-second-text hover:text-red-600"
                                        >
                                            <DeleteIcon/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </InfiniteScrollWrapper>
            </div>

            {selectedTagType && (
                <EditTagTypeModal handleClose={handleClose} tagType={selectedTagType} handleSaveTagType={handleSaveTagType} handleDeleteTagType={handleDeleteTagType}/>
            )}
        </div>
    );
}