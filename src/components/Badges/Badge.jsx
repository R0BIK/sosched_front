import PropTypes from "prop-types";
import {SPECIAL} from "../../../constants.js";

export default function Badge({text, color}) {
    const bgStyle = SPECIAL.tagColors[color].bg || SPECIAL.tagColors.gray.bg;
    const textStyle = SPECIAL.tagColors[color].text || SPECIAL.tagColors.gray.text;

    return (
        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium" style={{backgroundColor: bgStyle, color: textStyle}}>
            {text}
        </span>
    )
}

Badge.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}