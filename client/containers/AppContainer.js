import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/App';

import { logout, getCurrentUser } from '../actions/authActionCreators';
import { getPlaylists } from '../actions/playlistActionCreators';
import { getCurrentTrack } from '../actions/currentTrackActionCreators';
import { setTitle, clearPreviewTrack } from '../actions/appActionCreators';

const mapStateToProps = state => {
    return {
        isLoaded: state.auth.isLoaded,
        isAuthorized: state.auth.isAuthorized,
        userId: state.auth.userId,
        title: state.app.title,
        previewTrack: state.app.previewTrack,
        isPreviewPopupOpen: state.app.isPreviewPopupOpen,
        error: state.app.error
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ logout, getCurrentUser, getPlaylists, getCurrentTrack, setTitle, clearPreviewTrack }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);