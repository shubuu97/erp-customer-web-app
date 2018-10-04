import  * as yup from 'yup';
var schema = yup.object().shape({
    fullName: yup.string().required(),
    address: yup.string().required(),
    // email: yup.string().email().required(),
    zipCode:yup.number().required(),
    contactNumber:yup.number().required(),
    city:yup.string().required(),
    state:yup.string().required(),
    country:yup.string().required(),
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

                let reduxFormErrors = {};

                errors.inner.forEach(error => {
                    let errorMsg = error.message
                    let result = errorMsg.replace( /([A-Z])/g, " $1" );
                    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                    reduxFormErrors[error.path] = finalResult;
                })

                //redux form will now understand the errors that yup has thrown
                reject(reduxFormErrors);

            })
    });

};

export default asyncValidate;