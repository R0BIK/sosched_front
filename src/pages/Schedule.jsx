import WeekCalendar from "../components/Schedule/WeekCalendar.jsx";
import {useCallback, useEffect, useState} from "react";
import MonthCalendar from "../components/Schedule/MonthCalendar.jsx";

export default function Schedule() {
    const events1 = [
        // Понеділок (2025-10-13)
        {
            title: "Програмування мовою Java",
            start: "2025-10-13T07:30:00.000Z",
            end: "2025-10-13T09:00:00.000Z",
        },
        {
            title: "Комп'ютерна графіка",
            start: "2025-10-13T09:30:00.000Z",
            end: "2025-10-13T11:00:00.000Z",
        },
        {
            title: "Філософія науки",
            start: "2025-10-13T13:00:00.000Z",
            end: "2025-10-13T14:30:00.000Z",
        },

        // Вівторок (2025-10-14)
        {
            title: "Розробка мобільних застосувань під iOS",
            start: "2025-10-14T08:00:00.000Z",
            end: "2025-10-14T09:30:00.000Z",
        },
        {
            title: "Тестування програмного забезпечення",
            start: "2025-10-14T10:00:00.000Z",
            end: "2025-10-14T11:30:00.000Z",
        },
        {
            title: "Математичні методи в ІТ",
            start: "2025-10-14T15:00:00.000Z",
            end: "2025-10-14T16:30:00.000Z",
        },

        // Середа (2025-10-15)
        {
            title: "Бази даних та SQL",
            start: "2025-10-15T07:45:00.000Z",
            end: "2025-10-15T09:15:00.000Z",
        },
        {
            title: "Архітектура комп'ютерних систем",
            start: "2025-10-15T10:00:00.000Z",
            end: "2025-10-15T11:30:00.000Z",
        },
        {
            title: "Основи UX/UI дизайну",
            start: "2025-10-15T14:30:00.000Z",
            end: "2025-10-15T16:00:00.000Z",
        },

        // Четвер (2025-10-16)
        {
            title: "Технології та засоби розробки комп'ютерної графіки та мультимедіа",
            start: "2025-10-16T08:15:00.000Z",
            end: "2025-10-16T09:45:00.000Z",
        },
        {
            title: "Розробка мобільних застосувань під iOS",
            start: "2025-10-16T10:15:00.000Z",
            end: "2025-10-16T11:45:00.000Z",
        },
        {
            title: "Штучний інтелект і машинне навчання",
            start: "2025-10-16T13:45:00.000Z",
            end: "2025-10-16T15:15:00.000Z",
        },

        // П’ятниця (2025-10-17)
        {
            title: "Комп'ютерні мережі",
            start: "2025-10-17T07:30:00.000Z",
            end: "2025-10-17T09:00:00.000Z",
        },
        {
            title: "Теорія алгоритмів",
            start: "2025-10-17T10:00:00.000Z",
            end: "2025-10-17T11:30:00.000Z",
        },
        {
            title: "Операційні системи",
            start: "2025-10-17T14:00:00.000Z",
            end: "2025-10-17T15:30:00.000Z",
        },
        {
            title: "Інженерія програмного забезпечення",
            start: "2025-10-17T16:00:00.000Z",
            end: "2025-10-17T17:30:00.000Z",
        },

        // Субота (2025-10-18)
        {
            title: "Менеджмент ІТ-проєктів",
            start: "2025-10-18T08:30:00.000Z",
            end: "2025-10-18T10:00:00.000Z",
        },
        {
            title: "Командна розробка та Git",
            start: "2025-10-18T10:30:00.000Z",
            end: "2025-10-18T12:00:00.000Z",
        },
        {
            title: "UI-прототипування",
            start: "2025-10-18T13:30:00.000Z",
            end: "2025-10-18T15:00:00.000Z",
        },

        // Неділя (2025-10-19)
        {
            title: "Самостійна робота над курсовим проєктом",
            start: "2025-10-19T09:00:00.000Z",
            end: "2025-10-19T11:00:00.000Z",
        },
        {
            title: "Підготовка до тестів",
            start: "2025-10-19T12:00:00.000Z",
            end: "2025-10-19T13:30:00.000Z",
        },
        {
            title: "Робота над дипломом",
            start: "2025-10-19T15:00:00.000Z",
            end: "2025-10-19T17:00:00.000Z",
        },
    ];

    const [firstWeekDate, setFirstWeekDate] = useState(getFirstWeekDate(new Date()));
    const [selectedDay, setSelectedDay] = useState(firstWeekDate);
    const [displayedMonth, setDisplayedMonth] = useState(firstWeekDate);
    const [events, setEvents] = useState(events1);

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

