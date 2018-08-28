import * as yup from 'yup';
import expand from 'keypather/expand'
var contact = yup.object().shape({
    contact: yup.string().required()
});
var email = yup.object().shape({
    email: yup.string().required()
});

var schema = yup.object().shape(
    {
        companyInfo: yup.object().shape({
            licenseType: yup.string().required(),
            category: yup.string().required(),
            companyAddressInfo: yup.object().shape({
                companyAddress: yup.string().required(),
                zipCode: yup.string().required(),
                country: yup.string().required(),
                state: yup.string().required(),
                city: yup.string().required()
            }),
            contactNumbers: yup.array(contact),
            emailAddresses: yup.array(email)



        })

    });
const asyncValidate = values => {

    
    return new Promise((resolve, reject) => {


        
        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, { abortEarly: false })
            .then(() => {
                //form is valid happy days!
                resolve();
            })
            .catch(errors => {
                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.

                let expandObj = {}
                errors.inner.forEach(error => {
                     expandObj[error.path] = error.message;
                    })

                //redux form will now understand the errors that yup has thrown
                console.log(expand(expandObj),"errors are here")
                reject(expand(expandObj));
            })
    });

};


export default asyncValidate;