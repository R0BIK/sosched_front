import PropTypes from "prop-types";

import ToggleWithDescription from "./ToggleWithDescription.jsx";
import ClassicInputBox from "./BasicInputs/ClassicInputBox.jsx";

export default function EditRoleModal({handleClose, name}) {
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
                    Редагування ролі
                </h1>
                <span className="flex border-b-1 w-full rounded-full border-gray-300" />

                <div className="flex w-full flex-col mt-5">
                    <ClassicInputBox name={"Назва ролі"} placeholder={"Студент"} className="w-1/2" value={name}/>

                    <h2 className="mt-10 mb-5 text-2xl font-semibold">Дозволи</h2>
                    <ToggleWithDescription title="Створювати й редагувати ролі" description="Дає можливість створити роль"/>
                    <span className="border-b-1 rounded-full border-gray-300" />
                    <ToggleWithDescription title="Створювати й редагувати ролі" description="Дає можливість створити роль"/>
                    <span className="border-b-1 rounded-full border-gray-300" />
                    <ToggleWithDescription title="Створювати й редагувати ролі" description="Дає можливість створити роль"/>
                    <span className="border-b-1 rounded-full border-gray-300" />
                    <ToggleWithDescription title="Створювати й редагувати ролі" description="Дає можливість створити роль"/>
                    <span className="border-b-1 rounded-full border-gray-300" />
                    <ToggleWithDescription title="Створювати й редагувати ролі" description="Дає можливість створити роль"/>
                    <span className="border-b-1 rounded-full border-gray-300" />
                    <ToggleWithDescription title="Створювати й редагувати ролі" description="Дає можливість створити роль"/>
                    <span className="border-b-1 rounded-full border-gray-300" />
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

EditRoleModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}