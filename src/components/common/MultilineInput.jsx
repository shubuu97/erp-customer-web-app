import React from 'react';
import Input from 'material-ui/Input/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

export function GenericMultilineInput({
  ariaDescribedBy, htmlFor, displayName, inputName, defaultValue, disabled, onChange,
  onBlur, errorMessage, error, errorValue, className, touched, touchedValue, errorCheck = true,
}) {
  return (
        <FormControl style={{ width: '100%' }} className="custom-textarea">
            <Input name={inputName} value={defaultValue}
            multiline rowsMax="4"
            disabled={disabled}
            placeholder={displayName}
            onChange={onChange}
            onBlur={onBlur} />
            {errorCheck && error && errorValue && touched && touchedValue && (
            <div className={className}><FormHelperText >
            {errorMessage}
            </FormHelperText></div>
            )}
        </FormControl>
  );
}
