import  * as yup from 'yup';
import expand from 'keypather/expand';
import _get from 'lodash/get'

var schema = yup.object().shape({
    
    bankData: yup.object().shape({
        bankAccountNumber: yup.string().required(),
        bankRoutingNumber: yup.string().required(),
        accountName: yup.string().required(),
        accountType: yup.string().required()
    })
    

   


  });
const asyncValidate = values => {

console.log(values,"values is here")
    return new Promise((resolve, reject) => {


        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, {abortEarly: false})
            .then(() => {
                //form is valid happy days!
                resolve();
            })
            .catch(errors => {
            console.log(errors,"errors of redux form")

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