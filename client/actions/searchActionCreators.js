import { SEARCH_TRACKS, SUCCESS_SEARCH_TRACKS, CLEAR_SEARCH_RES } from './actionTypes';
import { SPOTIFY_METHODS , OPTIONS} from '../common/constants';
import { addError } from './appActionCreators';

export const searchTracks = (query, offset, add) => {
    return {
        type: SEARCH_TRACKS,
        spotifyAction: {
            method: SPOTIFY_METHODS.SEARCH_TRACKS,
            options: [
                query,
                {
                    limit: OPTIONS.LIMIT,
                    offset: OPTIONS.LIMIT * offset
                }
            ],
            onSuccess: (res, dispatch) => dispatch(displaySearchedTracks(res.tracks.items.map((track) => {
                return {
                    artist: track.artists.map((artist)=>{
                        return artist.name
                    }).join(", "),
                    album: track.album.name,
                    song: track.name,
                    image: track.album.images[1] && track.album.images[1].url,
                    id: track.id,
                    preview: track.preview_url
                }}), res.tracks.total, add)),
            onFailure: (err,dispatch) => dispatch(addError())
        }
    }
};

export const clearTracks = () => {
    return {
        type: CLEAR_SEARCH_RES
    }
};

 const displaySearchedTracks = (tracks, total, add) => {
    return {
        type: SUCCESS_SEARCH_TRACKS,
        tracks: tracks,
        total: total,
        add: add
    }
 };