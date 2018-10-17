import  * as yup from 'yup';
import expand from 'keypather/expand';
import {get} from 'lodash';
var address=yup.object().shape({
    siteAddress:yup.string().required(),
    contactNumber:yup.number().typeError("Contact Number is a required field").required(),
    email:yup.string().email().required(),
    city:yup.string().required(),
    country:yup.string().required(),
    state:yup.string().required(),
    zipCode:yup.number().typeError("Zipcode is a required field").required().min(4),

    
})
var license= yup.object().shape({
    licenseNumber:yup.string().required()
})
var siteInfo= yup.object().shape({
    licenseType:yup.string().required(),
    siteLicense:yup.array(license),
    addressInfo:yup.array(address),
    siteName:yup.string().required(),

})
// var schema = yup.object().shape({ siteInfo: yup.array(siteInfo)
// });

var schema =  yup.object().shape({
    siteInfo:yup.lazy(values=>{
    
            let isExist = false;
            values.forEach((value)=>{
                if(get(value, 'siteName') || get(value, 'licenseType')) {
                    isExist = true;
                    return;
                }
                if(get(value, 'siteLicense')) {
                    value.siteLicense.forEach((siteLic)=>{
                        if(get(siteLic, 'licenseNumber')) {
                            isExist = true;
                            return;
                        }
                    })
                }
                if(get(value, 'addressInfo')) {
                    value.addressInfo.forEach((address)=>{
                        if(get(address, 'siteAddress') || get(address, 'contactNumber') || get(address, 'email') ||
                         get(address, 'city') || get(address, 'state') || get(address, 'country') || get(address, 'zipCode')) {
                            isExist = true;
                            return;
                        }
                    })

                }
            })

            
            if(!isExist)
            return yup.mixed().notRequired();
        
        return yup.array(siteInfo)
    })})



const asyncValidate = values => {
    console.log(values,"values is here")
    return new Promise((resolve, reject) => {

        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate({siteInfo:values.siteInfo}, {abortEarly: false})
            .then(() => {
                //form is valid happy days!
                resolve();
            })
            .catch(errors => {
                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.

                let expandObj = {}
                errors.inner.forEach(error => {
                    let messageArr = error.message.split('.');
                    let errorMsg = messageArr[messageArr.length -1]
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