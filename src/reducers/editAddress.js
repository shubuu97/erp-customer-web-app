import * as CONSTANTS from '../constants/editAddress'
   const AddressData = (state = {
  data: {}
}, action) => {
    switch (action.type) {

        case CONSTANTS.EDIT_ADDRESS:
            
            return Object.assign({}, state, {
            
             data:action.data
            });

        default:
            return state
    }
}

export default AddressData