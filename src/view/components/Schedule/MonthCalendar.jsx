import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid'
import PropTypes from "prop-types";

export default function MonthCalendar({ selectedDay, displayedMonth, handleDayClick, handleMonthChange }) {
    const displayDate = new Date(displayedMonth);
    const selectedDate = new Date(selectedDay);

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let startWeekDay = firstDayOfMonth.getDay();
    if (startWeekDay === 0) startWeekDay = 7 // починаємо з понеділка

    const days = []

    // Дні попереднього місяця
    for (let i = 1; i < startWeekDay; i++) {
        const prevDate = new Date(year, month, 1 - (startWeekDay - i))
        days.push({ date: prevDate })
    }

    // Дні поточного місяця
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i)
        const today = new Date()
        const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()

        const isSelected =
            selectedDate &&
            date.getFullYear() === selectedDate.getFullYear() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getDate() === selectedDate.getDate();

        days.push({
            date,
            isCurrentMonth: true,
            isToday,
            isSelected,
        })
    }

    // Дні наступного місяця, щоб заповнити сітку
    while (days.length % 7 !== 0) {
        const nextDate = new Date(
            year,
            month + 1,
            days.length - daysInMonth - startWeekDay + 2
        )
        days.push({ date: nextDate })
    }

    const monthName = displayDate.toLocaleDateString('uk-UA', { month: 'long' })

    return (
        <div className="w-[240px] h-auto">
            <div className="text-center col-start-8 col-end-13 row-start-1">
                <div className="flex items-center text-main-black justify-center gap-3">
                    <button
                        onClick={() => handleMonthChange(false)}
                        type="button"
                        className="p-1.5 text-second-text hover:text-main-black cursor-pointer"
                    >
                        <ChevronLeftIcon aria-hidden="true" className="size-6" />
                    </button>
                    <div className="flex-auto text-[18px] font-semibold capitalize">
                        {monthName} {year}
                    </div>
                    <button
                        onClick={() => handleMonthChange(true)}
                        type="button"
                        className="p-1.5 text-second-text hover:text-main-black cursor-pointer"
                    >
                        <ChevronRightIcon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500 font-noto">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Нд</div>
                </div>

                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200">
                    {days.map((day, i) => (
                        <button
                            onClick={() => {handleDayClick(day.date)}}
                            key={i}
                            type="button"
                            data-is-today={day.isToday ? '' : undefined}
                            data-is-selected={day.isSelected ? '' : undefined}
                            data-is-current-month={day.isCurrentMonth ? '' : undefined}
                            data-is-six-row={days.length === 42 ? '' : undefined}
                            data-is-four-row={days.length === 28 ? '' : undefined}
                            className="py-1.5
                            not-data-is-current-month:bg-gray-50
                            not-data-is-selected:not-data-is-current-month:not-data-is-today:text-second-text
                            first:rounded-tl-lg last:rounded-br-lg
                            hover:bg-gray-100 focus:z-10
                            data-is-current-month:bg-white
                            not-data-is-selected:data-is-current-month:not-data-is-today:text-main-black
                            data-is-current-month:hover:bg-gray-100 data-is-selected:font-semibold
                            data-is-selected:text-white data-is-today:font-semibold
                            data-is-today:not-data-is-selected:text-accent nth-7:rounded-tr-lg
                            data-is-six-row:nth-36:rounded-bl-lg
                            data-is-four-row:nth-22:rounded-bl-lg
                            not-data-is-six-row:not-data-four-row:nth-29:rounded-bl-lg"
                        >
                            <time
                                dateTime={day.date.toISOString().split('T')[0]}
                                className="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-main-black in-data-is-selected:in-data-is-today:bg-accent"
                            >
                                {day.date.getDate()}
                            </time>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

MonthCalendar.propTypes = {
    selectedDay: PropTypes.string.isRequired,
    displayedMonth: PropTypes.string.isRequired,
    handleDayClick: PropTypes.func.isRequired,
    handleMonthChange: PropTypes.func.isRequired,
}