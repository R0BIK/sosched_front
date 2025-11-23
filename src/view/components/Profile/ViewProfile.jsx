import Divider from "../DividerTextCenter.jsx";
import DisplayBox from "../BasicInputs/DisplayBox.jsx";
import PropTypes from "prop-types";

export default function ViewProfile({user, isOwner, handleLogout, handleEditProfile}) {
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-6">
                <Divider text="Загальна інформація"/>
                <div className="flex w-full justify-center p-4">
                    <div className="bg-accent min-w-40 w-40 h-40 min-h-40 rounded-full mr-30" />
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-10">
                            <DisplayBox
                                id="lastName"
                                name="lastName"
                                label="Прізвище"
                                value={user?.lastName}
                                className="w-80"
                            />
                            <DisplayBox
                                id="firstName"
                                label="Імʼя"
                                value={user?.firstName}
                                className="w-80"
                            />
                        </div>
                        <div className="flex gap-10">
                            <DisplayBox
                                id="patronymic"
                                label="По-батькові"
                                value={user?.patronymic}
                                className="w-80"
                            />
                            <DisplayBox
                                id="birthdate"
                                label="Дата народження"
                                className="w-80"
                                value={user?.birthDate}
                            />
                        </div>
                        <div className="flex gap-10">
                            <DisplayBox
                                id="email"
                                label="Пошта"
                                value={user?.email}
                                className="w-full"
                            />
                            <DisplayBox
                                id="role"
                                label="Роль"
                                value={user?.role}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isOwner && (
                <div className="flex gap-6 w-full justify-end">
                    <div className="flex items-start">
                        <button
                            type="button"
                            className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Редагувати
                        </button>
                    </div>
                    <div className="flex items-start">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="block whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Вийти
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

ViewProfile.propTypes = {
    user: PropTypes.shape({
        birthDate: PropTypes.string,
        email: PropTypes.string,
        firstName: PropTypes.string,
        iconPath: PropTypes.string,
        id: PropTypes.number,
        lastName: PropTypes.string,
        patronymic: PropTypes.string,
        role: PropTypes.string
    }),
    isOwner: PropTypes.bool,
    handleLogout: PropTypes.func,
    handleEditProfile: PropTypes.func,
}