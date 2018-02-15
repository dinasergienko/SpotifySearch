import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CurrentTrack from '../components/CurrentTrack';

import { setTitle, setPreviewTrack, playGlobalTrack, pauseGlobalTrack } from '../actions/appActionCreators';
import { getCurrentTrack, selectNextTrack, selectPreviousTrack } from '../actions/currentTrackActionCreators';

const mapStateToProps = state => {
    return {
        currentTrack: state.currentTrack,
        userType: state.auth.type
    }
};

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({setTitle, getCurrentTrack, setPreviewTrack, selectNextTrack, selectPreviousTrack, playGlobalTrack, pauseGlobalTrack}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTrack);