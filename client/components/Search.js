import React from 'react';
import PropTypes from 'prop-types';
import { PAGES, AUTH } from '../common/constants';
import {fa_music_icon, fa_play_icon, fa_pause_icon} from '../common/fonts';
import styles from '../styles/search.scss';
import tracksStyles from '../styles/currentTrack.scss';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 0,
            query: ''
        };
    }
    
    search = (ev) => {
        let query = ev.target.value;
        query ? this.props.searchTracks(query, 0, false) : this.props.clearTracks();
        this.setState({query: query, currentPage: 0});
    };

    getPreview = (trackId) => {
        let track = this.props.tracks.filter(t => t.id == trackId)[0];
        this.props.setPreviewTrack(track.preview, track.image);
    };

    setGlobalTrackMode = (trackId, currentTrackId) => {
        trackId == currentTrackId ? this.props.pauseGlobalTrack() : this.props.playGlobalTrack(trackId);
        this.props.getCurrentTrack();
    };

    componentWillMount() {
        this.props.setTitle(PAGES.SEARCH_TITLE);
    }

    componentDidMount() {
        if (!this.tracksComponent) return;
        this.tracksComponent.addEventListener('scroll', (event) => {
            var element = event.target;
            if (element.scrollHeight - element.scrollTop === element.clientHeight)
            {
                this.props.searchTracks(this.state.query, this.state.currentPage + 1, true);
                this.setState({currentPage: this.state.currentPage + 1});
            }
        });
    }

    render(){
        let { tracks, total, userType, currentTrack } = this.props;
        let isPremium = userType == AUTH.PREMIUM;

        let trackList = tracks.map((track) => {
                let previewIconStyle = track.preview ? [fa_music_icon, styles.icon].join(' ') : [fa_music_icon, styles.icon, styles.iconDisabled ].join(' ');
                let playingIconStyle = track.id == currentTrack.id && currentTrack.isPlaying ? [fa_pause_icon, styles.icon].join(' ') : [fa_play_icon, styles.icon].join(' ');

                return (
                    <li className={styles.track} key={track.id} style={ {backgroundImage: 'url(' + track.image + ')'}  }>
                        <div className={styles.trackData}>
                            <div className={tracksStyles.trackData}>{'Artist: ' + track.artist || 'None'}</div>
                            <div className={tracksStyles.trackData}>{'Album: ' + track.album || 'None'}</div>
                            <div className={tracksStyles.trackData}>{'Song: ' + track.song || 'None'}</div>
                        </div>
                        <div className={styles.trackData}>
                            <i className={previewIconStyle} onClick={() => this.getPreview(track.id)} />
                            {isPremium && <i className={playingIconStyle} onClick={() => this.setGlobalTrackMode(track.id, currentTrack.id)} />}
                        </div>
                    </li>
                )
            }
        );

        let totalMessage = total != 0 ? (<p>{total} tracks have been found</p>) : (<p></p>);

        return (
            <div className={styles.search}>
                <div className={styles.searchContainer}>
                    <input className={styles.searchInput} placeholder="put something to search tracks" onChange={this.search} />
                    {totalMessage}
                </div>
                <div className={styles.tracksContainer} ref={tracksComponent => { this.tracksComponent = tracksComponent; }}>
                    <ul className={styles.trackList}>
                        {trackList}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search;

Search.propTypes = {
    tracks: PropTypes.array,
    total: PropTypes.number,
    userType: PropTypes.string,
    currentTrack: PropTypes.object,
    setTitle: PropTypes.func,
    searchTracks: PropTypes.func,
    clearTracks: PropTypes.func,
    setPreviewTrack: PropTypes.func,
    playGlobalTrack: PropTypes.func,
    pauseGlobalTrack: PropTypes.func,
    getCurrentTrack: PropTypes.func
};