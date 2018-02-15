import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { AUTH, PAGES } from '../common/constants';
import Login from '../containers/LoginContainer';
import Search from '../containers/SearchContainer';
import Playlists from '../containers/PlaylistsContainer';
import CurrentTrack from '../containers/CurrentTrackContainer';
import Navigation from './Navigation';
import Logout from './Logout';
import PopupWindow from './PopupWindow';
import TrackPreview from './TrackPreview';
import styles from '../styles/app.scss';
import {fa_user_icon, fa_spotify_icon} from '../common/fonts';

class App extends React.Component {
    componentWillMount(){
        if (localStorage.getItem(AUTH.ACCESS_TOKEN)){
            this.props.getCurrentUser();
            this.props.getCurrentTrack();
            this.props.setTitle(PAGES.HOME_TITLE);
        }
    }

    render() {
        let { isLoaded, isAuthorized, userId, logout, previewTrack, error } = this.props;
        let profileLink = AUTH.SPOTIFY_PROFILE_UTL + userId;

        return (
            <BrowserRouter>
                <div className={styles.app}>
                    <div className={styles.leftColumn}>
                        <div className={styles.logo}>
                            <div>
                                <Link to={PAGES.SEARCH_ROUTE}><i className={[fa_spotify_icon, styles.logoIcon].join(' ')} /></Link>
                            </div>
                            <h1 className={styles.logoTitle}>Spotify Search</h1>
                        </div>
                        <Navigation isAuthorized={isAuthorized} />
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.main}>
                            <div className={styles.header}>
                                <div className={styles.title}>{this.props.title}</div>
                                {isAuthorized &&
                                <div>
                                    <a href={profileLink}> <i className={[fa_user_icon, styles.icon].join(' ')} /> </a>
                                    <Logout logout={logout} />
                                </div>}
                            </div>
                            <div className={styles.content}>
                                <Switch>
                                    <Route exact path={PAGES.SEARCH_ROUTE} component={Search} />
                                    <Route exact path={PAGES.CURRENT_TRACK_ROUTE} component={CurrentTrack} />
                                    <Route exact path={PAGES.PLAYLISTS_ROUTE} component={Playlists} />
                                    <Route exact path={PAGES.LOGIN_ROUTE} component={Login} />
                                </Switch>
                            </div>
                        </div>
                    </div>

                    {this.props.isPreviewPopupOpen &&
                    <PopupWindow close={this.props.clearPreviewTrack}>
                        <TrackPreview previewTrack={previewTrack} />
                    </PopupWindow>}

                    {(error || !localStorage.getItem(AUTH.ACCESS_TOKEN)) && !isAuthorized && <Redirect to={PAGES.LOGIN_ROUTE} />}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

App.propTypes = {
    isLoaded: PropTypes.bool,
    isAuthorized: PropTypes.bool,
    userId: PropTypes.string,
    title: PropTypes.string,
    previewTrack: PropTypes.object,
    isPreviewPopupOpen: PropTypes.bool,
    logout: PropTypes.func,
    getCurrentUser: PropTypes.func,
    getCurrentTrack: PropTypes.func,
    setTitle: PropTypes.func,
    clearPreviewTrack: PropTypes.func
};
