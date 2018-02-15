import { SUCCESS_GET_PLAYLISTS, CLEAR_PLAYLISTS, SUCCESS_PLAYLIST_TRACKS, CLEAR_PLAYLIST_TRACKS } from '../actions/actionTypes';

const defaultState = {
    playlists: [],
    tracks: []
};

const playlist = (state = defaultState, action) => {
    switch(action.type) {
        case SUCCESS_GET_PLAYLISTS:
            return {
                ...state,
                playlists: state.playlists.concat(action.playlists)
            };
        case CLEAR_PLAYLISTS:
            return {
                ...state,
                playlists: defaultState.playlists
            };
        case SUCCESS_PLAYLIST_TRACKS:
            return {
                ...state,
                tracks: state.tracks.concat(action.tracks)
            };
        case CLEAR_PLAYLIST_TRACKS:
            return {
                ...state,
                tracks: defaultState.tracks
            };
        default:
            return state;
    }
};

export default playlist;