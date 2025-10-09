import WeekCalendar from "../components/WeekCalendar.jsx";

export default function Schedule() {
    const event1 = {
        title: "Технології та засоби розробки комп'ютерної графіки та мультимедіа",
        start: "2025-09-18T07:25:00.000Z",
        end: "2025-10-09T09:00:00.000Z",
    }

    const event2 = {
        title: "Розробка мобільних застосувань під iOS",
        start: "2025-10-09T09:35:00.000Z",
        end: "2025-10-09T11:25:00.000Z",
    }

    const events = [event1, event2]

    return (
        <div className="">
            <WeekCalendar events={events} firstWeekDate="2025-09-15T00:00:00.000Z"/>
        </div>
    )
}