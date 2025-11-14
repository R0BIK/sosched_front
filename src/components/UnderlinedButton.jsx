import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

export default function UnderlinedButton({ text, to }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname.startsWith(to + "/");

    return (
        <button
            onClick={() => navigate(to)}
            data-active={isActive ? '' : undefined}
            className="p-[20px] mx-[5px] text-main-black font-noto text-[18px] relative group cursor-pointer">
            <span className="border-b-[2px] inline-block translate-y-1 transition-translate duration-200 ease-in-out
            group-data-active:border-accent group-hover:border-main-black border-transparent">
                {text}
            </span>
        </button>
    )
}

UnderlinedButton.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};