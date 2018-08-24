import  * as yup from 'yup';
import expand from 'keypather/expand'

var bankDetailsSchema = yup.object().shape({
    bankName:yup.string().required(),
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
                     expandObj[error.path] = error.message;
                    })

                //redux form will now understand the errors that yup has thrown
                reject(expand(expandObj));

            })
    });

};

export default asyncValidate;