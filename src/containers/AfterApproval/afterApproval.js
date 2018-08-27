import React, { Component } from 'react';
import { line1, line2, line3 } from '../../components/common/AfterApproval/afterApproval'

class AfterApproval extends Component {
    render() {
        return (<div>
            <div>{line1}</div>
            <div>{line2}</div>
            <div>{line3}</div>
        </div>
        )
    }
}
export default AfterApproval