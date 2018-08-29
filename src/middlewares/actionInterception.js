import {fetchZip} from '../action/fetchFromZip';
import {APPLICATION_BFF_URL} from '../constants/urlConstants'

export default (next,action,store)=>
{
let patt = /zipCode/g
if(action &&action.type=='@@redux-form/BLUR'&&action.meta &&patt.test(action.meta.field))
{
store.dispatch(fetchZip(`${APPLICATION_BFF_URL}/zipcode/${action.payload}`,action.meta))
return next(action)
}
}