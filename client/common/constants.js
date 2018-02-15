export const SPOTIFY_METHODS = {
    GET_ME : "getMe",
    GET_USER_PLAYLISTS: "getUserPlaylists",
    GET_CURRENT_TRACK: "getMyCurrentPlayingTrack",
    SEARCH_TRACKS: "searchTracks",
    GET_PLAYLIST_TRACKS: "getPlaylistTracks",
    SET_PREVIOUS_TRACK: "skipToPrevious",
    SET_NEXT_TRACK: "skipToNext",
    PAUSE_GLOBAL_TRACK: "pause",
    PLAY_GLOBAL_TRACK: "play"
};

export const AUTH = {
    CLIENT_ID: "92cc66d8a9754a6892b952da2a7eefab",
    CLIENT_SECRET: "9ca5ad4ead0c4b1b860c0b3b190bc247",
    REDIRECT_URL: "http://localhost:8080/callback",
    SPOTIFY_AUTH_URL: "https://accounts.spotify.com/authorize/?client_id=92cc66d8a9754a6892b952da2a7eefab&response_type=code&redirect_uri=http://localhost:8080/callback&scope=user-read-playback-state,user-modify-playback-state,user-read-private",
    SPOTIFY_TOKEN_URL: "https://accounts.spotify.com/api/token",
    SPOTIFY_PROFILE_UTL: "https://open.spotify.com/user/",
    ACCESS_TOKEN: "accessToken",
    PREMIUM: "premium"
};

export const PAGES = {
    LOGIN_TITLE: "Login",
    LOGIN_ROUTE: "/login",
    SEARCH_TITLE: "Search",
    SEARCH_ROUTE: "/search",
    CURRENT_TRACK_TITLE: "Now playing",
    CURRENT_TRACK_ROUTE: "/currentTrack",
    PLAYLISTS_TITLE: "Playlists",
    PLAYLISTS_ROUTE: "/playlists",
    HOME_TITLE: "Spotify Search"
};

export const OPTIONS = {
    LIMIT: 20
};