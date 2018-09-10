import React,{Component} from 'react';
import {connect} from 'react-redux';
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import { postBasicInfoData } from '../../../action/basicInfoActions';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
import _get from 'lodash/get';
import AccountView from '../../CustomerProfile/ProfileStaticView/accountView';
import BankView from '../../CustomerProfile/ProfileStaticView/bankView'
import Button from '@material-ui/core/Button'
import profileSideBar from '../../../components/profileSideBarHoc';
import {fetchLicenseDetailsData} from '../../../action/getLicenseInfo';
import { fetchSiteDetailsData } from '../../../action/getSiteInfo';


class ProfileView extends Component
{
componentDidMount()
{
    this.props.dispatch(postBasicInfoData({  email: localStorage.getItem('email')  }, '', `${APPLICATION_BFF_URL}/user/logindata`))

    this.props.dispatch(fetchBankingDetailsData(`${this.props.urlLinks.getBankingDetailsInfo.href}?_id=${localStorage.getItem("id")}`));

     this.props.dispatch(fetchLicenseDetailsData(`${this.props.urlLinks.getCompanyInfo.href}?_id=${localStorage.getItem("id")}`));
    this.props.dispatch(fetchSiteDetailsData(`${this.props.urlLinks.getSiteInfo.href}?_id=${localStorage.getItem("id")}`));

}
routeChanger(tab)
{

    if(localStorage.getItem('role')=='customer')
    {
    this.props.history.push(`/customerProfile?tab=${tab}`)
    }
    else
    {

    if(tab==1)
    tab=3
    this.props.history.push(`/companyProfile?tab=${tab}`)
    }

}
    render()
    {
        return(
            <div>
            <div>
            <AccountView 
            addressInfo={_get(this.props.accountDetails,'addressInfo','')}
            contactNumber={_get(this.props.accountDetails,'contactNumber','')}
            email={_get(this.props.accountDetails,'email','')}
            firstName={_get(this.props.accountDetails,'firstName','')}
            lastName={_get(this.props.accountDetails,'lastName','')}
            licenseNumber={_get(this.props.accountDetails,'licenseNumber','')}

            
            accountDetails={this.props.accountDetails}/>
            <div><Button color='primary' variant="contained" onClick={()=>this.routeChanger(0)}>Edit</Button></div>
            </div>
            <div style={{marginTop:'10px'}}>


            <BankView
            accountNumber={_get(this.props.bankingDetails,'accountNumber','')}
            bankingDetails={this.props.bankingDetails}
            creditLimit={_get(this.props.bankingDetails,'creditLimit','')}
            bankDetails={_get(this.props.bankingDetails,'bankDetails','')}
            currencyCode={_get(this.props.bankingDetails,'currencyCode','')}
            invoiceCurrencyCode={_get(this.props.bankingDetails,'invoiceCurrencyCode','')}
            nameOnCheque={_get(this.props.bankingDetails,'nameOnCheque','')}
            paymentTerms={_get(this.props.bankingDetails,'paymentTerms','')}
            preferredPaymentMethods={_get(this.props.bankingDetails,'preferredPaymentMethods','')}/>
            </div>
            <div><Button color='primary' variant="contained"  onClick={()=>this.routeChanger(1)}>Edit</Button></div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    let urlLinks = _get(state,'urlLinks.formSearchData._links',{});
    let bankingDetails = _get(state,'bankDetailsData.lookUpData.data.bankingDetailInfo',{});
    let accountDetails = _get(state,'basicInfodata.basicInfoData',{})

    return {urlLinks,bankingDetails,accountDetails}
}

export default connect(mapStateToProps)(profileSideBar(ProfileView));