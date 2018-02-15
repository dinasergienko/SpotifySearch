import Spotify from 'spotify-web-api-js';
import { AUTH } from '../common/constants';

const spotify = new Spotify();

const spotifyMiddleware = ( {dispatch}) => {
    return (next) => (action) => {
        if (action.spotifyAction){
            let { method, options } = action.spotifyAction;
            let accessToken = localStorage.getItem(AUTH.ACCESS_TOKEN);

            if (accessToken) {
                spotify.setAccessToken(accessToken);
            }

            spotify[method].apply(spotify, options)
                .then(res => {
                    action.spotifyAction.onSuccess(res, dispatch);
                })
                .catch(err => {
                    action.spotifyAction.onFailure(err, dispatch);
                })
        }

        return next(action);
    }
};

export default spotifyMiddleware;

