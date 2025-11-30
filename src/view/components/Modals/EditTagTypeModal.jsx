import PropTypes from "prop-types";
import { useState } from "react";

import InputBox from "../BasicInputs/InputBox.jsx";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx";

export default function EditTagTypeModal({ handleClose, selected, handleSaveTagType, handleDeleteTagType, validation }) {
    const [formData, setFormData] = useState({ ...selected.tagType });
    const { errors, validateField, clearError } = validation;

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        clearError(key);
    };

    const handleSubmit = () => {
        handleSaveTagType(formData, selected.type);
    };

    const onBlur = (key, value) => {
        validateField(key, value);
    }

    const onDelete = () => {
        handleDeleteTagType(selected.tagType.id)
    }

    const isEdit = selected.type === "edit";

    const title = selected.type === "edit" ? "Редагування типу тегу" : "Створення типу тегу"

    return (
        <ModalWrapperTitleSaveDelete
            title={title}
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={isEdit ? onDelete : null}
        >
            <div className="flex w-full mt-5 gap-20">
                <InputBox
                    id="name"
                    name="name"
                    label="Назва типу тегу"
                    placeholder="Група"
                    value={formData.name}
                    error={errors["name"] || ""}
                    className="w-full"
                    onBlur={(e) => onBlur(e.target.id, e.target.value)}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
            </div>
        </ModalWrapperTitleSaveDelete>
    );
}

EditTagTypeModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSaveTagType: PropTypes.func.isRequired,
    handleDeleteTagType: PropTypes.func.isRequired,
    selected: PropTypes.shape({
        tagType: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }),
        type: PropTypes.string.isRequired,
    }).isRequired,
    validation: PropTypes.object
};