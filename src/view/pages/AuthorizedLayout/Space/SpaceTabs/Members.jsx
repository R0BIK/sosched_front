import { useState } from "react";

import { useSpace } from "../../../../../context/Space/useSpace.js";
import { useGetUsers } from "../../../../../tanStackQueries/user/useGetUsers.js";
import {useInfiniteScroll} from "../../../../components/InfinityScroll/useInfiniteScroll.js";

import Badge from "../../../../components/Badges/Badge.jsx";

import SearchIcon from '@mui/icons-material/Search';
import InfiniteScrollTrigger from "../../../../components/InfinityScroll/InfiniteScrollTrigger.jsx";
import { UserMinusIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline/index.js";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import {useNavigate} from "react-router-dom";
import UserFilter from "../../../../components/UserFilter.jsx";
import PropTypes from "prop-types";
import {useLeaveSpace} from "../../../../../tanStackQueries/space/useLeaveSpace.js";
import {useToast} from "../../../../../context/Toast/useToast.js";

export default function Members({ isAdmin=false }) {
    const [search, setSearch] = useState("");
    const [filterObj, setFilterObj] = useState({});
    const [isFilter, setIsFilter] = useState(false);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const { mutate: removeUser } = useLeaveSpace(domain);

    const userQuery = useGetUsers(domain, filterObj, search);

    const users = userQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = userQuery.data?.pages?.[0]?.totalCount ?? 0;

    const loadMoreRef = useInfiniteScroll(userQuery);

    const handleClear = () => setSearch("");

    const handleRemoveUser = (userId) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            removeUser(userId, {
                onSuccess: () => {
                    // Можна показати тост або закрити модалку
                    showToast("Успішно!", "Користувача видалено", "success");
                },
                onError: (err) => {
                    showToast(err.message, "Сталась невідома помилка.", "error");
                }
            });
        }
    };

    const handleFilter = () => {
        setIsFilter(!isFilter);
        setFilterObj({});
    }

    const onVisitClick = (id) => {
        navigate(`/profile/${id}`);
    }

    const handleFilterChange = (obj) => {
        setFilterObj(prev => ({ ...prev, ...obj }));
    }

    return (
        <div className="pt-5 px-9 w-full h-full flex flex-col overflow-auto">
            <div className="flex justify-between shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Учасники</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
            </div>

            <div className="w-full mt-6 shrink-0">
                <form className="mx-auto font-noto">
                    <div className="relative">
                        <div className="absolute text-second-text inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            name="search"
                            type="search"
                            autoComplete="off"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Пошук" required
                            className="no-browser-clear block w-full p-3 pl-10 pr-13 bg-main-white border border-gray-200 text-sm rounded-xl focus:border-second-text shadow-xs placeholder:text-body outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleFilter}
                            className="absolute inset-y-0 end-0 flex pt-[1px] items-center pe-2 text-second-text hover:text-main-black"
                        >
                            <FilterAltIcon />
                        </button>

                        {search && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute inset-y-0 end-0 flex pt-[1px] items-center me-9 text-second-text hover:text-main-black"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="flex flex-1 h-full">
                <div className="mt-2 w-full flex flex-col min-h-0">
                    <div className="flex w-full border-b border-gray-300 py-3.5 text-sm font-semibold text-main-black z-10">
                        <div className="w-9/20 text-left">
                            Учасники – {totalCount}
                        </div>
                        <div className="w-1/4 text-center">
                            Роль
                        </div>
                        <div className="w-1/4 text-center">
                            Теги
                        </div>
                        <div className="w-1/40 shrink-0 min-w-6">
                            <span className="sr-only">visit</span>
                        </div>
                        <div className="w-1/40 shrink-0 min-w-6">
                            <span className="sr-only">visit</span>
                        </div>
                    </div>

                    <div className="w-full overflow-y-auto h-full min-h-40 no-scrollbar">
                        <div className="flex flex-col divide-y divide-gray-200">
                            {users?.map((user) => (
                                <div key={user.id} className="flex w-full items-center py-3 overflow-hidden">
                                    <div className="w-9/20 text-sm break-all text-main-black">
                                        <div className="flex justify-start items-center gap-4">
                                            <div className="shrink-0 min-h-10 min-w-10 rounded-full bg-gray-300" />
                                            <div className="flex flex-col justify-center">
                                                <p className="text-main-black text-lg leading-tight">
                                                    {user.lastName} {user.firstName} {user.patronymic}
                                                </p>
                                                <a href={`mailto:${user.email}`} className="hover:underline text-second-text text-xs mt-0.5">
                                                    {user.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-1/4 text-sm break-all text-second-text text-center px-2">
                                        {user.role}
                                    </div>

                                    <div className="w-1/4 text-center text-sm px-2">
                                        <div className="flex gap-2 justify-center flex-wrap">
                                            {Array.isArray(user.userTags) && user.userTags.length > 0 ? (
                                                user.userTags.map((tag) => (
                                                    <Badge key={tag.id} text={tag.shortName} color={tag.color} />
                                                ))
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-1/40 text-right shrink-0 min-w-6">
                                        {isAdmin && (
                                            <button
                                                onClick={() => handleRemoveUser(user.id)}
                                                title="Видалити"
                                                className="p-1 inline-block text-second-text hover:text-accent"
                                            >
                                                <UserMinusIcon className="size-5" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="w-1/40 text-right shrink-0 min-w-6">
                                        <button
                                            onClick={() => onVisitClick(user.id)}
                                            title="Перейти"
                                            className="p-1 inline-block text-second-text hover:text-accent"
                                        >
                                            <ArrowRightEndOnRectangleIcon className="size-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <InfiniteScrollTrigger
                            ref={loadMoreRef}
                            isFetching={userQuery.isFetchingNextPage}
                        />
                    </div>
                </div>
                {isFilter && (
                    <div className="flex flex-col h-full w-60 pt-13 pl-4 shrink-0">
                        <div className="flex flex-col min-h-0 w-full border rounded-md border-gray-200">
                            <p className="mx-4 mt-4 pb-2 font-bold text-lg border-b border-gray-200">Фільтр</p>

                            <UserFilter onChange={handleFilterChange} />
                        </div>
                        <div className="h-4" />
                    </div>
                )}
            </div>
        </div>
    );
}

Members.propTypes = {
    isAdmin: PropTypes.bool,
}