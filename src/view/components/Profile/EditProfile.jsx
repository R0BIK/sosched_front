import Divider from "../DividerTextCenter.jsx";
import InputBox from "../BasicInputs/InputBox.jsx";
import {DateBox} from "../BasicInputs/DateBox.jsx";
import PropTypes from "prop-types";
import {useState} from "react";
import {useUpdateUser} from "../../../tanStackQueries/user/useUpdateUser.js";
import {getChangedFields} from "../../../utils/getChangedFields.js";
import {useToast} from "../../../context/Toast/useToast.js";
import {useSpace} from "../../../context/Space/useSpace.js";
import {useNavigate} from "react-router-dom";

export default function EditProfile({user}) {
    const [formData, setFormData] = useState({...user});
    const { activeSpace } = useSpace();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const domain = activeSpace?.domain;

    const { mutateAsync: updateUser } = useUpdateUser(domain);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSave = async () => {
        const { data, isChanged } = getChangedFields(user, formData);

        if (!isChanged) {
            return;
        }

        try {
            await updateUser(data);

            showToast("Успішно!", 'Дані профілю оновлено.');
            navigate("/profile")

        } catch (error) {
            console.error("Error updating space:", error);
        }
    }


    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-6">
                <Divider text="Загальна інформація"/>
                <div className="flex w-full justify-center p-4">
                    <div className="bg-accent min-w-40 w-40 h-40 min-h-40 rounded-full mr-30" />
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-10">
                            <InputBox
                                id="LastName"
                                name="lastName"
                                label="Прізвище"
                                placeholder="Коваленко"
                                value={formData.lastName}
                                className="w-80"
                                onChange={(e) => handleChange(e)}
                            />
                            <InputBox
                                id="FirstName"
                                name="firstName"
                                label="Імʼя"
                                placeholder="Василь"
                                value={formData.firstName}
                                className="w-80"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="flex gap-10">
                            <InputBox
                                id="Patronymic"
                                name="patronymic"
                                label="По-батькові"
                                placeholder="Ігорович"
                                value={formData.patronymic || ""}
                                className="w-80"
                                onChange={(e) => handleChange(e)}
                            />
                            <DateBox
                                id="Birthday"
                                name="birthday"
                                label="Дата народження"
                                className="w-80"
                                value={formData.birthday || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <InputBox
                            id="email"
                            name="email"
                            label="Пошта"
                            placeholder="example@mail.ua"
                            value={formData.email}
                            className="w-full"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className="flex gap-6 justify-end mt-6 px-4">
                    <button
                        type="button"
                        onClick={handleSave}
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