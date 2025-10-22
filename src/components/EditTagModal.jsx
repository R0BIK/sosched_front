import PropTypes from "prop-types";

import ToggleWithDescription from "./ToggleWithDescription.jsx";
import ClassicInputBox from "./BasicInputs/ClassicInputBox.jsx";
import SelectMenu from "./BasicInputs/SelectMenu.jsx";

export default function EditTagModal({handleClose, name}) {
    return (
        <div className="font-noto fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-[900px] h-[80%] bg-main-white rounded-2xl shadow-xl p-8 overflow-y-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✕
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Редагування тегу
                </h1>
                <span className="flex border-b-1 w-full rounded-full border-gray-300" />

                <div className="flex flex-col">
                    <div className="flex w-full mt-5 gap-20">
                        <ClassicInputBox name={"Повна назва тегу"} placeholder={"Студент"} className="w-full"/>
                        <ClassicInputBox name={"Коротка назва тегу"} placeholder={"Студент"} className="w-full"/>
                    </div>
                    <div className="flex w-full mt-5 gap-20">
                        <div className="w-full">
                            <SelectMenu />
                        </div>
                        <div className="w-full">
                            <SelectMenu />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-10">
                    <button
                        type="button"
                        className="flex whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    )
}

EditTagModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}