import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
    const timeHeight = 21;

    return  (Math.floor((height - boxPadding - timeHeight) / 21) * 21)
}

export default function WeekCalendar({firstWeekDate, events}) {
    const weekDate = new Date(firstWeekDate);
    const startHour = 7;

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full no-scrollbar overflow-x-auto max-w-[1480px] mx-auto">
            <div>
                <p className="capitalize text-mainBlack text-[32px] font-sans font-semibold pl-[80px]">{new Date(firstWeekDate).toLocaleDateString("uk-UA", { month: "long"})}</p>
            </div>
            <div className="grid" style={{gridTemplateColumns: "80px repeat(7, 150px)"}}>
                <div/>

                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day, i) => {
                    const currentDay = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate() + i);
                    const isToday = isSameDate(currentDay, now);

                    return (
                        <div key={i} className="h-[60px] pl-4 pb-2 content-end font-semibold">
                            <span className="text-mainBlack font-sans">{day}</span>
                            <span className={(isToday ? "bg-red-400" : "") + " rounded p-[3px] ml-1 text-mainBlack font-sans"}>{currentDay.getDate()}</span>
                        </div>
                    )})}
            </div>

            <div className="relative w-fit no-scrollbar overflow-x-hidden" style={{maxHeight: "calc(100vh - 208px)"}}>
                <div className="grid" style={{gridTemplateColumns: "80px repeat(7, 150px)"}}>
                    {Array.from({ length: 17 }).map((_, slotIdx) => {
                        const hour = startHour + slotIdx
                        return (
                            <React.Fragment key={slotIdx}>
                                <div key={`time-${hour}`} className="relative text-right text-sm">
                                    {hour !== startHour && (
                                        <p className="font-sans text-secondText absolute top-[-11px] right-2">
                                            {hour.toString().padStart(2, "0")}:00
                                        </p>
                                    )}
                                </div>

                                {Array.from({ length: 7 }).map((_, dayIdx) => (
                                    <div key={`cell-${dayIdx}`} className="border h-[80px]"/>
                                ))}
                            </React.Fragment>
                        )
                    })}
                </div>

                {events.map((event, i) => {
                    const dateStart = new Date(event.start);
                    const dateEnd = new Date(event.end);

                    const position = getEventPosition(dateStart, dateEnd);

                    return (
                        <div className="absolute w-[130px] rounded-[8px] bg-accentColor pl-[18px] pr-[10px] py-[7px] flex flex-col overflow-hidden"
                             style={{top: position.topStart, left: position.left, height: position.height}} key={`event-${i}`}>
                            <div className="absolute left-0 top-0 h-full w-[10px] bg-black/20 rounded-l-[8px]"></div>

                            <p className="font-sans text-[14px] break-words overflow-hidden text-mainWhite" style={{maxHeight: position.tittleMaxHeight}}>
                                {event.title}
                            </p>
                            <p className="text-gray-200 mt-[4px] text-[14px] font-sans">
                                {dateStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {dateEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
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
                            className="absolute w-[160px] rounded h-[4px] bg-red-700"
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

WeekCalendar.propTypes = {
    firstWeekDate: PropTypes.string,
    events: PropTypes.array.isRequired,
}