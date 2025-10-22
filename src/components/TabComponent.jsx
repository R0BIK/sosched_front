import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

export default function TabComponent({ text, Icon, to }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <button
            data-active={isActive ? '' : undefined}
            onClick={() => {navigate(to)}}
            className="flex items-center justify-between gap-4 rounded-xl p-4 w-[220px]
            border-2 border-transparent
            hover:border-second-text
            data-active:bg-gray-400/30 data-active:border-second-text">
            <div className="flex justify-center">
                {Icon && <Icon className="size-6 fill-main-black" />}
            </div>

            <p className="font-noto text-main-black font-semibold text-xl text-left flex-1">
                {text}
            </p>
        </button>
    )
}

TabComponent.propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    to: PropTypes.string.isRequired
}