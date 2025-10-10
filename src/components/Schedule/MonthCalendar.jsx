import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid'
import PropTypes from "prop-types";

export default function MonthCalendar({ firstWeekDay, selectedDay }) {
    const currentDate = new Date(firstWeekDay)
    const selectedDate = new Date(selectedDay)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    let startWeekDay = firstDayOfMonth.getDay()
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
            date.getDate() === selectedDate.getDate()

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

    const monthName = currentDate.toLocaleDateString('uk-UA', { month: 'long' })

    return (
        <div>
            <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                <div className="flex items-center text-main-black justify-center gap-3">
                    <button
                        type="button"
                        className="p-1.5 text-gray-400 hover:text-gray-600"
                    >
                        <ChevronLeftIcon aria-hidden="true" className="size-5" />
                    </button>
                    <div className="flex-auto text-[18px] font-semibold capitalize">
                        {monthName} {year}
                    </div>
                    <button
                        type="button"
                        className="p-1.5 text-gray-400 hover:text-gray-600"
                    >
                        <ChevronRightIcon aria-hidden="true" className="size-5" />
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
                            key={i}
                            type="button"
                            data-is-today={day.isToday ? '' : undefined}
                            data-is-selected={day.isSelected ? '' : undefined}
                            data-is-current-month={day.isCurrentMonth ? '' : undefined}
                            className="py-1.5 not-data-is-current-month:bg-gray-50 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-100 focus:z-10 data-is-current-month:bg-white not-data-is-selected:data-is-current-month:not-data-is-today:text-gray-900 data-is-current-month:hover:bg-gray-100 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold data-is-today:not-data-is-selected:text-accent nth-36:rounded-bl-lg nth-7:rounded-tr-lg"
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
    firstWeekDay: PropTypes.string.isRequired,
    selectedDay: PropTypes.string.isRequired,
}