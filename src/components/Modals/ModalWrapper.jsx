import PropTypes from "prop-types";

export default function ModalWrapper({ children, onClose }) {
    return (
        <div className="font-noto fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-[900px] h-[80%] bg-main-white rounded-2xl shadow-xl p-8 overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

ModalWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};