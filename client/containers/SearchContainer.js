import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from '../components/Search';

import { setTitle, setPreviewTrack, playGlobalTrack, pauseGlobalTrack } from '../actions/appActionCreators';
import { searchTracks, clearTracks} from '../actions/searchActionCreators';
import { getCurrentTrack } from '../actions/currentTrackActionCreators';

const mapStateToProps = state => {
    return {
        tracks: state.search.tracks,
        total: state.search.total,
        userType: state.auth.type,
        currentTrack: state.currentTrack
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({setTitle, searchTracks, clearTracks, setPreviewTrack, playGlobalTrack, pauseGlobalTrack, getCurrentTrack},dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);