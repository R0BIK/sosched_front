import { useCallback, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditIcon } from "../../../../../img/svg/Icons.jsx";

// Компоненты
import EditTagModal from "../../../../components/Modals/EditTagModal.jsx";
import Badge from "../../../../components/Badges/Badge.jsx";
import InfiniteScrollTrigger from "../../../../components/InfinityScroll/InfiniteScrollTrigger.jsx"; // <-- Новый компонент

// Хуки и контекст
import { useLockBodyScroll } from "../../../../../hooks/useLockBodyScroll.js";
import { useSpace } from "../../../../../context/SpaceContext.jsx";
import { useInfiniteScroll } from "../../../../components/InfinityScroll/useInfiniteScroll.js"; // <-- Новый хук

// Запросы (React Query)
import { useGetTags } from "../../../../../tanStackQueries/tag/useGetTags.js";
import { useGetTagTypes } from "../../../../../tanStackQueries/tagType/useGetTagTypes.js";
import { useDeleteTag } from "../../../../../tanStackQueries/tag/useDeleteTag.js";
import { useCreateTag } from "../../../../../tanStackQueries/tag/useCreateTag.js";
import { useUpdateTagUsers } from "../../../../../tanStackQueries/tag/useUpdateTagUsers.js";
import { useUpdateTag } from "../../../../../tanStackQueries/tag/useUpdateTag.js";

import { SPECIAL } from "../../../../../constants/constants.js";
import {useValidate} from "../../../../../hooks/useValidate.js";
import {useToast} from "../../../../../context/Toast/useToast.js";
import {getChangedFields} from "../../../../../utils/getChangedFields.js";
import {getValidationErrorsMap} from "../../../../../utils/errorMapping.js";

const FORM_CONFIG = {
    name: true,
    shortName: true,
    tagType: true,
    color: true,
}

