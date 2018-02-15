import { GET_PLAYLISTS, SUCCESS_GET_PLAYLISTS, CLEAR_PLAYLISTS, GET_PLAYLIST_TRACKS, SUCCESS_PLAYLIST_TRACKS, CLEAR_PLAYLIST_TRACKS } from './actionTypes';
import { SPOTIFY_METHODS, OPTIONS } from '../common/constants';
import { addError } from './appActionCreators';

export const getPlaylists = (offset) => {
    return {
        type: GET_PLAYLISTS,
        spotifyAction: {
            method: SPOTIFY_METHODS.GET_USER_PLAYLISTS,
            options: [{
                limit: OPTIONS.LIMIT,
                offset: offset * OPTIONS.LIMIT
            }],
            onSuccess: (res, dispatch) => {
                dispatch(setPlaylists(res.items.map((playlist) => {
                    return {
                        id: playlist.id,
                        image: playlist.images[0] && playlist.images[0].url,
                        name: playlist.name,
                        tracksCount: playlist.tracks.total
                    }
                })))
            },
            onFailure: (err,dispatch) => dispatch(addError())
        }
    }
};

export const getPlaylistTracks = (userId, playlistId, offset) => {
    return {
        type: GET_PLAYLIST_TRACKS,
        spotifyAction: {
            method: SPOTIFY_METHODS.GET_PLAYLIST_TRACKS,
            options: [
                userId,
                playlistId,
                {
                    limit: OPTIONS.LIMIT,
                    offset: OPTIONS.LIMIT * offset
                }
            ],
            onSuccess: (res, dispatch) => {
                dispatch(setTracks(res.items.map((item) => {
                    let track = item.track;
                    return {
                        artist: track.artists.map((artist)=> {
                            return artist.name
                        }).join(", "),
                        album: track.album.name,
                        name: track.name,
                        image: track.album.images[2] && track.album.images[2].url,
                        id: track.id,
                        preview: track.preview_url,
                        previewImage: track.album.images[1] && track.album.images[1].url
                    }
                })))
            },
            onFailure: (err,dispatch) => dispatch(addError())
        }
    }
};

export const clearPlaylistTracks = () => {
    return {
        type: CLEAR_PLAYLIST_TRACKS
    }
};

export const clearPlaylists = () => {
    return {
        type: CLEAR_PLAYLISTS
    }
};

const setPlaylists = (playlists) => {
    return {
        type: SUCCESS_GET_PLAYLISTS,
        playlists: playlists,
    }
};

const setTracks = (tracks) => {
    return {
        type: SUCCESS_PLAYLIST_TRACKS,
        tracks: tracks
    }
};

