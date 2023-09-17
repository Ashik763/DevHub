const initialState = {
    posts:[],
    post:{},
    loading:false
}

export default function postReducer(state=initialState,action) {
        switch(action.type) {
            case 'ADD_POST':
                return {
                    ...state,
                    posts:[...state.posts,action.payload]
                }

            default:
                return state;
        }
}   