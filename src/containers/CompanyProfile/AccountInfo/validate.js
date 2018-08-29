import  * as yup from 'yup';
var schema = yup.object().shape({
    companyName: yup.string().required(),
    firstName: yup.string().required(),
    middleName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    designation: yup.string().email().required(),
   


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
                    reduxFormErrors[error.path] = error.message;
                })

                //redux form will now understand the errors that yup has thrown
                reject(reduxFormErrors);

            })
    });

};

export default asyncValidate;