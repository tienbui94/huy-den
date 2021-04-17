import * as ORDER_ACTIONS from '../constants/orderConstants';
import axios from 'axios';
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ACTIONS.ORDER_CREATE_REQUEST
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

        const { data } = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: ORDER_ACTIONS.ORDER_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_ACTIONS.ORDER_CREATE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ACTIONS.ORDER_DETAILS_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_ACTIONS.ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_ACTIONS.ORDER_DETAILS_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ACTIONS.ORDER_PAY_REQUEST
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

        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_ACTIONS.ORDER_PAY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_ACTIONS.ORDER_PAY_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ACTIONS.ORDER_LIST_MY_REQUEST
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

        const { data } = await axios.get(`/api/orders/my-orders`, config);

        dispatch({
            type: ORDER_ACTIONS.ORDER_LIST_MY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_ACTIONS.ORDER_LIST_MY_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ACTIONS.ORDER_LIST_REQUEST
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

        const { data } = await axios.get(`/api/orders`, config);

        dispatch({
            type: ORDER_ACTIONS.ORDER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_ACTIONS.ORDER_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const deliveredOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ACTIONS.ORDER_DELIVERED_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/orders/${order._id}/delivered`, {}, config);

        dispatch({
            type: ORDER_ACTIONS.ORDER_DELIVERED_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_ACTIONS.ORDER_DELIVERED_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
