import { useState } from "react";

import { useSpace } from "../../../../context/SpaceContext.jsx";
import { useGetUsers } from "../../../../tanStackQueries/user/useGetUsers.js";
import {useInfiniteScroll} from "../../../../components/InfinityScroll/useInfiniteScroll.js";

import Badge from "../../../../components/Badges/Badge.jsx";

import SearchIcon from '@mui/icons-material/Search';
import InfiniteScrollTrigger from "../../../../components/InfinityScroll/InfiniteScrollTrigger.jsx";

export default function Members() {
    const [search, setSearch] = useState("");

    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const userQuery = useGetUsers(domain, null, search);

    const users = userQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = userQuery.data?.pages?.[0]?.totalCount ?? 0;

    const loadMoreRef = useInfiniteScroll(userQuery);

    const handleClear = () => setSearch("");

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Пошук" required
                            className="no-browser-clear block w-full p-3 pl-10 pr-8 bg-main-white border border-gray-200 text-sm rounded-xl focus:border-second-text shadow-xs placeholder:text-body outline-none"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute inset-y-0 end-0 flex pt-[1px] items-center pe-3 text-second-text hover:text-accent"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="mt-2 w-full flex flex-col min-h-0">

                {/* Шапка таблицы (фиксированная) */}
                <div className="flex w-full border-b border-gray-300 py-3.5 text-sm font-semibold text-main-black shrink-0 pr-2 z-10">
                    <div className="w-9/20 text-left pl-3">
                        Учасники – {totalCount}
                    </div>
                    <div className="w-1/4 text-center">
                        Роль
                    </div>
                    <div className="w-1/4 text-center">
                        Теги
                    </div>
                    <div className="w-1/20">
                        <span className="sr-only">Edit</span>
                    </div>
                </div>

                {/* Скроллящийся список */}
                <div className="w-full overflow-y-auto h-full min-h-40">
                    {users?.map((user) => (
                        <div key={user.id} className="flex w-full items-center py-4 hover:bg-gray-50 transition-colors">

                            {/* Колонка 1: Участник */}
                            <div className="w-9/20 text-sm break-all text-main-black pl-3">
                                <div className="flex justify-start items-center gap-4">
                                    <div className="shrink-0 min-h-10 min-w-10 rounded-full bg-red-400" />
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

                            {/* Колонка 2: Роль */}
                            <div className="w-1/4 text-sm break-all text-second-text text-center px-2">
                                {user.role}
                            </div>

                            {/* Колонка 3: Теги */}
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

                            {/* Колонка 4: Действия */}
                            <div className="w-1/20 text-right pr-2">
                                {/* Кнопки действий */}
                            </div>
                        </div>
                    ))}

                    {/* 4. Невидимый элемент-триггер в самом низу списка */}
                    <InfiniteScrollTrigger
                        ref={loadMoreRef}
                        isFetching={userQuery.isFetchingNextPage}
                    />
                </div>
            </div>
        </div>
    );
}