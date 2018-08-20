import React from 'react';
import Input from 'material-ui/Input/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

export function GenericInputSlider({
  ariaDescribedBy, htmlFor, displayName, inputName, defaultValue, disabled, onChange,
  onBlur, errorMessage, error, errorValue, className, touched, touchedValue, errorCheck = true, type = 'text', defaultErrorCheck = false, inputValue,
}) {
  return (
        <FormControl className="custom-input" style={{ width: '100%', fontSize: '14px' }}>
            <Input name={inputName} defaultValue={defaultValue} type={type}
                value={inputValue}
                disabled={disabled}
                placeholder={displayName}
                onChange={onChange}
                onBlur={onBlur} />
            {errorCheck && error && errorValue && (defaultErrorCheck || (touched && touchedValue)) && (
                <div className={className}>
                    <br />
                    <FormHelperText >
                        {errorMessage}
                    </FormHelperText>
                </div>
            )}
        </FormControl>
  );
}
