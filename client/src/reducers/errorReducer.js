import { GET_ERRORS } from "../actions/types";
const initialState = {

};

export default function errorReducer(state=initialState,action){
    console.log("from errorReducer");
    switch(action.type){
        case GET_ERRORS:
            return action.payload;

        default:
            return state;

    }
}