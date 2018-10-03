import * as ADDRESS_CONSTANT from '../../src/constants/editAddress';

export const editAddress = (Address) => dispatch => {
    dispatch({
        type:ADDRESS_CONSTANT.EDIT_ADDRESS,
        data: Address
    })
}