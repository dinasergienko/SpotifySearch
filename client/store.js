import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import spotifyMiddleware from './middlewares/spotifyMiddleware';
import { AUTH } from './common/constants';

export const defaultState = {
    app: {
        title: '',
        previewTrack: {
            name: '',
            src: '',
            img: ''
        },
        isPreviewPopupOpen: false,
        isModalOpen: false,
        error: false
    },
    auth: {
        isLoaded: false,
        isAuthorized: localStorage.getItem(AUTH.ACCESS_TOKEN) != null,
        userId: '',
        type: ''
    },
    playlist: {
        playlists: [],
        tracks: [],
        chosenPlaylist: {}
    },
    currentTrack: { },
    search: {
        tracks: [],
        total: 0
    }
};

const store = createStore(
    rootReducer,
    defaultState,
    compose(applyMiddleware(spotifyMiddleware))
);

export default store;