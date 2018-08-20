import React from 'react';
import Input from 'material-ui/Input/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

// @TODO: check if button disabling can be achieved better UX
export function GenericInput({
  validateForm,
  ariaDescribedBy, htmlFor, displayName, inputName, defaultValue, disabled, onChange, value, formikErrorCheck,
  onBlur, errorMessage, error, errorValue, className, touched, touchedValue, errorCheck = true, type = 'text', defaultErrorCheck = false,
}) {
  
  let newVal = defaultValue || value;

  if (defaultValue === "") {
    newVal = defaultValue;
  }
  return (
    <FormControl className="custom-input" style={{ width: '100%', fontSize: '14px' }}>
      {/* <InputLabel htmlFor={htmlFor}>{displayName}</InputLabel> */}
      <Input name={inputName} value={newVal} type={type}
        disabled={disabled}
        placeholder={displayName}
        onChange={onChange}
        onBlur={onBlur} />
      {errorCheck && error && errorValue && (defaultErrorCheck || (touched && touchedValue)) && (
        <div className={className}><FormHelperText >
          {errorMessage}
        </FormHelperText></div>
      )}
      {formikErrorCheck  && (touched || validateForm) && error && (
        <div className={className || "text-input error"}><FormHelperText >
          {error}
        </FormHelperText></div>
      )}
    </FormControl>
  );
}
