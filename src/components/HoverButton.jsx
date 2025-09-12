import PropTypes from 'prop-types';
import { useKeyDownEnterHandler } from "../hooks/KeyDownHooks.jsx";

export default function HoverButton({ children, ref, type }) {
    const { handleEnterSubmit } = useKeyDownEnterHandler();

    return (
        <button
            ref={ref}
            type={type}
            onKeyDown={handleEnterSubmit}
            onMouseDown={(e) => e.preventDefault()}
            className={`
                w-full h-[50px] rounded-[10px] border-none
                bg-accentColor text-mainWhite text-[20px] font-bold
                outline-none transition-all duration-300
                hover:shadow-[0_0_25px_rgba(2,52,136,0.7)]
                focus:shadow-[0_0_25px_rgba(2,52,136,0.7)]
                active:bg-[rgba(2,52,136,0.8)]
            `}
        >
            {children}
        </button>
    )
}

HoverButton.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ref: PropTypes.object.isRequired,
};