export default function Tags() {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const validation = useValidate(FORM_CONFIG);
    const { showToast } = useToast();

    const { validateForm, addExternalError, resetErrors } = validation;

    // --- Queries ---
    const tagTypesQuery = useGetTagTypes(domain);
    const tagQuery = useGetTags(domain);

    const tags = tagQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = tagQuery.data?.pages?.[0]?.totalCount ?? 0;

    const loadMoreRef = useInfiniteScroll(tagQuery);

    // --- Mutations ---
    const { mutateAsync: createTagMutate } = useCreateTag(domain);
    const { mutate: deleteTagMutate } = useDeleteTag(domain);
    const { mutateAsync: updateTagMutate } = useUpdateTag(domain);
    const { mutate: updateUsersMutate } = useUpdateTagUsers(domain);

    // --- State ---
    const [selectedTag, setSelectedTag] = useState(null);
    useLockBodyScroll(!!selectedTag);

    // --- Handlers ---
    const handleEdit = (tag) => setSelectedTag({ tag: tag, type: "edit" });
    const handleClose = useCallback(() => {
        setSelectedTag(null);
        resetErrors();
    }, [resetErrors])

    const handleCreate = () => {
        setSelectedTag({
            tag: {
                id: null,
                name: "",
                shortName: "",
                tagType: null,
                color: SPECIAL.TAG_COLORS.gray.name,
            }, type: "create"
        });
    };

    const handleDeleteTag = useCallback((id) => {
        deleteTagMutate(id);
    }, [deleteTagMutate]);

    const isUpdateDataEmpty = (updateData) => {
        return (
            (!updateData.add || updateData.add.length === 0) &&
            (!updateData.remove || updateData.remove.length === 0) &&
            (!updateData.addFromTags || updateData.addFromTags.length === 0)
        );
    };

    const handleSaveTag = useCallback(async (updatedTag, updatedUsers, type) => {
        const isValid = validateForm(updatedTag);
        if (!isValid) return;

        try {
            if (type === "edit") {
                const changedData = getChangedFields(selectedTag?.tag, updatedTag);

                if (changedData.isChanged) {
                    await updateTagMutate({
                        id: updatedTag.id,
                        data: changedData.data
                    });

                    showToast("Успішно!", "Ви змінили тег.")
                }

                if (!isUpdateDataEmpty(updatedUsers)) {
                    updateUsersMutate({
                        tagId: updatedTag.id,
                        data: updatedUsers
                    });
                }

            } else {
                const created = await createTagMutate(updatedTag);
                showToast("Успішно!", "Ви створили тег.")

                if (!isUpdateDataEmpty(updatedUsers)) {
                    updateUsersMutate({
                        tagId: created.id,
                        data: updatedUsers
                    });
                }
            }
            handleClose();
        } catch (error) {
            const errors = getValidationErrorsMap(error);
            for (const [key, value] of Object.entries(errors)) {
                if (key === "default") {
                    showToast("Помилка!", "Сталась невідома помилка, спробуйте пізніше.", "error")
                    continue;
                }
                addExternalError(key, value);
            }
        }


    }, [validateForm, handleClose, selectedTag?.tag, updateUsersMutate, updateTagMutate, showToast, createTagMutate, addExternalError]);

    return (
        <div className="pt-5 px-9 w-full h-full flex flex-col overflow-auto">
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

            <div className="mt-8 w-full flex flex-col min-h-0">
                <div className="flex w-full border-b border-gray-300 py-3.5 text-sm font-semibold text-main-black z-10">
                    <div className="w-7/20 text-left">
                        Тег – {totalCount}
                    </div>
                    <div className="w-1/5 text-center">
                        Учасники
                    </div>
                    <div className="w-1/5 text-center">
                        Тип тегу
                    </div>
                    <div className="w-1/5 text-center">
                        Бейдж
                    </div>
                    <div className="w-1/40 min-w-8">
                        <span className="sr-only">Edit</span>
                    </div>
                    <div className="w-1/40 min-w-8">
                        <span className="sr-only">Delete</span>
                    </div>
                </div>

                <div className="w-full overflow-y-auto h-full min-h-40 no-scrollbar">
                    <div className="flex flex-col divide-y divide-gray-200">
                        {tags?.map((tag) => (
                            <div key={tag.id} className="flex w-full items-center py-3">
                                <div className="w-7/20 text-sm break-all text-main-black">
                                    {tag.name}
                                </div>
                                <div className="w-1/5 text-sm break-all text-second-text text-center">
                                    {tag.usersCount}
                                </div>
                                <div className="w-1/5 text-sm break-all text-second-text text-center">
                                    {tag.tagType}
                                </div>
                                <div className="w-1/5 text-center text-sm whitespace-nowrap text-main-black flex justify-center">
                                    <Badge text={tag.shortName} color={tag.color} />
                                </div>
                                <div className="w-1/40 text-right flex justify-end min-w-8">
                                    <button
                                        onClick={() => handleEdit(tag)}
                                        title="Редагувати"
                                        className="p-1 inline-block group relative"
                                    >
                                        <EditIcon className="fill-second-text size-6 group-hover:fill-main-black"/>
                                    </button>
                                </div>
                                <div className="w-1/40 flex justify-end min-w-8">
                                    <button
                                        onClick={() => handleDeleteTag(tag.id)}
                                        title="Видалити"
                                        className="p-1 inline-block text-second-text hover:text-red-600"
                                    >
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <InfiniteScrollTrigger
                        ref={loadMoreRef}
                        isFetching={tagQuery.isFetchingNextPage}
                    />
                </div>
            </div>

            {selectedTag && (
                <EditTagModal
                    handleClose={handleClose}
                    selected={selectedTag}
                    handleSaveTag={handleSaveTag}
                    handleDeleteTag={handleDeleteTag}
                    tagTypesQuery={tagTypesQuery}
                    validation={validation}
                />
            )}
        </div>
    );
}