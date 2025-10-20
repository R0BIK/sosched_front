import PropTypes from "prop-types";

export default function EventView({ dateStart, dateEnd, position, event, index, onEventClick }) {
    return (
        <button
            onClick={onEventClick}
            className="absolute w-[130px] rounded-[8px] bg-accent pl-[18px] pr-[10px] py-[7px] flex flex-col overflow-hidden text-left"
            style={{top: position.topStart, left: position.left, height: position.height}} key={`event-${index}`}>
            <div className="absolute left-0 top-0 h-full w-[9px] bg-white/15 rounded-l-[8px]"></div>

            <p className="font-noto text-[14px] break-words overflow-hidden text-main-white" style={{maxHeight: position.tittleMaxHeight}}>
                {event.title}
            </p>
            <p className="text-gray-200 mt-[6px] text-[14px] font-noto">
                {dateStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {dateEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
        </button>
    )
}

EventView.propTypes = {
    dateStart: PropTypes.instanceOf(Date).isRequired,
    dateEnd: PropTypes.instanceOf(Date).isRequired,
    onEventClick: PropTypes.func.isRequired,
    position: PropTypes.shape({
        topStart: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        tittleMaxHeight: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
    }).isRequired,
};