import * as USER_ACTIONS from '../constants/userConstants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/users/login', { email, password }, config);
        console.log(data, 'data');
        dispatch({
            type: USER_ACTIONS.USER_LOGIN_SUCCESS,
            payload: data
        });

        axios.defaults.headers.common['Authorization'] = data.token;
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_LOGIN_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: USER_ACTIONS.USER_LOGOUT
    });

    dispatch({
        type: ORDER_LIST_MY_RESET
    });

    dispatch({
        type: USER_ACTIONS.USER_DETAIL_RESET
    });

    dispatch({
        type: USER_ACTIONS.USER_LIST_RESET
    });

    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_ACTIONS.USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_ACTIONS.USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_REGISTER_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_DETAIL_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_ACTIONS.USER_DETAIL_SUCCESS,
            payload: data
        });

        if (id === 'profile') {
            dispatch({
                type: USER_ACTIONS.USER_LOGIN_SUCCESS,
                payload: data
            });
        }

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_DETAIL_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_UPDATE_PROFILE_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_ACTIONS.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_UPDATE_PROFILE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_LIST_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: USER_ACTIONS.USER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const deleteUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_DELETE_BY_ID_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch({
            type: USER_ACTIONS.USER_DELETE_BY_ID_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_DELETE_BY_ID_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACTIONS.USER_UPDATE_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/users/${user._id}`, user, config);

        dispatch({
            type: USER_ACTIONS.USER_UPDATE_SUCCESS
        });

        dispatch({
            type: USER_ACTIONS.USER_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_ACTIONS.USER_UPDATE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
