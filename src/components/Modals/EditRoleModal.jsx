import PropTypes from "prop-types";
import { useState } from "react";

import ClassicInputBox from "../BasicInputs/ClassicInputBox.jsx";

import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx"; // 🔹 добавили обёртку

export default function EditRoleModal({ handleClose, role, handleSaveRole, handleDeleteRole }) {
    const [formData, setFormData] = useState({ ...role });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        handleSaveRole(formData);
    };

    return (
        <ModalWrapperTitleSaveDelete
            title="Редагування ролі"
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={() => handleDeleteRole(role.id)}
        >
            {/* --- Контент внутри модалки --- */}
            <div className="flex w-full gap-20">
                <ClassicInputBox
                    id="fullName"
                    type="text"
                    name="Назва ролі"
                    placeholder="Студент"
                    value={formData.name}
                    className="w-full"
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <ClassicInputBox
                    id="shortName"
                    type="text"
                    name="Коротка назва тегу"
                    placeholder="Студент"
                    value={formData.role}
                    className="w-full"
                    onChange={(e) => handleChange("role", e.target.value)}
                />
            </div>

        </ModalWrapperTitleSaveDelete>
    );
}

EditRoleModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSaveRole: PropTypes.func.isRequired,
    handleDeleteRole: PropTypes.func.isRequired,
    role: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        members: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        tagColor: PropTypes.string.isRequired,
    }).isRequired,
};