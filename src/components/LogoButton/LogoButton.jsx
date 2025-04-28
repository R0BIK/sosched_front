import './LogoButton.css';
import PropTypes from 'prop-types';
import { useKeyDownEnterHandler } from "../../hooks/KeyDownHooks.jsx";

export default function LogoButton ( { children, Logo } ) {
    const { handleEnterSubmit } = useKeyDownEnterHandler();

    return (
        <button className="logoButton"
        onKeyDown={ handleEnterSubmit }>
            { Logo }
            { children }
        </button>
    )
}

LogoButton.propTypes = {
    Logo: PropTypes.element.isRequired,
    children: PropTypes.string.isRequired
};