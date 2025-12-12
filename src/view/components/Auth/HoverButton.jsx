import PropTypes from 'prop-types';
import { useKeyDownEnterHandler } from "../../../hooks/useKeyDownHooks.js";

export default function HoverButton({ children, ref, type }) {
    const { handleEnterSubmit } = useKeyDownEnterHandler();

    return (
        <button
            ref={ref}
            type={type}
            onKeyDown={handleEnterSubmit}
            onMouseDown={(e) => e.preventDefault()}
            className="
                w-full rounded-lg border-none py-2
                bg-accent text-main-white text-xl font-bold font-noto
                transition-colors duration-300
                hover:bg-accent-on-hover
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-accent
                data-active:bg-accent-on-hover
            "
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