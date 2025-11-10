import PropTypes from "prop-types";
import ModalWrapper from "./ModalWrapper.jsx";

export default function ModalWrapperTitleSaveDelete({ title, children, onClose, onSave, onDelete }) {
    return (
        <ModalWrapper onClose={onClose}>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {title}
            </h1>
            <span className="flex border-b-1 w-full rounded-full border-gray-300 mb-6" />

            <div className="flex flex-col gap-5">
                {children}
            </div>

            <div className="flex justify-end gap-5 mt-10">
                {onSave && (
                    <button
                        type="button"
                        onClick={onSave}
                        className="flex whitespace-nowrap rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent-on-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Зберегти
                    </button>
                )}
                {onDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        className="flex whitespace-nowrap rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Видалити
                    </button>
                )}
            </div>
        </ModalWrapper>
    );
}

ModalWrapperTitleSaveDelete.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
};