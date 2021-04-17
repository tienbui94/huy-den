import * as USER_ACTIONS from '../constants/userConstants';

export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_ACTIONS.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_ACTIONS.USER_LOGIN_FAILED:
            return { loading: false, error: action.payload };
        case USER_ACTIONS.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_ACTIONS.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_ACTIONS.USER_REGISTER_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_DETAIL_REQUEST:
            return { ...state, loading: true };
        case USER_ACTIONS.USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_ACTIONS.USER_DETAIL_FAILED:
            return { loading: false, error: action.payload };
        case USER_ACTIONS.USER_DETAIL_RESET:
            return { user: {} };
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_ACTIONS.USER_UPDATE_PROFILE_FAILED:
            return { loading: false, error: action.payload };
        case USER_ACTIONS.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_LIST_REQUEST:
            return { loading: true };
        case USER_ACTIONS.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_ACTIONS.USER_LIST_FAILED:
            return { loading: false, error: action.payload };
        case USER_ACTIONS.USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_DELETE_BY_ID_REQUEST:
            return { loading: true };
        case USER_ACTIONS.USER_DELETE_BY_ID_SUCCESS:
            return { loading: false, success: true };
        case USER_ACTIONS.USER_DELETE_BY_ID_FAILED:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_ACTIONS.USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_ACTIONS.USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_ACTIONS.USER_UPDATE_FAILED:
            return { loading: false, error: action.payload };
        case USER_ACTIONS.USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};
