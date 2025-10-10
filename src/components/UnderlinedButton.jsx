import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

export default function UnderlinedButton({ text, to }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <button
            onClick={() => navigate(to)}
            className="p-[20px] mx-[5px] text-main-black font-noto text-[18px] relative group">
            <span className={`border-b-[2px] inline-block translate-y-1 transition-translate duration-200 ease-in-out
            ${isActive ? "border-accent" : "border-transparent group-hover:border-main-black"}`}>
                {text}
            </span>
        </button>
    )
}

UnderlinedButton.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};