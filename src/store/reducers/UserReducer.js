import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  USER_LOGGED_OUT,
  SET_DEFAULT_KEYWORD,
  SET_KEYWORD_LIST,
  SET_CURRENT_JOB_LIST
} from "../actions/UserAction";

const initialState = {};

const userReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data,
        }
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state
      };
    }
    case USER_LOGGED_OUT: {
      return state;
    }
    case SET_DEFAULT_KEYWORD: {
      return {
        ...state,
        user: {
          ...state.user,
          default_keyword: action.data,
        }
      }
    }
    case SET_CURRENT_JOB_LIST: {
      return {
        state,
        user: {
          ...state.user,
          jobs: action.data,
        }
      }
    }
    case SET_KEYWORD_LIST: {
      return {
        ...state,
        user: {
          ...state.user,
          keywords: action.data,
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
