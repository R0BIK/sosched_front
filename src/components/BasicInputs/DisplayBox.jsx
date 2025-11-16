import PropTypes from "prop-types";

export default function DisplayBox({ id, label, value, className }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block font-semibold text-gray-900">
                {label}
            </label>
            <div className="mt-1">
                <p
                    id={id}
                    className="block w-full rounded-md bg-main-white py-1.5 text-base text-gray-900 sm:text-lg"
                >
                    {value || "–"}
                </p>
            </div>
        </div>
    );
}

DisplayBox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
};