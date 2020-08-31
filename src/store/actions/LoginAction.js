import apiCallService from "../../api/apiCallService";
import { setUserData } from "./UserAction";
import history from "../../history.js";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_LOADING = "LOGIN_LOADING";

export function loginWithEmailAndPassword({ email, password }) {
    return dispatch => {
        dispatch({
            type: LOGIN_LOADING
        });

        apiCallService.loginWithEmailAndPassword(email, password)
        .then(user=> {
            dispatch(setUserData(user));
            if(user.current_plan) {
                // history.push({
                //     pathname: "/index.html#/find"
                // });
                apiCallService.setLocation("find");
            }
            else {
                // history.push({
                //     pathname: "/index.html#/plan"
                // });
                apiCallService.setLocation("plan");
            }
            
            window.location.reload();
            return dispatch({
                type: LOGIN_SUCCESS
            });
        })
        .catch(error => {
            return dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        });
    };
}