import PropTypes from "prop-types";
import {useState, useMemo, useCallback} from "react";

import InputBox from "../BasicInputs/InputBox.jsx";
import SelectMenu from "../BasicInputs/SelectMenu.jsx";
import { SPECIAL } from "../../../constants/constants.js";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx";
import SelectMenuLazy from "../BasicInputs/SelectMenuLazy.jsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import {useSpace} from "../../../context/SpaceContext.jsx";
import {useSearch} from "../../../tanStackQueries/search/useSearch.jsx";
import Badge from "../Badges/Badge.jsx";
import {useGetUsers} from "../../../tanStackQueries/user/useGetUsers.js";

import { useInfiniteScroll } from "../InfinityScroll/useInfiniteScroll.js";
import InfiniteScrollTrigger from "../InfinityScroll/InfiniteScrollTrigger.jsx";

export default function EditTagModal({ handleClose, selected, handleSaveTag, handleDeleteTag, tagTypesQuery, validation }) {
    const [formData, setFormData] = useState({ ...selected?.tag });
    const [search, setSearch] = useState("");
    const [entityToChange, setEntityToChange] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const filterObj = { tag: [selected.tag.shortName] }
    const { errors, validateField, clearError } = validation;

    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const searchQuery = useSearch(domain, search);

    const result = searchQuery.data;

    const userQuery = useGetUsers(domain, filterObj, null);

    const users = userQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const displayedUsers = users.filter(user =>
        !entityToChange.some(change => change.id === user.id && change.type === "remove")
    );

    const removedCount = entityToChange.filter(e => e.type === "remove").length;
    const totalUsersCount = (userQuery.data?.pages?.[0]?.totalCount ?? 0) - removedCount;

    const loadMoreRef = useInfiniteScroll(userQuery);

    const onEntityClick = (item, type) => {
        setIsSearchFocused(false);
        setSearch("");
        setEntityToChange((prev) => {
            if (type === "user" && prev.some((e) => e.id === item.id && e.type === "remove")) {
                return prev.filter((e) => !(e.id === item.id && e.type === "remove"));
            }

            if (prev.some((e) => e.id === item.id && e.type === type)) return prev;
            return [...prev, { ...item, type: type }];
        });
    };

    const handleMarkForRemoval = (userId) => {
        setEntityToChange((prev) => {
            if (prev.some(e => e.id === userId && e.type === "remove")) return prev;

            return [...prev, { id: userId, type: "remove" }];
        });
    };

    const handleChange = useCallback((key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        clearError(key);
    }, [clearError]);

    const buildUpdateUsersData = () => {
        const usersToAdd = entityToChange
            .filter(e => e.type === "user")
            .map(e => e.id);

        const tagsToAddUsersFrom = entityToChange
            .filter(e => e.type === "tag")
            .map(e => e.id);

        const usersToRemove = entityToChange
            .filter(e => e.type === "remove")
            .map(e => e.id);

        return {
            add: usersToAdd.length ? usersToAdd : undefined,
            addFromTags: tagsToAddUsersFrom.length ? tagsToAddUsersFrom : undefined,
            remove: usersToRemove.length ? usersToRemove : undefined
        };
    };

    const handleSubmit = async () => {
        const updateUsersData = buildUpdateUsersData();

        await handleSaveTag(formData, updateUsersData, selected.type);
    };

    const handleRemove = (id, type) => {
        setEntityToChange(prev => prev.filter(item =>
            !(item.id === id && item.type === type)
        ));
    };

    const onBlur = (key, value) => {
        validateField(key, value);
    }

    const onDelete = () => {
        handleDeleteTag(selected.tag.id);
        handleClose();
    }

    const tagColorOptions = useMemo(() => {
        return Object.entries(SPECIAL.TAG_COLORS).map(([key, value]) => ({
            id: key,
            name: value.name
        }));
    }, []);

    const isEdit = selected.type === "edit";
    const title = selected.type === "edit" ? "Редагування тегу" : "Створення тегу"

    return (
        <ModalWrapperTitleSaveDelete
            title={title}
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={isEdit ? onDelete : null}
        >
            <div className="flex w-full mt-5 gap-20">
                <InputBox
                    id="name"
                    name="name"
                    label="Назва тегу"
                    placeholder="Студент"
                    error={errors?.name || ""}
                    value={formData.name}
                    className="w-full"
                    onBlur={(e) => onBlur(e.target.id, e.target.value)}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <InputBox
                    id="shortName"
                    name="shortName"
                    error={errors?.shortName || ""}
                    label="Назва бейджу"
                    placeholder="Студент"
                    value={formData.shortName}
                    className="w-full"
                    onBlur={(e) => onBlur(e.target.id, e.target.value)}
                    onChange={(e) => handleChange("shortName", e.target.value)}
                />
            </div>

            <div className="flex w-full gap-20">
                <div className="w-full mt-5">
                    <SelectMenu
                        withColor
                        array={tagColorOptions}
                        value={formData.color}
                        onChange={(id) => handleChange("color", id)}
                        label="Оберіть колір тегу"
                    />
                </div>

                <div className="w-full mt-5">
                    <SelectMenuLazy
                        query={tagTypesQuery}
                        value={formData.tagType}
                        onChange={(id) => handleChange("tagType", id)}
                        label="Тип тегу"
                        withColor={false}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full relative h-fit">
                <p className="font-bold ml-1 mt-2">Додати користувачів</p>
                <div className="w-full mt-2 relative">
                    <div className="absolute text-second-text inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <SearchIcon />
                    </div>

                    <input
                        name="search"
                        type="search"
                        value={search}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setIsSearchFocused(true)
                        }}
                        placeholder="Пошук"
                        required
                        className="no-browser-clear block w-full p-3 pl-10 pr-8 bg-main-white border border-gray-300 text-sm rounded-md focus:border-accent placeholder:text-body outline-none"
                    />
                </div>

                {search && result && (result.users?.length > 0 || result.tags?.length > 0) && isSearchFocused && (
                    <div className="absolute top-[90px] w-full">
                        <div className="bg-white shadow-xs border border-gray-200 rounded-md max-h-80 h-auto z-50 animate-fadeIn overflow-auto" onMouseDown={(e) => e.preventDefault()}>
                            {result.tags?.map((item) => (
                                <button
                                    key={`tag-${item.id}`}
                                    onClick={() => onEntityClick(item, "tag")}
                                    className="w-full h-auto justify-center text-left px-2 py-2 hover:bg-gray-100 cursor-pointer transition flex flex-col"
                                >
                                    <div className="flex gap-2 items-center">
                                        <p className="font-bold text-second-text text-xs mr-4">Тег</p>
                                        <Badge text={item.subtitle} color={item.color} />
                                    </div>
                                </button>
                            ))}
                            {result.users?.map((item) => (
                                <button
                                    key={`user-${item.id}`}
                                    onClick={() => onEntityClick(item, "user")}
                                    className="w-full h-auto justify-center text-left px-2 py-2 hover:bg-gray-100 cursor-pointer transition flex flex-col"
                                >
                                    <div className="flex gap-2 items-center w-full">
                                        <p className="font-bold text-second-text text-xs mr-4">Користувач</p>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex flex-col justify-center">
                                                <p className="text-main-black text-sm">{item.title}</p>
                                                <p className="text-second-text text-xs">{item.subtitle}</p>
                                            </div>
                                            <div className="flex gap-1 flex-wrap px-4">
                                                {item.userTags?.map(tag => (
                                                    <Badge key={tag.id} text={tag.shortName} color={tag.color} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="h-6" />
                    </div>
                )}
                <div className="w-full mt-2 flex flex-wrap gap-4 p-2 max-h-30 h-auto overflow-auto">
                    {entityToChange?.map((item) => {
                        if (item.type === "tag") {
                            return (
                                <Badge
                                    key={`added-tag-${item.id}`}
                                    text={item.subtitle}
                                    color={item.color}
                                    onRemove={() => handleRemove(item.id, "tag")}
                                />
                            );
                        }
                        if (item.type === "user") {
                            return (
                                <Badge
                                    key={`added-user-${item.id}`}
                                    text={item.title}
                                    color="gray"
                                    onRemove={() => handleRemove(item.id, "user")}
                                />
                            );
                        }
                        return null;
                    })}
                </div>

                {selected.type === "edit" && displayedUsers.length > 0 && (
                    <>
                        <p className="font-bold ml-1 mt-2">Список користувачів – {totalUsersCount}</p>
                        <div className="w-full h-auto max-h-60 mt-2 border border-gray-300 rounded-md overflow-y-auto">
                            {displayedUsers?.map((user) => {
                                return (
                                    <div key={user.id} className="flex w-full p-2 items-center justify-between">
                                        <div className="gap-4 flex items-center">
                                            <div className="rounded-full bg-accent h-8 w-8" />
                                            <div className="flex flex-col justify-center">
                                                <p className="text-main-black text-sm">
                                                    {user.lastName} {user.firstName} {user.patronymic}
                                                </p>
                                                <p className="text-second-text text-xs">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className="text-second-text"
                                            onClick={() => handleMarkForRemoval(user.id)}
                                        >
                                            <ClearIcon />
                                        </button>
                                    </div>
                                )
                            })}

                            <InfiniteScrollTrigger
                                ref={loadMoreRef}
                                isFetching={userQuery.isFetchingNextPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </ModalWrapperTitleSaveDelete>
    );
}

EditTagModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSaveTag: PropTypes.func.isRequired,
    handleDeleteTag: PropTypes.func.isRequired,
    selected: PropTypes.shape({
        tag: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            shortName: PropTypes.string.isRequired,
            tagType: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        }),
        type: PropTypes.string.isRequired,
    }).isRequired,
    tagTypesQuery: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
};