import {fetchZip} from '../action/fetchFromZip';
import {uploadVoidCheck} from '../action/uploadVoidCheck'
import {APPLICATION_BFF_URL} from '../constants/urlConstants'

export default (next,action,store)=>
{
let patt = /zipCode/g
if(action &&action.type=='@@redux-form/BLUR'&&action.meta &&patt.test(action.meta.field))
{
store.dispatch(fetchZip(`${APPLICATION_BFF_URL}/zipcode/${action.payload}`,action.meta))
return next(action)
}
if(action &&action.type=='@@redux-form/CHANGE'&&action.meta &&action.meta.field=="bankingDetailInfo.uploadVoidCheck")
{
let formData = new FormData();
formData.append('file',action.payload[0])
formData.append('mediaType','customer')
formData.append('mediaTypeId','1234567')
store.dispatch(uploadVoidCheck(`${APPLICATION_BFF_URL}/customer/fileupload`,formData,'fileUpload'))
return next(action)
}

}