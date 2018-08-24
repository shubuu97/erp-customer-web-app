import React from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import _get from 'lodash/get';
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import { SaveButtonV1, CancelButton } from '../../components/common/SaveButton.jsx';
import AddressDetails from '../../components/common/AddressDetails.jsx';
import { GenericInput } from '../../components/common/TextValidation.jsx';


export default function ContactDetails(props = {}) {
  return (

        <div className="contact-panel" >
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title>
                        {'Contact Details'}
                    </Panel.Title>
                </Panel.Heading>

                <Panel.Body>
                    <Form horizontal>
                        <div className="row d-flex">
                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel}>
                                    Title
                                    </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="contactTitle" displayName="Enter Title"
                                        inputName="contactTitle" defaultValue={_get(props.containerState, 'contactTitle', '')}
                                        onChange={props.handleInputChange}
                                        errorCheck={false}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur} errorMessage={props.errors.contactTitle}
                                        error={props.errors} errorValue={props.errors.contactTitle}
                                        touched={props.touched} touchedValue={props.touched.contactTitle}
                                        className="text-input error" />
                                </Col>

                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel}>
                                    Name<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="contactName" displayName="Enter Name"
                                        inputName="contactName" defaultValue={_get(props.containerState, 'contactName', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur} errorMessage={props.errors.contactName}
                                        error={props.errors} errorValue={props.errors.contactName}
                                        touched={props.touched} touchedValue={props.touched.contactName}
                                        className="text-input error" />
                                </Col>

                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel}>
                                    Email<em>*</em>
                                </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="contactEmail" displayName="Enter Email"
                                        inputName="contactEmail" defaultValue={_get(props.containerState, 'contactEmail', '')}
                                        onChange={props.handleInputChange}
                                        defaultErrorCheck={props.showErrors}
                                        onBlur={props.handleBlur} errorMessage={props.errors.contactEmail}
                                        error={props.errors} errorValue={props.errors.contactEmail}
                                        touched={props.touched} touchedValue={props.touched.contactEmail}
                                        className="text-input error" />

                                </Col>

                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel}>
                                    Job Title
                                    </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="contactJobTitle" displayName="Enter Title"
                                        inputName="contactJobTitle" defaultValue={_get(props.containerState, 'contactJobTitle', '')}
                                        onChange={props.handleInputChange}
                                        errorCheck={false}
                                        onBlur={props.handleBlur} errorMessage={props.errors.contactJobTitle}
                                        error={props.errors} errorValue={props.errors.contactJobTitle}
                                        touched={props.touched} touchedValue={props.touched.contactJobTitle}
                                        className="text-input error" />

                                </Col>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-6 form-d">
                                <Col componentClass={ControlLabel}>
                                    Phone Number
                                    </Col>
                                <Col>
                                    <GenericInput
                                        htmlFor="contactPhoneNumber" displayName="Enter Phone Number" type="number"
                                        inputName="contactPhoneNumber" defaultValue={_get(props.containerState, 'contactPhoneNumber', '')}
                                        onChange={props.handleInputChange}
                                        errorCheck={false}
                                        onBlur={props.handleBlur} errorMessage={props.errors.contactPhoneNumber}
                                        error={props.errors} errorValue={props.errors.contactPhoneNumber}
                                        touched={props.touched} touchedValue={props.touched.contactPhoneNumber}
                                        className="text-input error" />

                                </Col>

                            </div>
                        </div>
                        {
                            props.showContactAddress ?

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
                                                                htmlFor="contactAddress" displayName="Enter Address"
                                                                inputName="contactAddress" defaultValue={_get(props.containerState, 'contactAddress', '')}
                                                                onChange={props.handleInputChange}
                                                                defaultErrorCheck={props.showErrors}
                                                                onBlur={props.handleBlur} errorMessage={props.errors.contactAddress}
                                                                error={props.errors} errorValue={props.errors.contactAddress}
                                                                touched={props.touched} touchedValue={props.touched.contactAddress}
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
                                                                htmlFor="contactPostalCode" displayName="Zip Code" type="number"
                                                                inputName="contactPostalCode" defaultValue={_get(props.containerState, 'contactPostalCode', '')}
                                                                onChange={props.handleInputChange}
                                                                defaultErrorCheck={props.showErrors}
                                                                onBlur={props.contactZipcodeBlurHandler} errorMessage={props.errors.contactPostalCode}
                                                                error={props.errors} errorValue={props.errors.contactPostalCode}
                                                                touched={props.touched} touchedValue={props.touched.contactPostalCode}
                                                                className="text-input error" />
                                                        </Col>

                                                    </div>

                                                    <div className="col-lg-3 col-md-4 col-sm-6 form-d" title="City depends on Zipcode">
                                                        <Col componentClass={ControlLabel} >
                                                            City<em>*</em>
                                                        </Col>
                                                        <Col>
                                                            <GenericInput
                                                                htmlFor="contactCity"
                                                                displayName="Enter City Name"
                                                                inputName="contactCity"
                                                                disabled={true}
                                                                defaultValue={_get(props.containerState, 'contactCity', '')}
                                                                onChange={props.handleInputChange}
                                                                defaultErrorCheck={props.showErrors}
                                                                onBlur={props.handleBlur}
                                                                errorMessage={props.errors.contactCity}
                                                                error={props.errors}
                                                                errorValue={props.errors.contactCity}
                                                                touched={props.touched}
                                                                touchedValue={props.touched.contactCity}
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
                                                                htmlFor="contactState"
                                                                displayName="Enter State Name"
                                                                inputName="contactState"
                                                                disabled={true}
                                                                defaultValue={_get(props.containerState, 'contactState', '')}
                                                                onChange={props.handleInputChange}
                                                                defaultErrorCheck={props.showErrors}
                                                                onBlur={props.handleBlur}
                                                                errorMessage={props.errors.contactState}
                                                                error={props.errors}
                                                                errorValue={props.errors.contactState}
                                                                touched={props.touched}
                                                                touchedValue={props.touched.contactState}
                                                                className="text-input error"
                                                            />
                                                        </Col>
                                                    </div>

                                                    <div className="col-lg-3 col-md-4 col-sm-6 form-d clear-cross" title="County depends on Zipcode">
                                                        <Col componentClass={ControlLabel} >
                                                            Country<em>*</em>
                                                        </Col>
                                                        <Col>
                                                            <GenericInput
                                                                htmlFor="contactCountry"
                                                                displayName="Enter Country"
                                                                inputName="contactCountry"
                                                                disabled={true}
                                                                defaultValue={_get(props.containerState, 'contactCountry', '')}
                                                                onChange={props.handleInputChange}
                                                                defaultErrorCheck={props.showErrors}
                                                                onBlur={props.handleBlur}
                                                                errorMessage={props.errors.contactCountry}
                                                                error={props.errors}
                                                                errorValue={props.errors.contactCountry}
                                                                touched={props.touched}
                                                                touchedValue={props.touched.contactCountry}
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
                                                                name="contactAddressType"
                                                                errorMessage={props.errors.contactAddressType}
                                                                error={props.errors} errorValue={props.errors.contactAddressType}
                                                                defaultErrorCheck={props.showErrors}
                                                                touched={props.touched} touchedValue={props.touched.contactAddressType}
                                                                placeholder="Select Address Type"
                                                                value={_get(props.containerState, 'contactAddressType', '')}
                                                                changeHandler={(id) => {
                                                                    props.handleSelectChange(id, 'contactAddressType');
                                                                }
                                                                }
                                                            />
                                                        </Col>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Panel.Body>
                                    </Panel>
                                </div>
                                : ''
                        }
                        {props.showContactAddressValidation ?
                            (props.addressFormWithValidation) : ''}
                        {
                            props.showContactAddButton &&
                            <FormGroup style={{ padding: '1px' }} controlId="ContactFormFourthRow" >
                                <Col smOffset={1} sm={2}>
                                    <SaveButtonV1 btnText="Add New" onClickHandler={props.handleAddNewContact} />
                                </Col>
                            </FormGroup>
                        }
                        {
                            props.showContactDeleteButton &&
                            <FormGroup style={{ padding: '1px' }} controlId="ContactFormFifthRow" >
                                <Col smOffset={9} sm={2}>
                                    <CancelButton btnText="Delete" onClickHandler={props.handleDeleteContact} />
                                </Col>
                            </FormGroup>
                        }
                    </Form>
                </Panel.Body>
            </Panel>
        </div>
  );
}

