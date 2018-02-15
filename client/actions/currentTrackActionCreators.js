import { GET_CURRENT_TRACK, SUCCESS_CURRENT_TRACK, SET_PREVIOUS_TRACK, SET_NEXT_TRACK } from './actionTypes';
import { SPOTIFY_METHODS } from '../common/constants';
import { addError } from './appActionCreators';

export const getCurrentTrack = () => {
    return {
        type: GET_CURRENT_TRACK,
        spotifyAction:{
            method: SPOTIFY_METHODS.GET_CURRENT_TRACK,
            onSuccess: (res,dispatch) => {dispatch(setCurrentTrackData({
                id: res.item.id,
                artist: res.item.artists.map((artist)=>{
                    return artist.name
                }).join(", "),
                album: res.item.album.name,
                song: res.item.name,
                image: res.item.album.images[1] && res.item.album.images[1].url,
                preview: res.item.preview_url,
                isPlaying: res.is_playing
            }))},
            onFailure: (err,dispatch) => dispatch(addError())
        }
    }
};

export const selectPreviousTrack = () => {
    return {
        type: SET_PREVIOUS_TRACK,
        spotifyAction: {
            method: SPOTIFY_METHODS.SET_PREVIOUS_TRACK,
            options: [{}],
            onSuccess: (res, dispatch) => dispatch(getCurrentTrack()),
            onFailure: (err,dispatch) => dispatch(addError())
        }
    }
};

export const selectNextTrack = () => {
    return {
        type: SET_NEXT_TRACK,
        spotifyAction: {
            method: SPOTIFY_METHODS.SET_NEXT_TRACK,
            onSuccess: (res, dispatch) => dispatch(getCurrentTrack()),
            onFailure: (err,dispatch) => dispatch(addError())
        }
    }
};

const setCurrentTrackData = currentTrack =>{
    return {
        type: SUCCESS_CURRENT_TRACK,
        currentTrack: currentTrack
    }
};