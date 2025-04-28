import './HoverButton.css'
import PropTypes from 'prop-types'
import { useKeyDownEnterHandler } from "../../hooks/KeyDownHooks.jsx";

export default function HoverButton({ children, ref, type, style }) {
    const { handleEnterSubmit }  = useKeyDownEnterHandler();

    return (
      <button
          className="hoverButton"
          ref={ ref }
          type = { type }
          onKeyDown={ handleEnterSubmit }
          onMouseDown={(e) => e.preventDefault()}
          style = { style }
      >
          { children }
      </button> )
}

HoverButton.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ref: PropTypes.object.isRequired,
    style: PropTypes.object,
};