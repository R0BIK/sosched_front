import './HoverButton.css'
import PropTypes from 'prop-types'

export default function HoverButton({ children, ref, type }) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            document.activeElement.blur();
            ref.current?.classList.add('isActive');
            setTimeout(() => {
                ref.current?.classList.remove('isActive');
                ref.current?.click();
            }, 250);
        }
    };

    return (
      <button
          className="hoverButton"
          ref={ ref }
          type = { type }
          onKeyDown={ handleKeyDown }
      >
          { children }
      </button> )
}

HoverButton.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ref: PropTypes.object.isRequired,
};