import Divider from "../DividerTextCenter.jsx";
import InputBox from "../BasicInputs/InputBox.jsx";
import {DateBox} from "../BasicInputs/DateBox.jsx";
import PropTypes from "prop-types";

export default function EditProfile({user}) {
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-6">
                <Divider text="Загальна інформація"/>
                <div className="flex w-full justify-center p-4">
                    <div className="bg-accent min-w-40 w-40 h-40 min-h-40 rounded-full mr-30" />
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-10">
                            <InputBox
                                id="lastName"
                                name="lastName"
                                label="Прізвище"
                                placeholder="Коваленко"
                                // value={}
                                className="w-80"
                                // onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <InputBox
                                id="firstName"
                                name="firstName"
                                label="Імʼя"
                                placeholder="Василь"
                                // value={}
                                className="w-80"
                                // onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div className="flex gap-10">
                            <InputBox
                                id="patronymic"
                                name="patronymic"
                                label="По-батькові"
                                placeholder="Ігорович"
                                // value={}
                                className="w-80"
                                // onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <DateBox
                                id="birthdate"
                                name="birthdate"
                                label="Дата народження"
                                className="w-80"
                                // value={eventForm.date}
                                // onChange={handleInputChange}
                            />
                        </div>
                        <InputBox
                            id="email"
                            name="email"
                            label="Пошта"
                            placeholder="example@mail.ua"
                            // value={}
                            className="w-full"
                            // onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-6 justify-end mt-6 px-4">
                    <button
                        type="button"
                        // onClick={handleCreate}
                        className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Зберегти
                    </button>
                    <button
                        type="button"
                        // onClick={handleCreate}
                        className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Відхилити
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <Divider text="Безпека"/>
                <div className="p-4 flex w-full justify-center">
                    <div className="flex flex-col min-w-50 w-50 mr-20 gap-4" >
                        <h2 className="font-bold text-2xl">Змінити пароль</h2>
                        <p className="text-second-text text-sm">Update your password associated with your account.</p>
                    </div>
                    <div className="flex flex-col gap-6 w-full">
                        <InputBox
                            id="password"
                            name="password"
                            label="Поточний пароль"
                            // value={}
                            className="w-full"
                            // onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <InputBox
                            id="newPassword"
                            name="newPassword"
                            label="Новий пароль"
                            // value={}
                            className="w-full"
                            // onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <InputBox
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            label="Підтвердіть новий пароль"
                            // value={}
                            className="w-full"
                            // onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6 px-4">
                    <button
                        type="button"
                        // onClick={handleCreate}
                        className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    )
}

EditProfile.propTypes = {
    user: PropTypes.shape({
        birthDate: PropTypes.string,
        email: PropTypes.string,
        firstName: PropTypes.string,
        iconPath: PropTypes.string,
        id: PropTypes.number,
        lastName: PropTypes.string,
        patronymic: PropTypes.string,
        role: PropTypes.string
    })
}