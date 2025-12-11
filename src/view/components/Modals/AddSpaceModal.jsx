import ModalWrapper from "./ModalWrapper.jsx";
import PropTypes from "prop-types";
import UnderlinedButton from "../UnderlinedButton.jsx";
import {useCallback, useState} from "react";
import InputBox from "../BasicInputs/InputBox.jsx";
import ToggleWithDescription from "../BasicInputs/ToggleWithDescription.jsx";
import {useJoinSpace} from "../../../tanStackQueries/space/useJoinSpace.js";
import {useSpace} from "../../../context/Space/useSpace.js";
import {useValidate} from "../../../hooks/useValidate.js";
import {useToast} from "../../../context/Toast/useToast.js";
import {getValidationErrorsMap} from "../../../utils/errorMapping.js";

const TABS = {
    ADD: "addSpace",
    CREATE: "createSpace",
}

export default function AddSpaceModal({handleClose}) {
    const validation = useValidate();
    const { showToast } = useToast();

    const { errors, validateForm, addExternalError, resetErrors } = validation;

    const [active, setActive] = useState(TABS.ADD);
    const [addForm, setAddForm] = useState({domain: "", password: ""});
    const [createForm, setCreateForm] = useState({name: "", domain: "", isPublic: false, password: ""});

    const handleChange = useCallback((key, value, func) => {
        func((prev) => ({ ...prev, [key]: value }));
    }, []);

    const { mutateAsync: joinSpace } = useJoinSpace();
    const { createSpace } = useSpace();

    const handleJoin = async () => {
        const isValid = validateForm(addForm);
        if (!isValid) return;

        try {
            await joinSpace(addForm);
            showToast("Успішно!", "Ви приєдналися до простору.")
            handleClose();
        } catch (error) {
            const errors = getValidationErrorsMap(error);
            for (const [key, value] of Object.entries(errors)) {
                if (key === "default") {
                    showToast("Помилка!", "Сталась невідома помилка, спробуйте пізніше.", "error")
                    continue;
                }
                addExternalError(key, value);
            }
        }

        // await joinSpace(addForm);
        // handleClose();
    }

    const handleCreate = async () => {
        await createSpace(createForm);
        handleClose();
    }

    return (
        <ModalWrapper onClose={handleClose} >
            <div className="flex flex-col p-4 w-full">
                <div className="flex gap-10 justify-center">
                    <UnderlinedButton text="Додати простір" onClick={() => setActive(TABS.ADD)} isActive={active === TABS.ADD} />
                    <UnderlinedButton text="Створити простір" onClick={() => setActive(TABS.CREATE)} isActive={active === TABS.CREATE} />
                </div>

                {/*<div className="border-b-1 rounded-full border-gray-300 mb-6 mx-4" />*/}

                <div className="flex p-6 mb-4 w-full items-center justify-center h-full">
                    {active === TABS.ADD && (
                        <div className="flex w-full items-center justify-center gap-10 h-full">
                            <InputBox
                                id="domain"
                                name="domain"
                                label="Домен"
                                error={errors["domain"] || ""}
                                placeholder="example.com"
                                value={addForm.domain}
                                className="w-full"
                                onChange={(e) => handleChange("domain", e.target.value, setAddForm)}
                            />
                            <InputBox
                                id="password"
                                name="password"
                                label="Пароль"
                                placeholder=""
                                error={errors["password"] || ""}
                                value={addForm.password}
                                className="w-full"
                                onChange={(e) => handleChange("password", e.target.value, setAddForm)}
                            />
                            <button
                                type="button"
                                onClick={handleJoin}
                                className="flex mt-8 whitespace-nowrap rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent-on-hover focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Приєднатись
                            </button>
                        </div>
                    )}
                    {active === TABS.CREATE && (
                        <div className="flex flex-col gap-10 justify-center w-full h-full">
                            <div className="flex gap-20 w-full items-center justify-center">
                                <InputBox
                                    id="Name"
                                    name="name"
                                    label="Назва"
                                    placeholder="Робочий простір"
                                    value={createForm.name}
                                    className="w-full"
                                    onChange={(e) => handleChange("name", e.target.value, setCreateForm)}
                                />
                                <InputBox
                                    id="Domain"
                                    name="domain"
                                    label="Домен"
                                    placeholder="sosched.work"
                                    value={createForm.domain}
                                    className="w-full"
                                    onChange={(e) => handleChange("domain", e.target.value, setCreateForm)}
                                />
                            </div>
                            <div className="flex gap-20 w-full items-center justify-center">
                                <ToggleWithDescription
                                    title="Зробити публічним"
                                    description="Дозволяє користувачам приєднуватись до вашого простору"
                                    value={createForm.isPublic}
                                    onChange={(e) => handleChange("isPublic", e.target.checked, setCreateForm)} />
                                <InputBox
                                    id="Password"
                                    name="password"
                                    disabled={!createForm.isPublic}
                                    label="Пароль"
                                    placeholder=""
                                    value={createForm.password}
                                    className="w-full"
                                    onChange={(e) => handleChange("password", e.target.value, setCreateForm)}
                                />
                            </div>
                            <div className="flex justify-end w-full">
                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    className="flex mt-8 whitespace-nowrap rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent-on-hover focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    Створити
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ModalWrapper>
    )
}

AddSpaceModal.propTypes = {
    handleClose: PropTypes.func,
}