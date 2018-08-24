import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import _get from 'lodash/get';
import Tooltip from 'material-ui/Tooltip';
import { SaveButtonV1, CancelButton } from '../../components/common/SaveButton.jsx';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import { GenericInput } from '../../components/common/TextValidation.jsx';

export default function AddressDetails(props = {}) {
    return (
        <div className="" >
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title>
                        {'Address Details'}
                    </Panel.Title>
                </Panel.Heading>

                <Panel.Body>
                    <Form horizontal>

                        <div className="row d-flex">
                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel} >
                                    Address<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="addressAddress" displayName="Enter Address"
                                        inputName="addressAddress" defaultValue={_get(props.containerState, 'addressAddress', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur} errorMessage={props.errors.addressAddress}
                                        error={props.errors} errorValue={props.errors.addressAddress}
                                        touched={props.touched} touchedValue={props.touched.addressAddress}
                                        className="text-input error"
                                    />
                                </Col>

                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel} >
                                    Zip Code<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="addressPostalCode"
                                        displayName="Enter Zipcode"
                                        type="number"
                                        inputName="addressPostalCode"
                                        defaultValue={_get(props.containerState, 'addressPostalCode', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.zipcodeBlurHandler}
                                        errorMessage={props.errors.addressPostalCode}
                                        error={props.errors}
                                        errorValue={props.errors.addressPostalCode}
                                        touched={props.touched}
                                        touchedValue={props.touched.addressPostalCode}
                                        className="text-input error" />
                                </Col>

                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 form-d" title="City depends on Zipcode">
                                <Col componentClass={ControlLabel} >
                                    City<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="addressCity"
                                        displayName="Enter City Name"
                                        inputName="addressCity"
                                        disabled={true}
                                        defaultValue={_get(props.containerState, 'addressCity', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur}
                                        errorMessage={props.errors.addressCity}
                                        error={props.errors}
                                        errorValue={props.errors.addressCity}
                                        touched={props.touched}
                                        touchedValue={props.touched.addressCity}
                                        className="text-input error"
                                    />
                                </Col>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 form-d clear-cross" title="State depends on Zipcode">
                                <Col componentClass={ControlLabel} >
                                    State<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="addressState"
                                        displayName="Enter State Name"
                                        inputName="addressState"
                                        disabled={true}
                                        defaultValue={_get(props.containerState, 'addressState', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur}
                                        errorMessage={props.errors.addressState}
                                        error={props.errors}
                                        errorValue={props.errors.addressState}
                                        touched={props.touched}
                                        touchedValue={props.touched.addressState}
                                        className="text-input error"
                                    />
                                </Col>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-6 form-d clear-cross" title="Country depends on Zipcode" >
                                <Col componentClass={ControlLabel} >
                                    Country<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="addressCountry"
                                        displayName="Select Country"
                                        inputName="addressCountry"
                                        disabled={true}
                                        defaultValue={_get(props.containerState, 'addressCountry', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur}
                                        errorMessage={props.errors.addressCountry}
                                        error={props.errors}
                                        errorValue={props.errors.addressCountry}
                                        touched={props.touched}
                                        touchedValue={props.touched.addressCountry}
                                        className="text-input error"
                                    />
                                </Col>

                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel} >
                                    Address Type
                                </Col>
                                <Col>
                                    <AutoComplete
                                        type="single"
                                        data={_get(props.addressLookup, 'data', [])}
                                        errorCheck={false}
                                        name="addressAddressType"
                                        errorMessage={props.errors.addressAddressType}
                                        error={props.errors} errorValue={props.errors.addressAddressType}
                                        defaultErrorCheck={props.showErrors}
                                        touched={props.touched} touchedValue={props.touched.addressAddressType}
                                        placeholder="Select Address Type"
                                        value={_get(props.containerState, 'addressAddressType', '')}
                                        changeHandler={(id) => {
                                            props.handleSelectChange(id, 'addressAddressType');
                                        }
                                        }


                                    />
                                </Col>
                            </div>
                        </div>
                        {
                            props.showAddressAddButton &&

                            <FormGroup style={{ padding: '1px' }} controlId="AddressFormFourthRow" >
                                <Col smOffset={1} sm={2}>
                                    <SaveButtonV1 btnText="Add New" onClickHandler={props.handleAddNewAddress} />
                                </Col>
                            </FormGroup>
                        }
                        {
                            props.showAddressDeleteButton &&

                            <FormGroup style={{ padding: '1px' }} controlId="AddressFormFifthRow" >
                                <Col smOffset={9} sm={2}>
                                    <CancelButton btnText="Delete" onClickHandler={props.handleDeleteAddress} />
                                </Col>
                            </FormGroup>
                        }
                    </Form>
                </Panel.Body>
            </Panel>
        </div>
    );
}
