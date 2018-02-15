import { SUCCESS_CURRENT_TRACK } from '../actions/actionTypes';

const defaultState = {
   // currentTrack: {}
};

const currentTrack = (state = defaultState, action) => {
    switch (action.type){
        case SUCCESS_CURRENT_TRACK:
            return action.currentTrack;
            //};
        default:
            return state;
    }
};

export default currentTrack;