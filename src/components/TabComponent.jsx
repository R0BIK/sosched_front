import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import InitialBadge from "./Badges/InitialBadge.jsx";

export default function TabComponent({ text, Icon, to, initial }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <button
            data-active={isActive ? '' : undefined}
            data-initial={initial ? '' : undefined}
            onClick={() => {navigate(to)}}
            className="flex items-center justify-between gap-4 text-main-black rounded-lg px-4 py-2 w-[250px]
            hover:bg-gray-200/50
            data-active:not-data-initial:bg-gray-200/50 data-active:text-accent group relative">
            <div className="flex justify-center">
                {initial ? <InitialBadge text={initial} /> : Icon ? <Icon className="size-4 fill-black/80  group-data-active:fill-accent" /> : null}
            </div>

            <p className="font-noto font-bold text-lg text-left flex-1 group-data-initial:font-medium">
                {text}
            </p>
        </button>
    )
}

TabComponent.propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.elementType,
    initial: PropTypes.string,
    to: PropTypes.string.isRequired
}