import  * as yup from 'yup';
import expand from 'keypather/expand';
import replace from 'lodash/replace';

var addressInfo = yup.object().shape({
    address: yup.string().required(),
    zipCode: yup.number().min(3).required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required()
})

var schema = yup.object().shape({
    contactNumber:yup.string().required(),
    licenseNumber: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    addressInfo: yup.array(addressInfo)
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
console.log(errors,"errors is here")
                let expandObj = {}
                errors.inner.forEach(error => {
                    let messageArr = error.message.split('.');
                    let errorMsg = messageArr[messageArr.length -1]
                    let result = errorMsg.replace( /([A-Z])/g, " $1" );
                    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                     finalResult = replace(finalResult, /Cheque/g, "Check");
                     expandObj[error.path] = finalResult;
                    })

                //redux form will now understand the errors that yup has thrown
                reject(expand(expandObj));

            })
    });

};

export default asyncValidate;