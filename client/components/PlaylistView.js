import React from 'react';
import PropTypes from 'prop-types';
import PlaylistTrack from './PlaylistTrack';
import styles from '../styles/playlistView.scss';

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
        let { currentTrack, userType, tracks, setGlobalTrackMode, setPreviewTrack } = this.props;

        let playlistTracks = tracks.map((track) => { 
            return (
                <PlaylistTrack key={track.id} track={track} currentTrack={currentTrack} userType={userType} setGlobalTrackMode={setGlobalTrackMode} setPreviewTrack={setPreviewTrack} />
            )
        });

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
                    {playlistTracks}
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