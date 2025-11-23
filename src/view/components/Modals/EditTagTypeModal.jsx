import PropTypes from "prop-types";
import { useState } from "react";

import InputBox from "../BasicInputs/InputBox.jsx";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx";

export default function EditTagTypeModal({ handleClose, tagType, handleSaveTagType, handleDeleteTagType }) {
    const [formData, setFormData] = useState({ ...tagType });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        handleSaveTagType(formData);
        handleClose();
    };

    return (
        <ModalWrapperTitleSaveDelete
            title="Редагування тегу"
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={() => handleDeleteTagType(tagType.id)}
        >
            <div className="flex w-full mt-5 gap-20">
                <InputBox
                    id="name"
                    name="name"
                    label="Назва типу тегу"
                    placeholder="Група"
                    value={formData.name}
                    className="w-full"
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
    tagType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        members: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
};