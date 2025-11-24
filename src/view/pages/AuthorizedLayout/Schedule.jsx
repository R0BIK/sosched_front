import WeekCalendar from "../../components/Schedule/WeekCalendar.jsx";
import {useCallback, useMemo, useState} from "react";
import MonthCalendar from "../../components/Schedule/MonthCalendar.jsx";
import TabComponent from "../../components/TabComponent.jsx";
import { useSpace } from "../../../context/SpaceContext.jsx";
import { useGetEvents } from "../../../tanStackQueries/event/useGetEvents.js";
import Drawer from "../../components/Schedule/Drawers/Drawer.jsx";
import {DRAWER_MODES} from "../../../constants/constants.js";
import EventInfo from "../../components/Schedule/Drawers/EventInfo.jsx";
import InfiniteScrollTrigger from "../../components/InfinityScroll/InfiniteScrollTrigger.jsx";
import {useInfiniteScroll} from "../../components/InfinityScroll/useInfiniteScroll.js";
import { PlusOutlined } from "@lineiconshq/free-icons";
import AddSpaceModal from "../../components/Modals/AddSpaceModal.jsx";

export default function Schedule() {
    const { switchSpace, spaces, activeSpace, spaceQuery } = useSpace();
    const domain = activeSpace?.domain;
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

    const [addSpaceModalOpen, setAddSpaceModalOpen] = useState(false);

    const handelCloseModal = () => {
        setAddSpaceModalOpen(false);
    }

    const [selectedEvent, setSelectedEvent] = useState(null);

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
                            onClick={() => setAddSpaceModalOpen(true)}
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
                    {drawerMode === DRAWER_MODES.INFO && (
                        <EventInfo
                            eventForm={selectedEvent}
                        />
                    )}
                </Drawer>
            </div>

            {addSpaceModalOpen && (
                <AddSpaceModal handleClose={handelCloseModal}/>
            )}
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