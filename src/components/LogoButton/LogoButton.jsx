import './LogoButton.css';
import PropTypes from 'prop-types';

export default function LogoButton ( { children, logo } ) {
    return (
        <button className="logoButton">
            <img src={ logo } alt={ logo } />
            { children }
        </button>
    )
}

LogoButton.propTypes = {
    logo: PropTypes.string,
    children: PropTypes.string.isRequired
};