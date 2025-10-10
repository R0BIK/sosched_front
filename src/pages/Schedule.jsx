import WeekCalendar from "../components/Schedule/WeekCalendar.jsx";
import {useEffect, useState} from "react";
import MonthCalendar from "../components/Schedule/MonthCalendar.jsx";

export default function Schedule() {
    const [firstWeekDate, setFirstWeekDate] = useState("2025-09-15T00:00:00.000Z");

    const events1 = [
        // Понеділок (2025-10-06)
        {
            title: "Програмування мовою Java",
            start: "2025-10-06T05:30:00.000Z",
            end: "2025-10-06T09:00:00.000Z",
        },
        {
            title: "Комп'ютерна графіка",
            start: "2025-10-06T09:30:00.000Z",
            end: "2025-10-06T11:00:00.000Z",
        },
        {
            title: "Філософія науки",
            start: "2025-10-06T13:00:00.000Z",
            end: "2025-10-06T14:30:00.000Z",
        },

        // Вівторок (2025-10-07)
        {
            title: "Розробка мобільних застосувань під iOS",
            start: "2025-10-07T08:00:00.000Z",
            end: "2025-10-07T09:30:00.000Z",
        },
        {
            title: "Тестування програмного забезпечення",
            start: "2025-10-07T10:00:00.000Z",
            end: "2025-10-07T11:30:00.000Z",
        },
        {
            title: "Математичні методи в ІТ",
            start: "2025-10-07T15:00:00.000Z",
            end: "2025-10-07T16:30:00.000Z",
        },

        // Середа (2025-10-08)
        {
            title: "Бази даних та SQL",
            start: "2025-10-08T07:45:00.000Z",
            end: "2025-10-08T09:15:00.000Z",
        },
        {
            title: "Архітектура комп'ютерних систем",
            start: "2025-10-08T10:00:00.000Z",
            end: "2025-10-08T11:30:00.000Z",
        },
        {
            title: "Основи UX/UI дизайну",
            start: "2025-10-08T14:30:00.000Z",
            end: "2025-10-08T16:00:00.000Z",
        },

        // Четвер (2025-10-09)
        {
            title: "Технології та засоби розробки комп'ютерної графіки та мультимедіа",
            start: "2025-10-09T08:15:00.000Z",
            end: "2025-10-09T09:45:00.000Z",
        },
        {
            title: "Розробка мобільних застосувань під iOS",
            start: "2025-10-09T10:15:00.000Z",
            end: "2025-10-09T11:45:00.000Z",
        },
        {
            title: "Штучний інтелект і машинне навчання",
            start: "2025-10-09T13:45:00.000Z",
            end: "2025-10-09T15:15:00.000Z",
        },

        // П’ятниця (2025-10-10)
        {
            title: "Комп'ютерні мережі",
            start: "2025-10-10T07:30:00.000Z",
            end: "2025-10-10T09:00:00.000Z",
        },
        {
            title: "Теорія алгоритмів",
            start: "2025-10-10T10:00:00.000Z",
            end: "2025-10-10T11:30:00.000Z",
        },
        {
            title: "Операційні системи",
            start: "2025-10-10T14:00:00.000Z",
            end: "2025-10-10T15:30:00.000Z",
        },
        {
            title: "Інженерія програмного забезпечення",
            start: "2025-10-10T16:00:00.000Z",
            end: "2025-10-10T17:30:00.000Z",
        },

        // Субота (2025-10-11)
        {
            title: "Менеджмент ІТ-проєктів",
            start: "2025-10-11T08:30:00.000Z",
            end: "2025-10-11T10:00:00.000Z",
        },
        {
            title: "Командна розробка та Git",
            start: "2025-10-11T10:30:00.000Z",
            end: "2025-10-11T12:00:00.000Z",
        },
        {
            title: "UI-прототипування",
            start: "2025-10-11T13:30:00.000Z",
            end: "2025-10-11T15:00:00.000Z",
        },

        // Неділя (2025-10-12)
        {
            title: "Самостійна робота над курсовим проєктом",
            start: "2025-10-12T09:00:00.000Z",
            end: "2025-10-12T11:00:00.000Z",
        },
        {
            title: "Підготовка до тестів",
            start: "2025-10-12T12:00:00.000Z",
            end: "2025-10-12T13:30:00.000Z",
        },
        {
            title: "Робота над дипломом",
            start: "2025-10-12T15:00:00.000Z",
            end: "2025-10-12T17:00:00.000Z",
        },
    ];

    const [events, setEvents] = useState(events1);

    useEffect(() => {

    }, [firstWeekDate]);

    const handleTodayClick = () => {
        const now = new Date();
        const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
        const monday = new Date(now);
        monday.setDate(now.getDate() - day);
        monday.setHours(0, 0, 0, 0);

        setFirstWeekDate(monday.toISOString());
    }

    const handleChevronClick = (isNext) => {
        const newFirstWeekDate = new Date(firstWeekDate);
        const day = isNext ? 7 : -7;
        newFirstWeekDate.setDate(newFirstWeekDate.getDate() + day);

        setFirstWeekDate(newFirstWeekDate.toISOString());
    }


    return (
        <div className="flex">
            <WeekCalendar events={events} firstWeekDate={firstWeekDate} onTodayClick={handleTodayClick} onChevronClick={handleChevronClick} />
            <MonthCalendar firstWeekDay={firstWeekDate} selectedDay={firstWeekDate} />
        </div>
    )
}