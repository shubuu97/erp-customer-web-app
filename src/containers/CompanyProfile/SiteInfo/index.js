import SiteInfoComponent from '../../../components/CompanyProfile/SiteInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';
import asyncValidate from './validate.js'
import { postSiteData } from '../../../action/siteInfo';
import Button from '@material-ui/core/Button';
import { fetchSiteDetailsData } from '../../../action/getSiteInfo';
import {connect} from 'react-redux';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'

class SiteInfo extends Component
{

    // componentDidMount()
    // {
    
    //     this.props.dispatch(fetchSiteDetailsData(`${}/businesscustomer/siteinfo?_`));
    // }
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        businessCustomerId:localStorage.getItem('id')
    }
     this.props.dispatch(postSiteData(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/siteinfo`));
  
    }
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <SiteInfoComponent/>
            <Button variant="contained" type='submit' color='primary'>Save</Button>
            </form>
            </div>
        )
    }
}

SiteInfo=reduxForm({
    form:'SiteInfo',
    asyncValidate:asyncValidate
})(SiteInfo)

const mapStateToProps=(state)=>
{
    let initialValues = state.siteDetailsData.lookUpData.data;
    let isLoading = state.siteDetailsData.isFetching
    return {initialValues,isLoading}

}
      
export default connect(mapStateToProps)(withLoader(SiteInfo))