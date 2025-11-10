import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EventView from "./EventView.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "../../img/svg/Icons.jsx";
import EventPopup from "./EventPopup.jsx";

export default function WeekCalendar({firstWeekDate, selectedDay, events, handleDayClick, onChevronClick}) {
    const weekDate = new Date(firstWeekDate);
    const startHour = 7;

    const [now, setNow] = useState(new Date());
    const [activeEvent, setActiveEvent] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);


    return (
        <div className="relative w-full no-scrollbar overflow-x-auto max-w-[1130px] pt-[15px]">
            <EventPopup event={activeEvent} onClose={() => setActiveEvent(null)} />
            <div className="flex gap-[40px] items-center h-max">
                <button onClick={() => {onChevronClick(false)}}
                    className="justify-start ml-[80px] p-[8px] cursor-pointer">
                    <ChevronLeftIcon className="h-[24px] w-[24px] fill-second-text hover:fill-main-black"/>
                </button>

                <p className="capitalize text-main-black text-[32px] font-noto font-semibold">{new Date(firstWeekDate).toLocaleDateString("uk-UA", { month: "long"})}</p>

                <button onClick={() => {handleDayClick(new Date())}} className="cursor-pointer">
                    <div className={`border-[2px] border-second-text rounded-[8px] px-[10px] text-main-black text-[18px] font-noto font-medium`}>
                        Сьогодні
                    </div>
                </button>

                <button onClick={() => {onChevronClick(true)}}
                    className="p-[8px] cursor-pointer">
                    <ChevronRightIcon className="h-[24px] w-[24px] fill-second-text hover:fill-main-black" />
                </button>

            </div>
            <div className="grid" style={{gridTemplateColumns: "80px repeat(7, 150px)"}}>
                <div/>

                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day, i) => {
                    const currentDay = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate() + i);
                    const isToday = isSameDate(currentDay, now);
                    const isSelected = isSameDate(currentDay, new Date(selectedDay));

                    return (
                        <div key={i} className="h-[60px] pl-4 pb-2 content-end">
                            <span className="text-main-black font-noto">{day}</span>
                            <span
                                data-is-today={isToday ? '' : undefined}
                                data-is-selected={isSelected ? '' : undefined}
                                className="rounded px-[4px] py-[1px] ml-[3px] text-main-black font-noto data-is-today:bg-red-400 data-is-selected:not-data-is-today:bg-second-text"
                            >
                                {currentDay.getDate()}
                            </span>
                        </div>
                    )})}
            </div>

            <div className="relative w-fit no-scrollbar overflow-x-hidden max-h-[calc(100vh-193px)]">
                <div className="grid" style={{gridTemplateColumns: "80px repeat(7, 150px)"}}>
                    {Array.from({ length: 17 }).map((_, slotIdx) => {
                        const hour = startHour + slotIdx
                        return (
                            <React.Fragment key={slotIdx}>
                                <div key={`time-${hour}`} className="relative text-right text-sm">
                                    {hour !== startHour && (
                                        <p className="font-noto text-second-text absolute top-[-11px] right-2">
                                            {hour.toString().padStart(2, "0")}:00
                                        </p>
                                    )}
                                </div>

                                {Array.from({ length: 7 }).map((_, dayIdx) => (
                                    <div key={`cell-${dayIdx}`} className="border border-gray-200 h-[80px]"/>
                                ))}
                            </React.Fragment>
                        )
                    })}
                </div>

                {events?.map((event, i) => {
                    const dateStart = new Date(event.start);
                    const dateEnd = new Date(event.end);

                    if (!isEventInCurrentWeek(dateStart, dateEnd, firstWeekDate)) return null;

                    const position = getEventPosition(dateStart, dateEnd);

                    return (
                        <EventView onEventClick={() => setActiveEvent(event)} dateStart={dateStart} dateEnd={dateEnd} position={position} key={i} index={i} event={event} />
                    )
                })}

                {isCurrentWeek(now, firstWeekDate) && (
                    <div className="absolute" style={{ top: getTopPadding(now) - 1}}>
                        <svg className="absolute left-[80px] h-[4px]" style={{ width: "1260" }}>
                            <line
                                x1="0"
                                y1="0"
                                x2="100%"
                                y2="0"
                                stroke="gray"
                                strokeWidth="4"
                                strokeDasharray="23,29"
                            />
                        </svg>

                        <div
                            className="absolute w-[130px] rounded h-[4px] bg-red-700"
                            style={{ left: getLeftPadding(now), top: -1}}
                        />

                        <div
                            className="absolute w-[4px] rounded h-[20px] bg-red-700"
                            style={{ top: -9, left: getLeftPadding(now) - 2}}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

function isSameDate(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isCurrentWeek(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const day1 = d1.getDay() === 0 ? 6 : d1.getDay() - 1;
    const day2 = d2.getDay() === 0 ? 6 : d2.getDay() - 1;

    d1.setHours(0, 0, 0, 0);
    d1.setDate(d1.getDate() - day1);

    d2.setHours(0, 0, 0, 0);
    d2.setDate(d2.getDate() - day2);

    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

function getTopPadding(now) {
    const slotHeight = 80;
    const startHour = 7

    const minutesFromStart = (now.getHours() - startHour) * 60 + now.getMinutes();

    return (minutesFromStart / 60) * slotHeight
}

function getEventPosition(start, end) {
    const topStart = getTopPadding(start);
    const topEnd = getTopPadding(end);

    const height = topEnd - topStart;
    const tittleMaxHeight = getTitleMaxHeight(height);

    const left = getLeftPadding(start)

    return {left, topStart, height, tittleMaxHeight};
}

function getLeftPadding(date) {
    const weekDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return (weekDay * 150 + 80);
}

function getTitleMaxHeight(height) {
    const boxPadding = 14;
    const timeHeight = 23;
    const textHeight = 21;

    return  (Math.floor((height - boxPadding - timeHeight) / textHeight) * textHeight)
}

function isEventInCurrentWeek(eventStart, eventEnd, firstWeekDate) {
    const startOfWeek = new Date(firstWeekDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return (
        (eventStart >= startOfWeek && eventStart < endOfWeek) ||
        (eventEnd > startOfWeek && eventEnd <= endOfWeek)
    );
}

WeekCalendar.propTypes = {
    firstWeekDate: PropTypes.string.isRequired,
    selectedDay: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    handleDayClick: PropTypes.func.isRequired,
    onChevronClick: PropTypes.func.isRequired,
}