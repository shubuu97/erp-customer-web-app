import React from 'react';
import Link from 'react-router-dom/Link';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import PropTypes from 'prop-types';
//import 'bootstrap/dist/css/bootstrap.css';
import { uiLinkObj, ADD_MODE, EDIT_MODE, VIEW_MODE } from '../../vars/commonVars';
import './Sidebar.css';
import _set from 'lodash/set';
import { SaveButtonV1, CancelButton } from '../../components/common/SaveButton.jsx';


function Sidebar({
  uiLinkArray = uiLinkObj, mode = EDIT_MODE, presentStepKey, supplierId, supplierVerifyTag = false, handleSupplierVerification,
}) {
  if (mode != 'ADD_MODE') {
    const path = `/suppliers/registration/basicinfo/${supplierId}`;
    _set(uiLinkArray[0], 'addOrEditLink', path);
  }
  return (
        <div className="supplier-tabs">
            {
                uiLinkArray && uiLinkArray.map((link, index) => {
                    const identifiers = {
                        active: false,
                        url: '',
                        enabled: true,
                    };

                    if (mode === 'ADD_MODE' && link.key !== 'basicInfo') {
                        identifiers.enabled = false;
                    }

                    if (!identifiers.enabled) {
                        return (
                            <ListGroupItem disabled>
                                {link.displayText}
                            </ListGroupItem>
                        );
                    }
                    return (
                        <div>
                        <ListGroupItem bsStyle={link.key === presentStepKey ? 'success' : ''}>
                            <Link to={link.addOrEditLink}>
                                {link.displayText}
                            </Link>
                        </ListGroupItem>
                        </div>
                    );
                })
        }
        <SaveButtonV1
            btnText="Verify & Submit"
            disabled={!supplierVerifyTag}
            onClickHandler={handleSupplierVerification}
        />
    </div>
  );
}

export default Sidebar;
