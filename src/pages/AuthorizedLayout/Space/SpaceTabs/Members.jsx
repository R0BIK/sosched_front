import {useState} from "react";

import Badge from "../../../../components/Badges/Badge.jsx";
import {useSpace} from "../../../../context/SpaceContext.jsx";
import {useGetUsers} from "../../../../tanStackQueries/user/useGetUsers.js";
import InfiniteScrollWrapper from "../../../../components/Scroll/InfiniteScrollWrapper.jsx";

import SearchIcon from '@mui/icons-material/Search';

export default function Members() {
    const [search, setSearch] = useState("");

    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const userQuery = useGetUsers(domain, null, search);

    const users = userQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = userQuery.data?.pages?.[0]?.totalCount ?? 0;


    const handleClear = () => setSearch("");

    return (
        <div className="py-5 px-9 w-full overflow-hidden">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Учасники</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
            </div>
            <div className="w-full mt-6">
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
            <div className="mt-2 w-full h-[calc(100vh-200px)]">
                <InfiniteScrollWrapper query={userQuery}>
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-300 font-noto">
                            <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="w-9/20 py-3.5 text-left text-sm font-semibold text-main-black"
                                >
                                    Учасники – {totalCount}
                                </th>
                                <th scope="col"
                                    className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Роль
                                </th>
                                <th scope="col"
                                    className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                    Теги
                                </th>
                                <th scope="col" className="w-1/20 py-3.5">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-transparent">
                            {users?.map((user) => (
                                <tr key={user.id} className="w-full">
                                    <td className="w-9/20 py-4 text-sm break-all text-main-black">
                                        <div className="flex justify-start items-center gap-4">
                                            <div className="min-h-10 min-w-10 rounded-full bg-red-400">

                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p className="text-main-black text-lg">
                                                    {user.lastName} {user.firstName} {user.patronymic}
                                                </p>
                                                <a href={`mailto:${user.email}`} className="hover:underline text-second-text text-xs">
                                                    {user.email}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-1/4 py-4 text-sm break-all text-second-text text-center">{user.role}</td>
                                    <td className="w-1/4 py-4 text-center text-sm whitespace-nowrap text-main-black">
                                        <div className="flex gap-2 justify-center flex-wrap">
                                            {Array.isArray(user.userTags) && user.userTags.length > 0 ? (
                                                user.userTags.map((tag) => (
                                                    <Badge key={tag.id} text={tag.shortName} color={tag.color} />
                                                ))
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="w-1/20 text-right">

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </InfiniteScrollWrapper>
            </div>
        </div>
    );
}