import { LOGOUT, GET_CURRENT_USER, SUCCESS_CURRENT_USER,FAILED_CURRENT_USER } from './actionTypes';
import { SPOTIFY_METHODS } from '../common/constants';
import { addError } from './appActionCreators';

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const getCurrentUser = () => {
    return {
        type: GET_CURRENT_USER,
        spotifyAction: {
            method: SPOTIFY_METHODS.GET_ME,
            onSuccess: (res, dispatch) => dispatch(setCurrentUserData(res.id, res.product)),
            onFailure: (err, dispatch) => dispatch(addError())
        }
    }
};

const setCurrentUserData = (userId, type) => {
    return {
        type: SUCCESS_CURRENT_USER,
        userId: userId,
        userType: type
    }
};

const failGetCurrentUserData = () => {
    return {
        type: FAILED_CURRENT_USER
    }
};