import PropTypes from "prop-types";
import { useKeyDownEnterHandler } from "../../../hooks/KeyDownHooks.js";

export default function LogoButton({ children, Logo }) {
    const { handleEnterSubmit } = useKeyDownEnterHandler();

    return (
        <button
            onKeyDown={handleEnterSubmit}
            className="
        relative flex items-center justify-center w-full h-[50px]
        rounded-[10px] border-0 bg-transparent
        text-main-black text-[20px] font-semibold
        outline-2 outline-second-text
        transition duration-300 ease-in-out
        px-10
        hover:shadow-custom hover:outline-none
        focus:shadow-custom focus:outline-none
        active:bg-second-text
        [&.isActive]:bg-second-text
      "
        >
            <div className="absolute left-[15px] flex items-center h-[30px] w-[30px]">
                {Logo}
            </div>

            {children}
        </button>
    );
}

LogoButton.propTypes = {
    Logo: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
};