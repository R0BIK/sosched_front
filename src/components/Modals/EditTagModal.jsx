import PropTypes from "prop-types";
import { useState, useMemo } from "react";

import InputBox from "../BasicInputs/InputBox.jsx";
import SelectMenu from "../BasicInputs/SelectMenu.jsx";
import { SPECIAL } from "../../../constants.js";
import ModalWrapperTitleSaveDelete from "./ModalWrapperTitleSaveDelete.jsx";
import SelectMenuLazy from "../BasicInputs/SelectMenuLazy.jsx";

export default function EditTagModal({ handleClose, tag, handleSaveTag, handleDeleteTag, tagTypesQuery }) {
    const [formData, setFormData] = useState({ ...tag });

    const handleChange = (key, value) => {
        console.log(key, value);
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        handleSaveTag(formData);
        handleClose();
    };

    const tagColorOptions = useMemo(() => {
        return Object.entries(SPECIAL.TAG_COLORS).map(([key, value]) => ({
            id: key,
            name: value.name
        }));
    }, []);

    return (
        <ModalWrapperTitleSaveDelete
            title="Редагування тегу"
            onClose={handleClose}
            onSave={handleSubmit}
            onDelete={() => handleDeleteTag(tag.id)}
        >
            <div className="flex w-full mt-5 gap-20">
                <InputBox
                    id="name"
                    name="name"
                    label="Повна назва тегу"
                    placeholder="Студент"
                    value={formData.name}
                    className="w-full"
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <InputBox
                    id="shortName"
                    name="shortName"
                    label="Назва бейджу"
                    placeholder="Студент"
                    value={formData.shortName}
                    className="w-full"
                    onChange={(e) => handleChange("shortName", e.target.value)}
                />
            </div>

            <div className="flex w-full gap-20">
                <div className="w-full mt-5">
                    <SelectMenu
                        withColor
                        array={tagColorOptions}
                        value={formData.tagColor}
                        onChange={(id) => handleChange("color", id)}
                        label="Оберіть колір тегу"
                    />
                </div>

                <div className="w-full mt-5">
                    <SelectMenuLazy
                        query={tagTypesQuery}
                        value={formData.tagType}
                        onChange={(id) => handleChange("tagType", id)}
                        label="Тип тегу"
                        withColor={false}
                    />
                </div>
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
    tagTypesQuery: PropTypes.object.isRequired,
};