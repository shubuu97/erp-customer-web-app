import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import TextField from 'material-ui/TextField';

export default class DateInput extends React.Component {
  // handleDateValueChanged = (date) => {
  //     const dateValue = moment(date).format("MM-DD-YYYY");
  //     //this.forceUpdate();
  // }
  render() {
    const {
      inputName,
      defaultValue,
      disabled,
      onChange,
      onBlur,
      defaultErrorCheck = false,
      classes,
      theme,
      organisations,
      error,
      className,
      errorCheck = false,
      errorValue,
      errorMessage,
      touched,
      touchedValue,
      blurHandler,
    } = this.props;
    return (
            <FormControl className="custom-input" style={{ width: '100%', fontSize: '14px' }}
            >
                <TextField
                    id="date1"
                    type="date"
                    name={inputName}
                    value={defaultValue}
                    onChange={onChange}
                >
                </TextField>
                {/* <Datetime name={inputName}
                    onChange={this.handleDateValueChanged}
                    defaultValue={defaultValue}
                    dateFormat="MM-DD-YYYY"
                    timeFormat={false}
                    closeOnSelect={true}
                     /> */}
                {errorCheck && error && errorValue && (defaultErrorCheck || (touched && touchedValue)) && (
                    <div className={className}>
                        <FormHelperText >
                            {errorMessage}
                        </FormHelperText>
                    </div>
                )}
            </FormControl>
    );
  }
}
