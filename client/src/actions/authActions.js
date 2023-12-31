import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, TEST_DISPATCH } from "./types";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const  registerUser =  (userData,history) => dispatch => {
    axios.post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
        // console.log(err.response.data)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
 
}

 

//Login - Get user Token

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login',userData)
    .then(res => {
        const {token} = res.data;
        // set token to local storage
        localStorage.setItem('jwtToken', token);
        //set token to Auth header;

        setAuthToken(token);
        //Decode token to get user data

        const decoded = jwt_decode(token);

        dispatch( setCurrentUser(decoded) );


    })
    .catch(err => dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
    }))
    
}

// set logged in user

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Log user out

export const logoutUser = () => dispatch=> {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));

}