import PropTypes from "prop-types";
import { useState } from "react";

import InputBox from "../BasicInputs/InputBox.jsx";
import SelectMenu from "../BasicInputs/SelectMenu.jsx";
import { SPECIAL } from "../../../constants.js";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx"; // ✅ обёртка для всех модалок

export default function EditTagModal({ handleClose, tag, handleSaveTag, handleDeleteTag }) {
    const [formData, setFormData] = useState({ ...tag });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        handleSaveTag(formData);
    };

    const tagColorNames = Object.values(SPECIAL.tagColors).map(color => color.name);

    const getColorKeyByName = (name) => {
        return Object.entries(SPECIAL.tagColors).find(
            ([, value]) => value.name === name
        )?.[0];
    };

    return (
        <ModalWrapperTitleSaveDelete
            title="Редагування тегу"
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={() => handleDeleteTag(tag.id)}
        >
            <div className="flex w-full mt-5 gap-20">
                <InputBox
                    id="fullName"
                    type="text"
                    name="Повна назва тегу"
                    placeholder="Студент"
                    value={formData.name}
                    className="w-full"
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <InputBox
                    id="shortName"
                    type="text"
                    name="Коротка назва тегу"
                    placeholder="Студент"
                    value={formData.tag}
                    className="w-full"
                    onChange={(e) => handleChange("tag", e.target.value)}
                />
            </div>

            <div className="flex w-full mt-5 gap-20">
                <SelectMenu
                    withColor
                    array={tagColorNames}
                    onChange={(e) => handleChange("tagColor", getColorKeyByName(e))}
                    value={SPECIAL.tagColors[formData.tagColor].name}
                    label="Оберіть колір тегу"
                />
            </div>
        </ModalWrapperTitleSaveDelete>
    );
}

EditTagModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSaveTag: PropTypes.func.isRequired,
    handleDeleteTag: PropTypes.func.isRequired,
    tag: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        members: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        tagColor: PropTypes.string.isRequired,
    }).isRequired,
};