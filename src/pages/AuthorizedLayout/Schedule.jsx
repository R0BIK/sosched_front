import WeekCalendar from "../../components/Schedule/WeekCalendar.jsx";
import {useCallback, useMemo, useState} from "react";
import MonthCalendar from "../../components/Schedule/MonthCalendar.jsx";
import TabComponent from "../../components/TabComponent.jsx";
import { useSpace } from "../../context/SpaceContext.jsx";
import { useGetEvents } from "../../tanStackQueries/event/useGetEvents.js";
import CreateEvent from "../../components/Schedule/Drawers/CreateEvent.jsx";
import Drawer from "../../components/Schedule/Drawers/Drawer.jsx";
import {useCreateEvent} from "../../tanStackQueries/event/useCreateEvent.js";
import {DRAWER_MODES} from "../../constants/constants.js";
import EventInfo from "../../components/Schedule/Drawers/EventInfo.jsx";
import InfiniteScrollTrigger from "../../components/InfinityScroll/InfiniteScrollTrigger.jsx";
import {useInfiniteScroll} from "../../components/InfinityScroll/useInfiniteScroll.js";
import { PlusOutlined } from "@lineiconshq/free-icons";

export default function Schedule() {
    const { switchSpace, spaces, activeSpace, spaceQuery } = useSpace();
    const domain = activeSpace?.domain;

    const { mutate: createEventMutate } = useCreateEvent(domain);

    // -------------------------------
    // 📅 Calendar State
    // -------------------------------
    const [firstWeekDate, setFirstWeekDate] = useState(getFirstWeekDate(new Date()));
    const [selectedDay, setSelectedDay] = useState(firstWeekDate);
    const [displayedMonth, setDisplayedMonth] = useState(firstWeekDate);

    const dataForEvents = useMemo(() => ({
        dateFrom: firstWeekDate,
        dateTo: new Date(new Date(firstWeekDate).setDate(new Date(firstWeekDate).getDate() + 7))
    }), [firstWeekDate]);

    const { data: events } = useGetEvents(dataForEvents, domain);

    // -------------------------------
    // 🧾 Drawer + Form State
    // -------------------------------
    const [drawerMode, setDrawerMode] = useState(null);
    const isDrawerOpen = drawerMode !== null;

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [isRepeating, setIsRepeating] = useState(false);

    const [eventForm, setEventForm] = useState({
        name: "",
        location: "",
        date: "",
        timeStart: "",
        timeEnd: "",
    });

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

    // -------------------------------
    // 🧠 Controlled Inputs
    // -------------------------------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm((prev) => ({ ...prev, [name]: value }));
    };


    // -------------------------------
    // 🧩 Submit / Cancel
    // -------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!eventForm.date || !eventForm.timeStart || !eventForm.timeEnd) {
            alert("Будь ласка, вкажіть дату та час події");
            return;
        }

        // -------------------------------
        // 🔹 Объединяем дату и время
        // -------------------------------
        const dateStart = new Date(`${eventForm.date}T${eventForm.timeStart}`);
        const dateEnd = new Date(`${eventForm.date}T${eventForm.timeEnd}`);

        // -------------------------------
        // 🔹 RepeatInfo
        // -------------------------------
        let repeatInfo = null;
        if (isRepeating) {
            repeatInfo = {
                RepeatNumber: repeatRule.repeatNumber,
                RepeatType: repeatRule.repeatType, // "Day" | "Week" | "Month"
                RepeatEnd: repeatRule.repeatEnd ? new Date(repeatRule.repeatEnd) : null
            };
        }

        // -------------------------------
        // 🔹 Собираем объект для бэка
        // -------------------------------
        const requestData = {
            Name: eventForm.name,
            Location: eventForm.location || null,
            // Description: "", // можно добавить поле Description в форму, пока пустое
            Color: "#000000", // можно сделать выбор цвета позже, пока дефолт
            DateStart: dateStart.toISOString(),
            DateEnd: dateEnd.toISOString(),
            EventTypeId: eventForm.type,
            // CoordinatorId: null, // пока нет
            RepeatInfo: repeatInfo,
            Confirmed: false
        };

        createEventMutate(requestData);

        setDrawerMode(null);

        setEventForm({
            name: "",
            type: "",
            location: "",
            date: "",
            timeStart: "",
            timeEnd: "",
        });
        setIsRepeating(false);
        setRepeatRule({
            period: "Day",
            count: 1,
            repeatEnd: ""
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setDrawerMode(null);
        setEventForm({
            name: "",
            type: "",
            location: "",
            date: "",
            timeStart: "",
            timeEnd: "",
        });
        setIsRepeating(false);
    };

    // -------------------------------
    // 📅 Calendar Handlers
    // -------------------------------
    const handleDayClick = useCallback((date) => {
        const day = getFirstWeekDate(date);
        setSelectedDay(date.toISOString());
        setDisplayedMonth(date.toISOString());
        setFirstWeekDate(day);
    }, []);

    const handleChevronClick = useCallback((isNext) => {
        setFirstWeekDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + (isNext ? 7 : -7));
            setSelectedDay(newDate.toISOString());
            setDisplayedMonth(newDate.toISOString());
            return newDate.toISOString();
        });
    }, []);

    const handleMonthChange = useCallback((isNext) => {
        setDisplayedMonth((prev) => {
            const newMonth = new Date(prev);
            newMonth.setMonth(newMonth.getMonth() + (isNext ? 1 : -1));
            return newMonth.toISOString();
        });
    }, []);

    const loadMoreRef = useInfiniteScroll(spaceQuery);

    return (
        <div className="flex-row flex h-full overflow-hidden">
            <div className="p-5 flex flex-col h-full justify-between border-r border-gray-200">
                <div className="h-full flex flex-col">
                    <div className="flex justify-center">
                        <MonthCalendar
                            selectedDay={selectedDay}
                            displayedMonth={displayedMonth}
                            handleDayClick={handleDayClick}
                            handleMonthChange={handleMonthChange}
                        />
                    </div>
                    <div className="font-noto text-xm mt-10 h-full flex flex-col overflow-hidden">
                        <p className="text-second-text ml-4 font-extralight mb-1">Простори</p>
                        <div className="overflow-auto h-auto flex flex-col no-scrollbar">
                            {spaces.map((space) => (
                                <TabComponent
                                    key={space.id}
                                    text={space.name}
                                    initial={getInitial(space.domain)}
                                    isActive={activeSpace?.domain === space.domain}
                                    onClick={() => switchSpace(space)}
                                />
                            ))}
                            <InfiniteScrollTrigger
                                ref={loadMoreRef}
                                isFetching={spaceQuery.isFetchingNextPage}
                            />
                        </div>
                        <TabComponent
                            LineIconSize={20}
                            className="text-second-text font-extralight mt-2"
                            text="Додати новий"
                            LineIcon={PlusOutlined}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden justify-between">
                <WeekCalendar
                    events={events}
                    firstWeekDate={firstWeekDate}
                    selectedDay={selectedDay}
                    handleDayClick={handleDayClick}
                    onChevronClick={handleChevronClick}
                    onEventClick={(event) => {
                        setSelectedEvent(event);
                        setDrawerMode(DRAWER_MODES.INFO);
                    }}
                />

                <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerMode(null)}>
                    {drawerMode === DRAWER_MODES.CREATE && (
                        <CreateEvent
                            eventForm={eventForm}
                            repeatRule={repeatRule}
                            isRepeating={isRepeating}
                            handleInputChange={handleInputChange}
                            handleRepeatChange={handleRepeatChange}
                            handleRepeatToggle={handleRepeatToggle}
                            handleSubmit={handleSubmit}
                            handleCancel={handleCancel}
                        />
                    )}
                    {drawerMode === DRAWER_MODES.INFO && (
                        <EventInfo
                            eventForm={selectedEvent}
                        />
                    )}
                </Drawer>
            </div>
        </div>
    );
}

function getInitial(name) {
    return name[0].toUpperCase();
}

function getFirstWeekDate(date) {
    const day = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const monday = new Date(date);
    monday.setDate(date.getDate() - day);
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
}