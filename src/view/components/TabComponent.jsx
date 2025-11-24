import PropTypes from "prop-types";

import InitialBadge from "./Badges/InitialBadge.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Lineicons} from "@lineiconshq/react-lineicons";

export default function TabComponent({ text, Icon, LineIcon, LineIconShape, initial, onClick, to, isActive : externalActive, className, LineIconSize }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    };

    const isActive = to
        ? location.pathname === to || location.pathname.startsWith(to + "/")
        : externalActive;

    const autoIcon = LineIconShape ? isActive ? LineIconShape.active : LineIconShape.default : LineIcon;

    return (
        <button
            data-active={isActive ? '' : undefined}
            data-initial={initial ? '' : undefined}
            onClick={handleClick}
            className={"flex items-center justify-between gap-4 text-main-black font-bold rounded-lg px-4 py-2 w-[250px] hover:bg-gray-200/50 data-active:not-data-initial:bg-gray-200/50 data-active:text-accent group relative " + className}>
            <div className="flex justify-center">
                {initial ? <InitialBadge text={initial} /> :
                    Icon ? <Icon className="size-4 fill-black/80  group-data-active:fill-accent" /> :
                    LineIcon ? <Lineicons icon={autoIcon} size={LineIconSize ? LineIconSize : 24}  /> :
                    null}
            </div>

            <p className="font-noto text-lg text-left flex-1 group-data-initial:font-medium">
                {text}
            </p>
        </button>
    )
}

TabComponent.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    LineIconSize: PropTypes.number,
    Icon: PropTypes.elementType,
    LineIcon: PropTypes.elementType,
    LineIconShape: PropTypes.shape({
        default: PropTypes.elementType,
        active: PropTypes.elementType,
    }),
    initial: PropTypes.string,
    onClick: PropTypes.func,
    to: PropTypes.string,
    isActive: PropTypes.bool,
}