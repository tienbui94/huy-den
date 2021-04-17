import * as PRODUCT_ACTIONS from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_ACTIONS.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            };
        case PRODUCT_ACTIONS.PRODUCT_LIST_FAILED:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productListDetailReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_ACTIONS.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_ACTIONS.PRODUCT_DETAILS_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_ACTIONS.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_ACTIONS.PRODUCT_DELETE_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_ACTIONS.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_ACTIONS.PRODUCT_CREATE_FAILED:
            return { loading: false, error: action.payload };
        case PRODUCT_ACTIONS.PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_ACTIONS.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_ACTIONS.PRODUCT_UPDATE_FAILED:
            return { loading: false, error: action.payload };
        case PRODUCT_ACTIONS.PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_FAILED:
            return { loading: false, error: action.payload };
        case PRODUCT_ACTIONS.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
