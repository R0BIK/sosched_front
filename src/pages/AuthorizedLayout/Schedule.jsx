import WeekCalendar from "../../components/Schedule/WeekCalendar.jsx";
import {useCallback, useMemo, useState} from "react";
import MonthCalendar from "../../components/Schedule/MonthCalendar.jsx";
import TabComponent from "../../components/TabComponent.jsx";
import { useSpace } from "../../context/SpaceContext.jsx";
import { useGetEvents } from "../../tanStackQueries/event/useGetEvents.js";
import { useGetEventTypes } from "../../tanStackQueries/eventType/useGetEventTypes.js";
import CreateEvent from "../../components/Schedule/Drawers/CreateEvent.jsx";
import Drawer from "../../components/Schedule/Drawers/Drawer.jsx";
import {useCreateEvent} from "../../tanStackQueries/event/useCreateEvent.js";
import {DRAWER_MODES} from "../../../constants.js";
import EventView from "../../components/Schedule/EventView.jsx";
import EventInfo from "../../components/Schedule/Drawers/EventInfo.jsx";

export default function Schedule() {
    const { switchSpace, spaces, activeSpace } = useSpace();
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
        dateTo: new Date(new Date(firstWeekDate).setDate(new Date(firstWeekDate).getDate() + 6)).toISOString()
    }), [firstWeekDate]);

    const { data: eventsData } = useGetEvents(dataForEvents, domain);

    const events = eventsData?.items;

    // -------------------------------
    // 🧾 Drawer + Form State
    // -------------------------------
    const [drawerMode, setDrawerMode] = useState(null);
    const isDrawerOpen = drawerMode !== null;

    const [selectedEvent, setSelectedEvent] = useState(null);


    const [isRepeating, setIsRepeating] = useState(false);

    const [eventForm, setEventForm] = useState({
        name: "",
        type: "",
        location: "",
        date: "",
        timeStart: "",
        timeEnd: "",
    });

    const [repeatRule, setRepeatRule] = useState({
        period: "Day",
        count: 1,
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

    const handleSelectChange = (value) => {
        setEventForm((prev) => ({ ...prev, type: value }));
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
                RepeatNumber: repeatRule.count,
                RepeatType: repeatRule.period, // "Day" | "Week" | "Month"
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
    // 🔗 API: event types
    // -------------------------------
    const { data: eventTypes } = useGetEventTypes();
    const eventTypesArray = eventTypes?.items?.map((item) => ({ id: item.id, name: item.name }))

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

    return (
        <div className="flex-row flex h-full overflow-hidden">
            {/* Left Sidebar */}
            <div className="p-5 flex flex-col justify-between border-r border-gray-200">
                <div>
                    <div className="flex justify-center">
                        <MonthCalendar
                            selectedDay={selectedDay}
                            displayedMonth={displayedMonth}
                            handleDayClick={handleDayClick}
                            handleMonthChange={handleMonthChange}
                        />
                    </div>
                    <div className="font-noto text-xm mt-10 font-extralight">
                        <p className="text-second-text ml-4 mb-1">Простори</p>
                        {spaces.map((space) => (
                            <TabComponent
                                key={space.id}
                                text={space.name}
                                initial={getInitial(space.domain)}
                                isActive={activeSpace?.domain === space.domain}
                                onClick={() => switchSpace(space)}
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setDrawerMode(DRAWER_MODES.CREATE)}
                    className="flex justify-center items-center whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Створити подію
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden justify-between">
                <WeekCalendar
                    events={events}
                    firstWeekDate={firstWeekDate}
                    selectedDay={selectedDay}
                    handleDayClick={handleDayClick}
                    onChevronClick={handleChevronClick}
                    onEventClick={(event) => {
                        console.log(event);
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
                            eventTypes={eventTypesArray}
                            handleInputChange={handleInputChange}
                            handleSelectChange={handleSelectChange}
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

// -------------------------------
// 🧮 Helpers
// -------------------------------
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