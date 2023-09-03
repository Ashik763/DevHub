import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER } from "../actions/types";
const initialState = {
    isAuthenticated:false,
    user:{}
};

export default function authReducer(state = initialState, action){
    // console.log(action.type);
    switch(action.type){
        case SET_CURRENT_USER :
            return {
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                user:action.payload
            }
       
        default:
            return state;
    }
}