import  * as yup from 'yup';
var schema = yup.object().shape({
    accountNo: yup.string().required(),
    invoiceCurrency: yup.string().email().required(),
    printNameOnCheck: yup.string().required(),
    currencyCode:yup.string().required(),
    bankName:yup.string().required(),
    bankBranch: yup.string().email().required(),
    routingNo: yup.string().required(),
    accountNo:yup.string().required(),
    bankBranch:yup.string().required(),
    bankNumber:yup.string().required(),
    accountStatus:yup.string().required(),


  });
const asyncValidate = values => {


    return new Promise((resolve, reject) => {

        console.log(values)

        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, {abortEarly: false})
            .then(() => {
                //form is valid happy days!
                resolve();
            })
            .catch(errors => {

                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.

                let reduxFormErrors = {};

                errors.inner.forEach(error => {
                    reduxFormErrors[error.path] = error.message;
                })

                //redux form will now understand the errors that yup has thrown
                reject(reduxFormErrors);

            })
    });

};

export default asyncValidate;