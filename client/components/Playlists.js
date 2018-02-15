import React from 'react';
import PropTypes from 'prop-types';
import { PAGES } from '../common/constants';
import PlaylistView from './PlaylistView';
import Modal from './Modal';

import styles from '../styles/playlists.scss';

class Playlists extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chosenPlaylist: null,
            currentPage: 0
        }
    }

    componentWillMount() {
        this.props.setTitle(PAGES.PLAYLISTS_TITLE);
        this.props.getPlaylists(this.state.currentPage);
    }

    componentDidMount() {
        if (!this.playlistsComponent) return;

        this.playlistsComponent.addEventListener('scroll', (event) => {
            var element = event.target;
            if (element.scrollHeight - element.scrollTop === element.clientHeight)
            {
                this.props.getPlaylists(this.state.currentPage + 1);
                this.setState({currentPage: this.state.currentPage + 1});
            }
        });
    }

    componentWillUnmount(){
        this.props.clearPlaylists();
    }

    openModal = (playlist) => {
        if (playlist.tracksCount) {
            this.updatePlaylistTracks(playlist.id, 0);
            this.setState({chosenPlaylist: playlist});
            this.props.openModal();
        }
    };

    updatePlaylistTracks = (playlistId, offset) => {
        this.props.getPlaylistTracks(this.props.userId, playlistId, offset);
    };

    closeModal = () => {
        this.props.closeModal();
        this.setState({chosenPlaylist: null});
        this.props.clearPlaylistTracks();
    };

    setGlobalTrackMode = (trackId, currentTrackId) => {
        trackId == currentTrackId ? this.props.pauseGlobalTrack() : this.props.playGlobalTrack(trackId);
        this.props.getCurrentTrack();
    };

    render(){
        let { tracks, getPlaylistTracks, currentTrack, setPreviewTrack, isModalOpen } = this.props;

        let playlists = this.props.playlists.map((playlist) => {
            let playlistStyle = playlist.tracksCount ? styles.playlistItem + ' ' + styles.playlistItemWithTracks : styles.playlistItem;

            return (
                <li onClick={() => this.openModal(playlist)} className={playlistStyle} key={playlist.id}> {playlist.name}
                    {playlist.tracksCount == 0 && <span className={styles.noTracks}>No Tracks</span>}
                </li>
            )
        });

        return (
            <div className={styles.playlistsContainer} ref={playlistsComponent => { this.playlistsComponent = playlistsComponent; }}>
                <ul className={styles.playlists}>
                    {playlists}
                </ul>
                {isModalOpen && <Modal closeModal={this.closeModal} title={this.state.chosenPlaylist.name}>
                    <PlaylistView playlist={this.state.chosenPlaylist} tracks={tracks} currentTrack={currentTrack} getPlaylistTracks={this.updatePlaylistTracks} setPreviewTrack={setPreviewTrack} setGlobalTrackMode={this.setGlobalTrackMode} />
                </Modal>}
            </div>
        )
    }
}

export default Playlists;

Playlists.propTypes = {
    playlists: PropTypes.array,
    tracks: PropTypes.array,
    userId: PropTypes.string,
    currentTrack: PropTypes.object,
    isModalOpen: PropTypes.bool,
    setTitle: PropTypes.func,
    getPlaylistTracks: PropTypes.func,
    clearPlaylistTracks: PropTypes.func,
    clearPlaylists: PropTypes.func,
    setPreviewTrack: PropTypes.func,
    getPlaylists: PropTypes.func,
    playGlobalTrack: PropTypes.func,
    pauseGlobalTrack: PropTypes.func,
    getCurrentTrack: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func
};