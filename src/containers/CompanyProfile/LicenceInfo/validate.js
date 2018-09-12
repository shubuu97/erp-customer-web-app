import * as yup from 'yup';
import expand from 'keypather/expand';
import _get from 'lodash/get'
var contact = yup.object().shape({
    contact: yup.string().required()
});
var email = yup.object().shape({
    email: yup.string().email().required()
});

let licenInfoSchema  = yup.object().shape({
    licenseType: yup.string().required(),
    category: yup.string().required(),
    companyAddressInfo: yup.object().shape({
        companyAddress: yup.string().required(),
        zipCode: yup.number().min(3).required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required()
    }),
    organizationInfo:yup.object().shape({
        name:yup.string().required(),
        address:yup.string().required(),
        zipCode: yup.number().min(3).required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required()

    }),
    contactNumbers: yup.array(contact),
    emailAddresses: yup.array(email)

})
var optionalLicenInfoSchema = yup.object().shape({
    licenseType: yup.string().required(),
    category: yup.string().required(),
    companyAddressInfo: yup.object().shape({
        companyAddress: yup.string().required(),
        zipCode: yup.number().min(3).required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required()
    }),
    contactNumbers: yup.array(contact),
    emailAddresses: yup.array(email)

})
var schema = yup.object().shape(
    {

        companyInfo:yup.lazy(value=>{
           
           if(_get(value,'organizationInfo.address',null))
           return licenInfoSchema
           if(_get(value,'organizationInfo.city',null))
           return licenInfoSchema
           if(_get(value,'organizationInfo.country',null))
           return licenInfoSchema
           if(_get(value,'organizationInfo.name',null))
           return licenInfoSchema
           if(_get(value,'organizationInfo.state',null))
           return licenInfoSchema
           if(_get(value,'organizationInfo.zipCode',null))
           return licenInfoSchema
           
        
          return optionalLicenInfoSchema
      })  

    });
const asyncValidate = values => {

    
    return new Promise((resolve, reject) => {


        
        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate({companyInfo:values.companyInfo}, { abortEarly: false })
            .then(() => {
                //form is valid happy days!
                resolve();
            })
            .catch(errors => {
                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.

                let expandObj = {}
                errors.inner.forEach(error => {
                    let messageArr = error.message.split('.');
                    let errorMsg = messageArr[messageArr.length -1];
                    if(errorMsg=='')
                    errorMsg = messageArr[messageArr.length-2];
                    let result = errorMsg.replace( /([A-Z])/g, " $1" );
                    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                     expandObj[error.path] = finalResult;
                    })

                //redux form will now understand the errors that yup has thrown
                reject(expand(expandObj));
            })
    });

};


export default asyncValidate;