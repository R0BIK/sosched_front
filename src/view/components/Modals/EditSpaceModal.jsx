import PropTypes from "prop-types";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx";
import InputBox from "../BasicInputs/InputBox.jsx";
import ToggleWithDescription from "../BasicInputs/ToggleWithDescription.jsx";
import {useCallback, useState} from "react";
import {useSpace} from "../../../context/Space/useSpace.js";
import {useToast} from "../../../context/Toast/useToast.js";
import {getChangedFields} from "../../../utils/getChangedFields.js";
import {useUpdateSpace} from "../../../tanStackQueries/space/useUpdateSpace.js";

export default function EditSpaceModal({ handleClose }) {
    const { activeSpace } = useSpace();
    const { showToast } = useToast();

    const { mutateAsync: updateSpace } = useUpdateSpace();


    const [form, setForm] = useState({...activeSpace});

    const handleChange = useCallback((key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }, []);


    const handleSave = async () => {
        const {id, ...request} = form

        const {data, isChanged} = getChangedFields(activeSpace, request)

        if (!isChanged) {
            handleClose();
            return;
        }

        try {
            await updateSpace({id, data});

            showToast("Успішно!", 'Простір оновлено.');

            handleClose();
        } catch (error) {
            console.error("Error updating space:", error);
        }
    }

    return (
        <ModalWrapperTitleSaveDelete title="Редагування простору" onClose={handleClose} onSave={handleSave}>
            <div className="flex gap-20 w-full items-center justify-center">
                <InputBox
                    id="Name"
                    name="name"
                    label="Назва"
                    placeholder="Робочий простір"
                    value={form.name}
                    className="w-full"
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <div className="relative flex w-full">
                    <InputBox
                        id="Domain"
                        name="domain"
                        label="Домен"
                        placeholder="sosched.work"
                        value={form.domain}
                        className="w-full"
                        inputClassName="pr-8"

                        onChange={(e) => handleChange("domain", e.target.value)}
                    />
                    {/*<button className="absolute bottom-1 right-1  group-data-disabled:invisible text-second-text flex items-center justify-center p-1 hover:text-main-black"*/}
                    {/*    // onClick={async () => await copyToClipboard("Test")}*/}
                    {/*>*/}
                    {/*<span className="material-symbols-outlined" style={{ fontSize: '20px' }}>*/}
                    {/*    content_copy*/}
                    {/*</span>*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className="flex gap-20 w-full items-center justify-center">
                <ToggleWithDescription
                    title="Зробити публічним"
                    description="Дозволяє користувачам приєднуватись до вашого простору"
                    value={form.isPublic}
                    onChange={(e) => handleChange("isPublic", e.target.checked)} />
                <div className="relative flex w-full group"
                    data-disabled={!form.isPublic ? '' : undefined}>
                    <InputBox
                        id="Password"
                        name="password"
                        disabled={!form.isPublic}
                        label="Пароль"
                        placeholder=""
                        value={form.password || ""}
                        className="w-full"
                        inputClassName="pr-8"
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    {/*<button className="absolute bottom-1 right-1  group-data-disabled:invisible text-second-text flex items-center justify-center p-1 hover:text-main-black"*/}
                    {/*    // onClick={async () => await copyToClipboard("Test")}*/}
                    {/*>*/}
                    {/*<span className="material-symbols-outlined" style={{ fontSize: '20px' }}>*/}
                    {/*    content_copy*/}
                    {/*</span>*/}
                    {/*</button>*/}
                </div>
            </div>
        </ModalWrapperTitleSaveDelete>
    )
}

EditSpaceModal.propTypes = {
    handleClose: PropTypes.func,
}