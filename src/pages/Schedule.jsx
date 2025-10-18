import WeekCalendar from "../components/Schedule/WeekCalendar.jsx";
import {useCallback, useEffect, useState} from "react";
import MonthCalendar from "../components/Schedule/MonthCalendar.jsx";

export default function Schedule() {
    const [firstWeekDate, setFirstWeekDate] = useState(getFirstWeekDate(new Date()));
    const [selectedDay, setSelectedDay] = useState(firstWeekDate);
    const [displayedMonth, setDisplayedMonth] = useState(firstWeekDate);
    const [events, setEvents] = useState();

    useEffect(() => {

    }, [firstWeekDate]);

    function getFirstWeekDate(date) {
        const day = date.getDay() === 0 ? 6 : date.getDay() - 1;
        const monday = new Date(date);
        monday.setDate(date.getDate() - day);
        monday.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        return monday.toISOString();
    }

    const handleDayClick = useCallback((date) => {
        const day = getFirstWeekDate(date);
        setSelectedDay(date.toISOString());
        setDisplayedMonth(date.toISOString());
        setFirstWeekDate(day);
    }, []);

    const handleChevronClick = useCallback((isNext) => {
        setFirstWeekDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + (isNext ? 7 : -7));
            setSelectedDay(newDate.toISOString());
            return newDate.toISOString();
        });
    }, []);

    const handleMonthChange = useCallback((isNext) => {
        setDisplayedMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(newMonth.getMonth() + (isNext ? 1 : -1));
            return newMonth.toISOString();
        });
    }, []);


    return (
        <div className="flex">
            <WeekCalendar events={events} firstWeekDate={firstWeekDate} selectedDay={selectedDay} handleDayClick={handleDayClick} onChevronClick={handleChevronClick} />
            <div className="p-10">
                <MonthCalendar selectedDay={selectedDay} displayedMonth={displayedMonth} handleDayClick={handleDayClick} handleMonthChange={handleMonthChange} />
            </div>

        </div>
    )
}

