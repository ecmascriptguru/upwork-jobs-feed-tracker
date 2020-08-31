//import history from "history.js";
import apiCallService from "../../api/apiCallService";

export const SET_USER_DATA = "SET_USER_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const SET_DEFAULT_KEYWORD = "SET_DEFAULT_KEYWORD";
export const SET_KEYWORD_LIST = "SET_KEYWORD_LIST";
export const SET_CURRENT_JOB_LIST = "SET_CURRENT_JOB_LIST";

export function setUserData(user) {
    return dispatch => {
        dispatch({
            type: SET_USER_DATA,
            data: user
        });
    };
}

export function setDefaultKeyword(keyword) {
    return dispatch => {
        dispatch({
            type: SET_DEFAULT_KEYWORD,
            data: keyword,
        });
    }
}

export function setKeywordList(keywordList) {
    return dispatch => {
        dispatch({
            type: SET_KEYWORD_LIST,
            data: keywordList,
        });
    }
}

export function logoutUser() {
    return dispatch => {
        apiCallService.logout();

//        history.push({
//            pathname: "/login"
//        });

        return dispatch({
            type: USER_LOGGED_OUT
        });
    }
}

export function setCurrentJobList(jobList) {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_JOB_LIST,
            data: jobList,
        });
    }
}