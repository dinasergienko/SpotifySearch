import React from 'react';
import PropTypes from 'prop-types';
import { PAGES, AUTH } from '../common/constants';
import styles from '../styles/currentTrack.scss';
import {fa_music_icon, fa_reload_icon, fa_left_icon, fa_right_icon, fa_play_icon, fa_pause_icon} from '../common/fonts';

class CurrentTrack extends React.Component {
    componentWillMount(props){
        this.props.setTitle(PAGES.CURRENT_TRACK_TITLE);
        this.props.getCurrentTrack();
    }

    getPreview = () => {
        let track = this.props.currentTrack;

        if (track.preview) {
            this.props.setPreviewTrack(track.preview, track.image);
        }
    };

    render(){
        let {currentTrack, userType, getCurrentTrack, selectPreviousTrack, selectNextTrack, pauseGlobalTrack, playGlobalTrack} = this.props;
        let isPremium = userType == AUTH.PREMIUM;

        let previewIconStyle = currentTrack.preview ? [fa_music_icon, styles.icon, styles.iconMusic].join(' ') : [fa_music_icon, styles.icon, styles.iconMusic, styles.iconDisabled ].join(' ');
        let playingIconStyle = currentTrack.isPlaying ? [fa_pause_icon, styles.icon].join(' ') : [fa_play_icon, styles.icon].join(' ');

        let refresh = (
            <div className={styles.manageBar}>
                {isPremium && <i className={[fa_left_icon, styles.icon, styles.iconAngle].join(' ')} onClick={selectPreviousTrack}/>}
                <i className={[fa_reload_icon, styles.icon].join(' ')} onClick={getCurrentTrack} />
                <i className={previewIconStyle} onClick={this.getPreview} />
                {isPremium && <i className={playingIconStyle} onClick={() => currentTrack.isPlaying ? pauseGlobalTrack() : playGlobalTrack(currentTrack.id)}/>}
                {isPremium && <i className={[fa_right_icon, styles.icon, styles.iconAngle].join(' ')} onClick={selectNextTrack} />}
            </div>
        );

        if (currentTrack.song != undefined){
            return (
                <div className={styles.currentTrack}>
                    {refresh}
                    <img src={currentTrack.image} className={styles.trackImage} />
                    <div className={styles.trackData}>{'Artist: ' + currentTrack.artist || 'None'}</div>
                    <div className={styles.trackData}>{'Album: ' + currentTrack.album || 'None'}</div>
                    <div className={styles.trackData}>{'Song: ' + currentTrack.song || 'None'}</div>
                </div>
            )
        }

        return(
            <div className={styles.currentTrack}>
                {refresh}
                There are no playing tracks
            </div>

        )
    }
}

export default CurrentTrack;

CurrentTrack.propTypes = {
    setTitle: PropTypes.func,
    getCurrentTrack: PropTypes.func,
    setPreviewTrack: PropTypes.func,
    selectNextTrack: PropTypes.func,
    selectPreviousTrack: PropTypes.func,
    playGlobalTrack: PropTypes.func,
    pauseGlobalTrack: PropTypes.func,
    currentTrack: PropTypes.object,
    userType: PropTypes.string
};
