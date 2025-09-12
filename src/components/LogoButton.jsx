import PropTypes from "prop-types";
import { useKeyDownEnterHandler } from "../hooks/KeyDownHooks.jsx";

export default function LogoButton({ children, Logo }) {
    const { handleEnterSubmit } = useKeyDownEnterHandler();

    return (
        <button
            onKeyDown={handleEnterSubmit}
            className="
        relative flex items-center justify-center w-full h-[50px]
        rounded-[10px] border-0 bg-transparent
        text-mainBlack text-[20px] font-semibold
        outline outline-2 outline-secondText
        transition duration-300 ease-in-out
        px-10
        hover:shadow-custom hover:outline-none
        focus:shadow-custom focus:outline-none
        active:bg-secondText
        [&.isActive]:bg-secondText
      "
        >
            {/* Иконка слева, фиксированная позиция */}
            <div className="absolute left-[15px] flex items-center h-[30px] w-[30px]">
                {Logo}
            </div>

            {/* Текст по центру */}
            {children}
        </button>
    );
}

LogoButton.propTypes = {
    Logo: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
};