import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import spotifyMiddleware from './middlewares/spotifyMiddleware';

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
        isAuthorized: false,
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