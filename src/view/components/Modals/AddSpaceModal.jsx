import ModalWrapper from "./ModalWrapper.jsx";
import PropTypes from "prop-types";
import UnderlinedButton from "../UnderlinedButton.jsx";
import {useState} from "react";
import InputBox from "../BasicInputs/InputBox.jsx";

const TABS = {
    ADD: "addSpace",
    CREATE: "createSpace",
}

export default function AddSpaceModal({handleClose}) {
    const [active, setActive] = useState(TABS.ADD);

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
                        <div className="flex w-full items-center justify-center gap-6 h-full">
                            <InputBox
                                id="key"
                                name="key"
                                label="Введіть код простору"
                                placeholder="dHr-2jH-dF8OP"
                                // value={}
                                className="w-50"
                                // onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <button
                                type="button"
                                className="flex mt-8 whitespace-nowrap rounded-md bg-accent px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent-on-hover focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Знайти
                            </button>
                        </div>
                    )}
                    {active === TABS.CREATE && (
                        <div className="flex flex-col justify-center h-full">
                            <div className="flex gap-20 w-full items-center justify-center">
                                <InputBox
                                    id="key"
                                    name="key"
                                    label="Назва"
                                    placeholder="Робочий простір"
                                    // value={}
                                    className="w-50"
                                    // onChange={(e) => handleChange("name", e.target.value)}
                                />
                                <InputBox
                                    id="key"
                                    name="key"
                                    label="Домен"
                                    placeholder="sosched.work"
                                    // value={}
                                    className="w-50"
                                    // onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end w-full">
                                <button
                                    type="button"
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