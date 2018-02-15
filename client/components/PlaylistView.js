import React from 'react';
import PropTypes from 'prop-types';
import { AUTH } from '../common/constants';
import styles from '../styles/playlistView.scss';
import {fa_music_icon, fa_play_icon, fa_pause_icon} from '../common/fonts';

class PlaylistView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expandedView: true,
            tracksStyle: styles.tracks,
            currentPage: 0
        }
    }

    getPreview = (track) => {
        if (track.preview) {
            this.props.setPreviewTrack(track.preview, track.previewImage);
        }
    };

    changeStyle = (value) => {
        this.setState({expandedView: !this.state.expandedView});
        this.state.expandedView
            ? this.setState({expandedView: false, tracksStyle: [styles.tracks, styles.tracksCompressed].join(' ')})
            : this.setState({expandedView: true, tracksStyle: styles.tracks})
    };

    componentDidMount() {
        if (!this.tracksComponent) return;

        this.tracksComponent.addEventListener('scroll', (event) => {
            var element = event.target;
            if (element.scrollHeight - element.scrollTop === element.clientHeight)
            {
                this.props.getPlaylistTracks(this.props.playlist.id, this.state.currentPage + 1);
                this.setState({currentPage: this.state.currentPage + 1});
            }
        });
    }

    render() {
        let {currentTrack, setGlobalTrackMode, userType} = this.props;
        let isPremium = userType == AUTH.PREMIUM;

        let tracks = this.props.tracks.map((track) => {
                let previewIconClass = track.preview ? [fa_music_icon, styles.icon].join(' ') : [fa_music_icon, styles.icon, styles.iconDisabled].join(' ');
                let playingIconClass = track.id == currentTrack.id && currentTrack.isPlaying ? [fa_pause_icon, styles.icon].join(' ') : [fa_play_icon, styles.icon].join(' ');

                return (
                    <li className={styles.trackItem} key={track.id}>
                        <div className={styles.trackData}>
                            <img src={track.image} className={styles.trackPart + ' ' + styles.trackImage}/>
                            <span className={styles.trackName}>{track.name}</span>
                        </div>
                        <div>
                            <i className={previewIconClass} onClick={() => this.getPreview(track)}/>
                            {isPremium && <i className={playingIconClass} onClick={() => setGlobalTrackMode(track.id, currentTrack.id)} />}
                        </div>
                    </li>
                )
            }
        );

        return (
            <div className={styles.playlistView}>
                <div className={styles.playlistHeader}>
                    <img className={styles.image} src={this.props.playlist.image}  />
                    <div>
                        <p className={styles.tracksCount}>{this.props.playlist.tracksCount} tracks</p>
                        <input type="checkbox" checked={!this.state.expandedView} onChange={() => this.changeStyle()} /> Compressed Mode
                    </div>
                </div>
                <ul className={this.state.tracksStyle} ref={tracksComponent => { this.tracksComponent = tracksComponent; }}>
                    {tracks}
                </ul>
            </div>
        )
    }
}

export default PlaylistView;

PlaylistView.propTypes = {
    playlist: PropTypes.object,
    tracks: PropTypes.array,
    currentTrack: PropTypes.object,
    getPlaylistTracks: PropTypes.func,
    setPreviewTrack: PropTypes.func,
    setGlobalTrackMode: PropTypes.func
};