import PropTypes from "prop-types";

export default function Drawer({ children, isOpen, onClose, width = "400px" }) {
    if (!isOpen) return null;

    return (
        <div
            className="flex h-full bg-main-white shadow-sm flex-shrink-0 overflow-auto relative"
            style={{ width }}
        >
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
                ✕
            </button>
            <div className="p-5 w-full">{children}</div>
        </div>
    );
}

Drawer.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    width: PropTypes.string,
};