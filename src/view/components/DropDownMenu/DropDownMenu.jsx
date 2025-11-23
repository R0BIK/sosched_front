import {CheckMarkIcon} from "../../../img/svg/Icons.jsx";

import "./DropDownMenu.css";

import PropTypes from "prop-types";

export default function DropDownMenu(props = {}) {
    const {
        onChoose,
        options,
        keyValue,
        placeholder,
        width,
    } = props;

    const onClick = (key) => {
        onChoose(key);
        document.activeElement.blur();
    }

    const onFocus = (e) => {
        e.target.value = '';
    }

    const onBlur = (e) => {
        e.target.value = options[keyValue]
    }

    return (
        <div className="DropDownMenu" style={{ width: width }}>
            <input
                className="textBox"
                id="textBox"
                value={options[keyValue]}
                type="text"
                readOnly
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label className="placeHolder" htmlFor="textBox">{ placeholder }</label>
            <div className="options">
                {Object.keys(options).map((key) => {
                    const isSelected = keyValue === key;
                    return (
                        <div className="option" key={key} onClick={() => onClick(key)} onMouseDown={(e) => e.preventDefault()}>
                            <p>{options[key]}</p>
                            {isSelected && <CheckMarkIcon className="checkMarkIcon" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

DropDownMenu.propTypes = {
    onChoose: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    keyValue: PropTypes.string.isRequired,
    width: PropTypes.string,
};