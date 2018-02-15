import React from 'react';
import PropTypes from 'prop-types';
import {fa, fa_play_icon, fa_pause_icon, fa_repeat_icon, fa_volume_icon, fa_mute_icon} from '../common/fonts';
import styles from '../styles/trackPreview.scss';

class TrackPreview extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            duration: 0,
            isPlaying: true,
            currentTime: 0,
            isLoopEnabled: false,
            isMuted: false,
            playButtonClass: fa_pause_icon,
            repeatButtonClass: [fa_repeat_icon, styles.iconRepeatDisabled].join(' '),
            volumeButtonClass: fa_volume_icon
        }
    }

    componentDidMount(){
        if (!this.audioComponent) return;
        this.audioComponent.addEventListener('timeupdate',() => {
            if (!this.audioComponent) return;

            let currentTime = this.audioComponent.currentTime;
            let duration = this.audioComponent.duration;

            this.setState({currentTime: currentTime, duration: duration});
            if (currentTime == duration) {
                this.setState({isPlaying: false, playButtonClass: fa_play_icon});
            }
        });

    }

    play = () => {
        if (this.state.isPlaying) {
            this.audioComponent.pause();
            this.setState({isPlaying: false, playButtonClass: fa_play_icon});
        } else {
            this.audioComponent.play();
            this.setState({isPlaying: true, playButtonClass: fa_pause_icon});
        }
    };

    repeat = () => {
        let repeatButtonClass = this.state.isLoopEnabled ? [fa_repeat_icon, styles.iconRepeatDisabled].join(' ') : fa_repeat_icon;
        this.setState({isLoopEnabled: !this.state.isLoopEnabled, repeatButtonClass: repeatButtonClass});
    };

    rewind = (e) => {
        this.audioComponent.currentTime = e.target.value;
    };

    mute = () => {
        let volumeButtonClass = this.state.isMuted ? fa_volume_icon : fa_mute_icon;
        this.audioComponent.muted = !this.state.isMuted;
        this.setState({isMuted: !this.state.isMuted, volumeButtonClass: volumeButtonClass});
    };



    render(){
        let { previewTrack} = this.props;

        return (
            <div className={styles.trackPreview} style={ {backgroundImage: 'url(' + previewTrack.image + ')'} }>
                <audio src={previewTrack.previewUrl} autoPlay="true" loop={this.state.isLoopEnabled} ref={audioComponent => { this.audioComponent = audioComponent; }} /><br/>
                <div className={styles.player}>
                    <i className={[this.state.playButtonClass, styles.iconPlay, styles.icon].join(' ')} onClick={this.play} />
                    <input className={styles.trackRange} type="range" min="0" max={this.state.duration} onChange={this.rewind} value={this.state.currentTime} />
                    <i className={[this.state.repeatButtonClass, styles.iconRepeat, styles.icon].join(' ')} onClick={this.repeat} />
                    <i className={[this.state.volumeButtonClass, styles.iconVolume, styles.icon].join(' ')} onClick={this.mute} />
                </div>
            </div>
        );
    }
}

export default TrackPreview;

TrackPreview.propTypes = {
    previewTrack: PropTypes.object
};