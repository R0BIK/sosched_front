import {useCallback, useState} from "react";
import {EditIcon} from "../../../../img/svg/Icons.jsx";
import EditTagModal from "../../../../components/Modals/EditTagModal.jsx";
import Badge from "../../../../components/Badges/Badge.jsx";
import {useLockBodyScroll} from "../../../../hooks/useLockBodyScroll.js";
import {useGetTags} from "../../../../tanStackQueries/tag/useGetTags.js";
import {useSpace} from "../../../../context/SpaceContext.jsx";
import {useGetTagTypes} from "../../../../tanStackQueries/tagType/useGetTagTypes.js";
import {useDeleteTag} from "../../../../tanStackQueries/tag/useDeleteTag.js";
import {useCreateTag} from "../../../../tanStackQueries/tag/useCreateTag.js";
import DeleteIcon from "@mui/icons-material/Delete";
import {SPECIAL} from "../../../../../constants.js";
import InfiniteScrollWrapper from "../../../../components/Scroll/InfiniteScrollWrapper.jsx";

export default function Tags() {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const tagTypesQuery = useGetTagTypes(domain);

    const tagQuery = useGetTags(domain);

    const tags = tagQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = tagQuery.data?.pages?.[0]?.totalCount ?? 0;

    const { mutate: createTagMutate } = useCreateTag(domain);
    const { mutate: deleteTagMutate } = useDeleteTag(domain);

    const [selectedTag, setSelectedTag] = useState(null);
    useLockBodyScroll(!!selectedTag);

    const handleEdit = (tag) => setSelectedTag(tag);
    const handleClose = () => setSelectedTag(null);

    const handleCreate = () => {
        setSelectedTag({
            id: null,
            name: "",
            shortName: "",
            tagType: null,
            color: SPECIAL.TAG_COLORS.gray.name,
        });
    };

    const handleDeleteTag = useCallback((id) => {
        deleteTagMutate(id);
    }, [deleteTagMutate]);

    const handleSaveTag = useCallback((updatedTag) => {
        if (!updatedTag.name.trim()) return;

        createTagMutate(updatedTag);
    }, [createTagMutate]);

    return (
        <div className="py-5 px-9 w-full overflow-hidden">
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
            <div className="mt-8 w-full h-[calc(100vh-200px)]">
                <InfiniteScrollWrapper query={tagQuery}>
                    <div className="inline-block min-w-full align-middle h-full">
                        <table className="min-w-full divide-y divide-gray-300 font-noto">
                            <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="w-7/20 py-3.5 text-left text-sm font-semibold text-main-black"
                                >
                                    Тег – {totalCount}
                                </th>
                                <th scope="col" className="w-1/5 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Учасники
                                </th>
                                <th scope="col" className="w-1/5 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Тип тегу
                                </th>
                                <th scope="col" className="w-1/5 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Бейдж
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
                            {tags?.map((tag) => (
                                <tr key={tag.id} className="w-full">
                                    <td className="w-7/20 py-4 text-sm break-all text-main-black">
                                        {tag.name}
                                    </td>
                                    <td className="w-1/5 py-4 text-sm break-all text-second-text text-center">{tag.usersCount}</td>
                                    <td className="w-1/5 py-4 text-sm break-all text-second-text text-center">{tag.tagType}</td>
                                    <td className="w-1/5 py-4 text-center text-sm whitespace-nowrap text-main-black">
                                        <Badge text={tag.shortName} color={tag.color} />
                                    </td>
                                    <td className="w-1/40 text-right">
                                        <button
                                            onClick={() => handleEdit(tag)}
                                            title="Редагувати"
                                            className="p-1 inline-block group relative"
                                        >
                                            <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                        </button>
                                    </td>
                                    <td className="w-1/40 text-right">
                                        <button
                                            onClick={() => handleDeleteTag(tag.id)}
                                            title="Видалити"
                                            className="p-1 inline-block text-second-text hover:text-red-600"
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

            {selectedTag && (
                <EditTagModal handleClose={handleClose} tag={selectedTag} handleSaveTag={handleSaveTag} handleDeleteTag={handleDeleteTag} tagTypesQuery={tagTypesQuery} />
            )}
        </div>
    );
}