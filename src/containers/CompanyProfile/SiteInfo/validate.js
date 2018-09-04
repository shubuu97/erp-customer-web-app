import  * as yup from 'yup';
import expand from 'keypather/expand'
var address=yup.object().shape({
    siteAddress:yup.string().required(),
    contactNumber:yup.number().required(),
    email:yup.string().email().required(),
    city:yup.string().required(),
    country:yup.string().required(),
    state:yup.string().required(),
    zipCode:yup.number().required().min(4),

    
})
var license= yup.object().shape({
    licenseNumber:yup.string().required()
})
var siteInfo= yup.object().shape({
    licenseType:yup.string().required(),
    siteLicense:yup.array(license),
    addressInfo:yup.array(address)

})
var schema = yup.object().shape({ siteInfo: yup.array(siteInfo)
});
const asyncValidate = values => {

    return new Promise((resolve, reject) => {

        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, {abortEarly: false})
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