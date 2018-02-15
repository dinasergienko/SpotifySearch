import { combineReducers } from 'redux';
import auth from './auth';
import playlist from './playlist';
import currentTrack from './currentTrack';
import app from './app';
import search from './search';

const rootReducer = combineReducers({
    auth,
    playlist,
    currentTrack,
    app,
    search
});

export default rootReducer;