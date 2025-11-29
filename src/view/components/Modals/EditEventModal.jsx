import PropTypes from "prop-types";
import {useState, useMemo, useCallback} from "react";

import InputBox from "../BasicInputs/InputBox.jsx";
import SelectMenu from "../BasicInputs/SelectMenu.jsx";
import { SPECIAL } from "../../../constants/constants.js";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import {useSpace} from "../../../context/SpaceContext.jsx";
import {useSearch} from "../../../tanStackQueries/search/useSearch.jsx";
import Badge from "../Badges/Badge.jsx";
import {useGetUsers} from "../../../tanStackQueries/user/useGetUsers.js";

import { useInfiniteScroll } from "../InfinityScroll/useInfiniteScroll.js";
import InfiniteScrollTrigger from "../InfinityScroll/InfiniteScrollTrigger.jsx";
import {DateBox} from "../BasicInputs/DateBox.jsx";
import {TimeBox} from "../BasicInputs/TimeBox.jsx";
import {createDate, getDateAndTime} from "../../../utils/dateConverter.js";
import Checkbox from "../BasicInputs/CheckBox.jsx";
import RepeatSelector from "../Schedule/RepeatSelector.jsx";

export default function EditEventModal({ handleClose, selected, handleSaveEvent, handleDeleteTag }) {
    const [formData, setFormData] = useState(() => {
        const initialEvent = selected?.event;

        if (selected.type === 'create' || !initialEvent?.dateStart) {
            const now = new Date();
            const start = new Date(now.setHours(now.getHours() + 1, 0, 0, 0)); // +1 час от сейчас
            const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 час

            const { date: defaultDate, time: defaultTimeStart } = getDateAndTime(start);
            const { time: defaultTimeEnd } = getDateAndTime(end);

            return {
                ...initialEvent,
                // Виртуальные поля (компоненты)
                date: defaultDate,
                timeStart: defaultTimeStart,
                timeEnd: defaultTimeEnd,
                // Поля для сервера (объекты Date)
                dateStart: start,
                dateEnd: end,
            };
        }

        const dateStartObject = new Date(initialEvent.dateStart);
        const dateEndObject = new Date(initialEvent.dateEnd);

        const { date, time: timeStart } = getDateAndTime(dateStartObject);
        const { time: timeEnd } = getDateAndTime(dateEndObject);

        return {
            ...initialEvent,
            date: date,
            timeStart: timeStart,
            timeEnd: timeEnd,
            dateStart: dateStartObject,
            dateEnd: dateEndObject,
        };
    });
    const [search, setSearch] = useState("");
    const [coordinator, setCoordinator] = useState(formData.coordinator ? formData.coordinator.fullName : "");
    const [entityToChange, setEntityToChange] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isCoordinatorFocused, setIsCoordinatorFocused] = useState(false);
    const filterObj = { event: [selected.event.id ] }
    const [coordinatorGlobalId] = useState(formData.coordinator?.id);
    const [isRepeating, setIsRepeating] = useState(false);
    const [repeatRule, setRepeatRule] = useState({
        repeatType: "Day",
        repeatNumber: 1,
        repeatEnd: ""
    });

    const handleRepeatChange = (key, value) => {
        setRepeatRule((prev) => ({ ...prev, [key]: value }));
    };

    const handleRepeatToggle = (e) => {
        setIsRepeating(e.target.checked);
    };

    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const searchQuery = useSearch(domain, search);
    const result = searchQuery.data;

    const userQuery = useGetUsers(domain, filterObj, null);

    const users = userQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const displayedUsers = users.filter(user =>
        !entityToChange.some(change => change.id === user.id && change.type === "remove")
        && user.id !== coordinatorGlobalId
    );

    const removedCount = entityToChange.filter(e => e.type === "remove").length;
    const removeCoordinator = coordinatorGlobalId ? 1 : 0;
    const totalUsersCount = (userQuery.data?.pages?.[0]?.totalCount ?? 0) - removedCount - removeCoordinator;

    const coordinatorQuery = useGetUsers(domain, null, coordinator);
    const coordinators = coordinatorQuery.data?.pages.flatMap((p) => p.items) ?? [];

    const onCoordinatorClick = (user) => {
        setIsCoordinatorFocused(false);
        setCoordinator(`${user.lastName} ${user.firstName} ${user.patronymic ? user.patronymic : ""}`.trim());
        setFormData((prev) => ({ ...prev, ["coordinator"]: {id: user.id, fullName: getFullName(user) } }));
    }

    const handleCoordinatorChange = (value) => {
        // 1. Если поле пустое, сбрасываем координатора на null
        if (!value.trim()) {
            setFormData((prev) => ({ ...prev, ["coordinator"]: null }));
            return;
        }

        // 2. Ищем точное совпадение введенного текста со списком доступных координаторов
        const trimmedValue = value.trim();

        const matchedUser = coordinators.find(user => getFullName(user) === trimmedValue);

        // 3. Обновляем состояние на основе результата поиска
        if (matchedUser) {
            // Найдено точное совпадение: устанавливаем ID и полное имя
            setFormData((prev) => ({
                ...prev,
                ["coordinator"]: { id: matchedUser.id, fullName: getFullName(matchedUser) }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                ["coordinator"]: null
            }));
        }
    }

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
        // Используем функциональный setState
        setFormData((prev) => {
            // 1. Создаем промежуточное состояние с обновленным ключом (например, date: "2025-11-21")
            const newState = { ...prev, [key]: value };

            // 2. Проверяем, изменился ли ключевой компонент даты/времени
            if (['date', 'timeStart', 'timeEnd'].includes(key)) {

                // 3. Извлекаем ТРИ компонента из НОВОГО состояния
                // Примечание: dateStart/dateEnd не используем, т.к. они могут быть DateObject,
                // а нам нужны компоненты YYYY-MM-DD и HH:mm:ss.
                const dateStr = newState.date;
                const timeStartStr = newState.timeStart;
                const timeEndStr = newState.timeEnd;

                // 4. Пересчитываем конечные объекты Date (которые будут отправлены на сервер)
                const newDateStart = createDate(dateStr, timeStartStr);
                const newDateEnd = createDate(dateStr, timeEndStr);

                // 5. Возвращаем полностью обновленное состояние, включая два готовых объекта Date
                return {
                    ...newState, // включает обновленный 'date' ИЛИ 'timeStart' ИЛИ 'timeEnd'
                    dateStart: newDateStart,
                    dateEnd: newDateEnd,
                };
            }

            // Если изменено не-временное поле ('name', 'color'), просто возвращаем newState
            return newState;
        });
    }, []);

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

        await handleSaveEvent(formData, updateUsersData, selected.type, repeatRule, isRepeating);
        handleClose();
    };

    const handleRemove = (id, type) => {
        setEntityToChange(prev => prev.filter(item =>
            !(item.id === id && item.type === type)
        ));
    };

    const eventColorOptions = useMemo(() => {
        return Object.entries(SPECIAL.TAG_COLORS).map(([key, value]) => ({
            id: key,
            name: value.name
        }));
    }, []);

    const title = selected.type === "edit" ? "Редагування події" : "Створення події"

    return (
        <ModalWrapperTitleSaveDelete
            title={title}
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={() => { handleDeleteTag(selected.event.id); handleClose() }}
        >
            <div className="flex w-full gap-20">
                <div className="flex flex-col w-full mt-5 gap-5">
                    <InputBox
                        id="name"
                        name="name"
                        label="Назва"
                        placeholder="Зустріч"
                        value={formData.name}
                        className="w-full"
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <DateBox
                        className="w-full"
                        id="date"
                        name="date"
                        label="Дата"
                        value={getDateAndTime(formData.dateStart).date}
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                    <TimeBox
                        className="w-full"
                        id="timeStart"
                        name="timeStart"
                        label="Початок"
                        value={getDateAndTime(formData.dateStart).time}
                        onChange={(e) => handleChange("timeStart", e.target.value)}
                    />
                    <TimeBox
                        className="w-full"
                        id="timeEnd"
                        name="timeEnd"
                        label="Кінець"
                        value={getDateAndTime(formData.dateEnd).time}
                        onChange={(e) => handleChange("timeEnd", e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-full mt-5 gap-5">
                    <div className="w-full">
                        <SelectMenu
                            withColor
                            array={eventColorOptions}
                            value={formData.color}
                            onChange={(id) => handleChange("color", id)}
                            label="Оберіть колір"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold ml-1 text-main-black">
                            Організатор
                        </label>
                        <div className="w-full mt-2 relative">
                            <div className="absolute text-second-text inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                                <SearchIcon fontSize="small" />
                            </div>

                            <input
                                id="coorinatorId"
                                name="coorinatorId"
                                type="search"
                                value={coordinator}
                                onFocus={() => setIsCoordinatorFocused(true)}
                                onBlur={() => setIsCoordinatorFocused(false)}
                                onChange={(e) => {
                                    setCoordinator(e.target.value)
                                    setIsCoordinatorFocused(true)
                                    handleCoordinatorChange(e.target.value)
                                }}
                                placeholder="Пошук"
                                required
                                className="no-browser-clear block w-full rounded-md bg-main-white px-3 py-1.5 pl-8 text-main-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-on-hover text-sm/6"
                            />

                            {coordinator && coordinators && (coordinators?.length > 0) && isCoordinatorFocused && (
                                <div className="absolute top-[40px] w-full z-50">
                                    <div className="bg-white shadow-xs border border-gray-200 rounded-md max-h-60 h-auto animate-fadeIn overflow-auto" onMouseDown={(e) => e.preventDefault()}>
                                        {coordinators?.map((item) => (
                                            <button
                                                key={`user-${item.id}`}
                                                onClick={() => onCoordinatorClick(item)}
                                                className="w-full h-auto justify-center text-left px-2 py-2 hover:bg-gray-100 cursor-pointer transition flex flex-col"
                                            >
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="flex flex-col justify-center">
                                                        <p className="text-main-black text-sm">{getFullName(item)}</p>
                                                        <p className="text-second-text text-xs">{item.email}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="h-6" />
                                </div>
                            )}
                        </div>
                    </div>
                    <InputBox
                        id="location"
                        name="location"
                        label="Місце проведення"
                        placeholder="Парк"
                        value={formData.location}
                        className="w-full"
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                    <InputBox
                        id="description"
                        name="description"
                        label="Опис"
                        placeholder="Візьміть з собою їжу"
                        value={formData.description}
                        className="w-full"
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>
            </div>

            {selected.type !== "edit" && (
                <>
                    <Checkbox
                        id="6"
                        name="repeat"
                        label="Повторювати цю подію"
                        checked={isRepeating}
                        onChange={handleRepeatToggle}
                    />
                    {isRepeating && (
                        <RepeatSelector
                            repeatType={repeatRule.repeatType}
                            repeatNumber={repeatRule.repeatNumber}
                            repeatEnd={repeatRule.repeatEnd}
                            onChange={handleRepeatChange}
                        />
                    )}
                </>
            )}

            <div className="flex flex-col w-full relative h-fit">
                <label className="font-bold ml-1 mt-2">Додати користувачів</label>
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
                        className="no-browser-clear block w-full p-3 pl-10 pr-8 bg-main-white border border-gray-300 text-sm rounded-md focus:border-accent focus:border-2 placeholder:text-body outline-none"
                    />
                </div>

                {search && result && (result.users?.length > 0 || result.tags?.length > 0) && isSearchFocused && (
                    <div className="absolute top-[90px] w-full z-50">
                        <div className="bg-white shadow-xs border border-gray-200 rounded-md max-h-80 h-auto animate-fadeIn overflow-auto" onMouseDown={(e) => e.preventDefault()}>
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
                                                    {getFullName(user)}
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

EditEventModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSaveEvent: PropTypes.func.isRequired,
    handleDeleteTag: PropTypes.func.isRequired,
    selected: PropTypes.shape({
        event: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.string,
            creator: PropTypes.shape({
                id: PropTypes.number.isRequired,
                fullName: PropTypes.string.isRequired,
            }).isRequired,
            description: PropTypes.string,
            color: PropTypes.string.isRequired,
            dateStart: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired,
            coordinator: PropTypes.shape({
                id: PropTypes.number.isRequired,
                fullName: PropTypes.string.isRequired,
            }),
            spaceId: PropTypes.number
        }),
        type: PropTypes.string.isRequired,
    }).isRequired,
};

function getFullName(user) {
    return `${user?.lastName} ${user?.firstName} ${user?.patronymic ? user?.patronymic : ""}`.trim();
}