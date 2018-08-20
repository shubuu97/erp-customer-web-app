import React from 'react';
import Input from 'material-ui/Input/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

export function GenericInput({
  ariaDescribedBy, htmlFor, displayName, inputName, inputValue, defaultValue, disabled, onChange,
  onBlur, errorMessage, error, errorValue, className, touched, touchedValue, errorCheck = true, type = 'text', defaultErrorCheck = false,
}) {
  return (
        <FormControl className="custom-input" style={{ width: '100%', fontSize: '14px' }}>
            <Input name={inputName} defaultValue={defaultValue} type={type}
            value = {inputValue}
            disabled={disabled}
            placeholder={displayName}
            onChange={onChange}
            onBlur={onBlur} />
            {errorCheck && error && errorValue && (defaultErrorCheck || (touched && touchedValue)) && (
            <div className={className}><FormHelperText >
            {errorMessage}
            </FormHelperText></div>
            )}
        </FormControl>
  );
}
