import { SET_TITLE, SET_PREVIEW_TRACK, CLEAR_PREVIEW_TRACK, OPEN_MODAL, CLOSE_MODAL, ADD_ERROR } from '../actions/actionTypes';

const defaultState = {
    title: '',
    previewTrack: {
        src: '',
        img: ''
    },
    isPreviewPopupOpen: false,
    isModalOpen: false,
    error: false
};

const app = (state = defaultState, action) => {
    switch(action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.title
            };
        case SET_PREVIEW_TRACK:
            return {
                ...state,
                isPreviewPopupOpen: true,
                previewTrack: action.previewTrack
            };
        case CLEAR_PREVIEW_TRACK:
            return {
                ...state,
                previewTrack: defaultState.previewTrack,
                isPreviewPopupOpen: defaultState.isPreviewPopupOpen
            };
        case OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: defaultState.isModalOpen
            };
        case ADD_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state;

    }
};

export default app;