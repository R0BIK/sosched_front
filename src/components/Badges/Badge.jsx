import PropTypes from "prop-types";
import {SPECIAL} from "../../../constants.js";

export default function Badge({text, color}) {
    const colorConfig = SPECIAL.TAG_COLORS[color] ?? SPECIAL.TAG_COLORS.gray;

    const bgStyle = colorConfig.bg;
    const textStyle = colorConfig.text;

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