import { SUCCESS_SEARCH_TRACKS, CLEAR_SEARCH_RES } from '../actions/actionTypes';

const defaultState = {
    tracks: [],
    total: 0
};

const search = (state = defaultState, action) => {
    switch (action.type){
        case SUCCESS_SEARCH_TRACKS:
            return {
                ...state,
                tracks: action.add ? state.tracks.concat(action.tracks) : action.tracks,
                total: action.total
            };
        case CLEAR_SEARCH_RES:{
            return defaultState;
        }
        default:
            return state;
    }
};

export default search;