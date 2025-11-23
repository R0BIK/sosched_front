import PropTypes from "prop-types";

export default function Divider({ text }) {
    return (
        <div className="flex items-center">
            <div aria-hidden="true" className="w-full border-t border-gray-300" />
            <div className="relative flex justify-center">
                <span className="bg-main-white px-2 text-sm text-gray-500 text-nowrap">{text}</span>
            </div>
            <div aria-hidden="true" className="w-full border-t border-gray-300" />
        </div>
    )
}

Divider.propTypes = {
    text: PropTypes.string,
}