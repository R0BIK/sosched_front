import PropTypes from 'prop-types';

import './InputBox.css'

export default function InputBox({ name, placeholder, type, autoComplete, onChange, value, onBlur, errorText, ref, onKeyDown, onClick }) {


    return (
      <div className="InputBox">
          <input
              className='input'
              id={ name }
              name={ name }
              type={ type }
              autoComplete={ autoComplete }
              placeholder=""
              value={ value }
              onChange={ onChange }
              onBlur={ onBlur }
              ref={ ref }
              onKeyDown={ onKeyDown }
          required />
          <label className='label' htmlFor={ autoComplete } >{ placeholder }</label>
          <span className="underline"/>
          <p className="errorText">{ errorText }</p>
          <button className="clearInput" tabIndex={ -1 } onClick={ onClick }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2200 2200">
                  <path d="M2143 57c-76-76-199.24-76-275.24 0L1100 824.76 332.24 57C256.24-19 133-19 57 57c-76 76.01-76 199.24 0 275.24L824.76 1100 57 1867.75c-76 76.01-76 199.23 0 275.24 38.01 38.01 87.8 57 137.62 57s99.62-19.01 137.62-57L1100 1375.23l767.76 767.76c38 38 87.81 57 137.62 57s99.62-19 137.62-57c76-76.01 76-199.23 0-275.24l-767.76-767.76L2143 332.23c76-76 76-199.23 0-275.24Z"/>
              </svg>
          </button>
      </div>
    )
}

InputBox.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    ref: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};