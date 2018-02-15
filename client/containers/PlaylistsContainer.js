import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Playlists from '../components/Playlists';

import { setTitle, setPreviewTrack, playGlobalTrack, pauseGlobalTrack, openModal, closeModal } from '../actions/appActionCreators';
import { getPlaylists, getPlaylistTracks, clearPlaylistTracks, clearPlaylists } from '../actions/playlistActionCreators';
import { getCurrentTrack } from '../actions/currentTrackActionCreators';

const mapStateToProps = state => {
    return {
        playlists: state.playlist.playlists,
        tracks: state.playlist.tracks,
        userId: state.auth.userId,
        currentTrack: state.currentTrack,
        isModalOpen: state.app.isModalOpen
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setTitle, getPlaylistTracks, clearPlaylistTracks, clearPlaylists, setPreviewTrack, getPlaylists, playGlobalTrack, pauseGlobalTrack, getCurrentTrack, openModal, closeModal }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);