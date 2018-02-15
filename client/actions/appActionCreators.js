import { SET_TITLE, SET_PREVIEW_TRACK, CLEAR_PREVIEW_TRACK, PLAY_GLOBAL_TRACK, PAUSE_GLOBAL_TRACK, OPEN_MODAL, CLOSE_MODAL, ADD_ERROR } from './actionTypes';
import { SPOTIFY_METHODS } from '../common/constants';

export const addError = () => {
    return {
        type: ADD_ERROR
    }
};

export const setTitle = (title) => {
    return {
        type: SET_TITLE,
        title: title
    }
};

export const pauseGlobalTrack = () => {
    return {
        type: PAUSE_GLOBAL_TRACK,
        spotifyAction: {
            method: SPOTIFY_METHODS.PAUSE_GLOBAL_TRACK,
            options: [{}]
        }
    }
};

export const playGlobalTrack = (trackId) => {
    return {
        type: PLAY_GLOBAL_TRACK,
        spotifyAction: {
            method: SPOTIFY_METHODS.PLAY_GLOBAL_TRACK,
            options: [{
                uris: ['spotify:track:' + trackId]
            }]
        }
    }
};

export const setPreviewTrack = (previewUrl, image) => {
    return {
        type: SET_PREVIEW_TRACK,
        previewTrack: {
            image: image,
            previewUrl: previewUrl
        }
    }
};

export const clearPreviewTrack = () => {
    return {
        type: CLEAR_PREVIEW_TRACK
    }
};

export const openModal = () => {
    return {
        type: OPEN_MODAL
    }
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
};