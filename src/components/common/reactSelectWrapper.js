import React, { PropTypes } from 'react';
import Select from 'react-select';
import FormHelperText from '@material-ui/core/FormHelperText';



RFReactSelect.defaultProps = {
  multi: false,
  className: ""
};


export default function RFReactSelect({ input,meta:{touched,error,pristine},disabled, onSelect, options, multi, className,placeholder}) {
  const { name, value, onBlur, onChange, onFocus } = input;
  const transformedValue = transformValue(value, options, multi);
  console.log("In react select wrapper", onChange);
  return (

    [
    <label style={{    display: 'inline-block',
      maxWidth: '100%',
       marginB0ttom: '0px',
      fontWeight: '000',
      color: 'rgba(0, 0, 0, 0.38)'}}>{placeholder}</label>,
    <Select
    isDisabled={disabled}
      valueKey="value"
      name={name}
      placeholder={'Select'}
      value={transformedValue}
      multi={multi}
      options={options}
      onChange={multi
        ? multiChangeHandler(onChange)
        : singleChangeHandler(onChange,onSelect)
      }
      onBlur={() => onBlur(value)}
      onFocus={onFocus}
      className={className}
    />,
    <div>{touched && error && <div className="text-input error"><FormHelperText >
   {error}
  </FormHelperText>
  </div>}
  </div>
    ]

  );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func, onSelect) {
  console.log("singleChangeHandler", func);
  return function handleSingleChange(value) {
    console.log("handleSingleChange", value);
    func(value ? value.value : '');
    onSelect && onSelect(value ? value : '');
  };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
  return function handleMultiHandler(values) {
    func(values.map(value => value.value));
  };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select 
 * wants the value in the form { value: "grape", label: "Grape" }
 * 
 * * For multi select, Redux Form keeps the value as array of strings, while React Select 
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
  if (multi && typeof value === 'string') return [];

  const filteredOptions = options.filter(option => {
    return multi 
      ? value.indexOf(option.value) !== -1
      : option.value === value;
  });

  return multi ? filteredOptions : filteredOptions[0];
}