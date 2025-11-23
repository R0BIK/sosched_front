import PropTypes from 'prop-types';
import { useKeyDownEnterHandler } from "../../../hooks/KeyDownHooks.js";

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
                bg-accent text-main-white text-[20px] font-bold font-noto
                outline-none transition-all duration-300
                hover:bg-accent-on-hover
                focus:shadow-[0_0_25px_rgba(2,52,136,0.7)]
                active:bg-[rgba(2,52,136,0.8)]
                data-active:bg-[rgba(2,52,136,0.8)]
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