import PropTypes from "prop-types";

export default function EventPopup({ event, onClose }) {
    if (!event) return null;

    const start = new Date(event.start);
    const end = new Date(event.end);

    return (
        <div className="fixed top-5 right-5 z-50 bg-white shadow-lg rounded-xl border border-gray-200 p-5 w-[300px]">
            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={onClose}
            >
                ✕
            </button>
            <h3 className="text-lg font-semibold text-main-black mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-1">
                <span className="font-semibold">Початок:</span> {start.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-1">
                <span className="font-semibold">Кінець:</span> {end.toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">
                <span className="font-semibold">Тривалість:</span>{" "}
                {Math.round((end - start) / 60000)} хв
            </p>
        </div>
    );
}

EventPopup.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        description: PropTypes.string,
        location: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};