import  * as yup from 'yup';
import expand from 'keypather/expand'

var bankDetailsSchema = yup.object().shape({
    bankName:yup.string().required(),
    accountName:yup.string().required(),
    bankRoutingNumber: yup.string().required(),
    bankAccountNumber:yup.string().required(),
    branchName:yup.string().required(),
    bankNumber:yup.string().required(),
    accountStatus:yup.string().required(),
})
var schema = yup.object().shape(                        
    
    
    {bankingDetailInfo:yup.object().shape({
    accountNumber: yup.string().required(),
    paymentTerms:yup.string().required(),
    invoiceCurrencyCode: yup.string().required(),
    nameOnCheque: yup.string().required(),
    currencyCode:yup.string().required(),
    preferredPaymentMethods:yup.string().required(),
    bankDetails:yup.array(bankDetailsSchema)
    


  })
    }
);
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
            console.log(errors,"errors is here")
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