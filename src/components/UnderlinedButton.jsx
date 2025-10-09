import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

export default function UnderlinedButton({ text, to }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <button
            onClick={() => navigate(to)}
            className="p-[20px] m-[5px] text-mainBlack font-sans text-[18px] relative group">
            <span className={`border-b-[2px] border-transparent 
            inline-block translate-y-1 transition-translate duration-200 ease-in-out
            ${isActive ? "border-accentColor" : "border-transparent group-hover:border-mainBlack"}`}>
                {text}
            </span>
        </button>
    )
}

UnderlinedButton.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};