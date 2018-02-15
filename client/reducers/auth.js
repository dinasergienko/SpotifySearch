import {LOGOUT, SUCCESS_CURRENT_USER, FAILED_CURRENT_USER} from '../actions/actionTypes';

const defaultState = {
    isLoaded: false,
    isAuthorized: false,
    userId: '',
    type: ''
};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state,
                isAuthorized: defaultState.isAuthorized,
                userId: defaultState.userId
            };
        case SUCCESS_CURRENT_USER:
            return { ...state,
                isLoaded: true,
                isAuthorized: true,
                userId: action.userId,
                type: action.userType
            };
        case FAILED_CURRENT_USER:
            return {
                ...state,
                isLoaded: true
            };
        default:
            return state;
    }
};

export default auth;
