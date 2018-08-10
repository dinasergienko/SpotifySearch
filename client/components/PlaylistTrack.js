import React from 'react';
import PropTypes from 'prop-types';
import { AUTH } from '../common/constants';
import styles from '../styles/playlistView.scss';
import { fa_music_icon, fa_play_icon, fa_pause_icon } from '../common/fonts';

class PlaylistTrack extends React.Component {

    getPreview = (track) => {
        if (track.preview) {
            this.props.setPreviewTrack(track.preview, track.previewImage);
        }
    };

    render() {
        let { currentTrack, track, setGlobalTrackMode, userType } = this.props;
        let isPremium = userType == AUTH.PREMIUM;

        let previewIconClass = track.preview ? [fa_music_icon, styles.icon].join(' ') : [fa_music_icon, styles.icon, styles.iconDisabled].join(' ');
        let playingIconClass = track.id == currentTrack.id && currentTrack.isPlaying ? [fa_pause_icon, styles.icon].join(' ') : [fa_play_icon, styles.icon].join(' ');

        return (
            <li className={styles.trackItem} key={track.id}>
                <div className={styles.trackData}>
                    <img src={track.image} className={styles.trackPart + ' ' + styles.trackImage} />
                    <span className={styles.trackName}>{track.name}</span>
                </div>
                <div>
                    <i className={previewIconClass} onClick={() => this.getPreview(track)} />
                    {isPremium && <i className={playingIconClass} onClick={() => setGlobalTrackMode(track.id, currentTrack.id)} />}
                </div>
            </li>
        )
    }
}

export default PlaylistTrack;
