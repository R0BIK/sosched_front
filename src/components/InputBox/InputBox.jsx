import PropTypes from 'prop-types';

import './InputBox.css'
import {useSessionStorage} from "../../hooks/SignFormHooks.jsx";
import { CrossIcon, FalseIcon, TrueIcon } from "../../img/svg/Icons.jsx";
import {useRef} from "react";

export default function InputBox({ name, placeholder, type, autoComplete, onBlur, errorText, ref, onKeyDown, isSaving, formName }) {
    const containerRef = useRef(null);

    const { values, handleChange } = useSessionStorage(formName, name, isSaving);

    const onCLick = () => {
        handleChange({ target: {name, value: "" }})
        onBlur({ target: {name, value: ""} });
    }

    return (
      <div ref={ containerRef } className="InputBox" data-filled={ !!values } id={ name }>
          <input
              className='input'
              id={ name }
              name={ name }
              type={ type }
              autoComplete={ autoComplete }
              placeholder=""
              value={ values }
              onChange={ handleChange }
              onBlur={ onBlur }
              ref={ ref }
              onKeyDown={ onKeyDown }
              data-filled={ values !== '' }
          required />
          <label className='label' htmlFor={ autoComplete } >{ placeholder }</label>
          <span className="underline"/>
          <p className="errorText" data-filled={ !!errorText }>{ errorText }</p>
          <button type="button"
                  className="clearInput"
                  tabIndex={ -1 }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={ (e) => onCLick(e) }
          >
              <CrossIcon />
          </button>

          {(name === 'newPassword') && (
              <ul className="passwordCheck">
                  <li className={/[A-Z]/.test(values) ? 'valid' : ''}>{<TrueIcon className="trueIcon"/>}{<FalseIcon className="falseIcon"/>}At least one uppercase letter</li>
                  <li className={/[a-z]/.test(values) ? 'valid' : ''}>{<TrueIcon className="trueIcon"/>}{<FalseIcon className="falseIcon"/>}At least one lowercase letter</li>
                  <li className={/\d/.test(values) ? 'valid' : ''}>{<TrueIcon className="trueIcon"/>}{<FalseIcon className="falseIcon"/>}At least one number</li>
                  <li className={/.{8,}/.test(values) ? 'valid' : ''}>{<TrueIcon className="trueIcon"/>}{<FalseIcon className="falseIcon"/>}At least 8 characters</li>
              </ul>
          )}
      </div>
    )
}

InputBox.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    isSaving: PropTypes.bool.isRequired,
    ref: PropTypes.object.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};