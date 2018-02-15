import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PAGES } from '../common/constants';
import styles from '../styles/navigation.scss';

class Navigation extends React.Component {
    render() {
        let { isAuthorized } = this.props;

        let links = isAuthorized
            ? (
            <ul className={styles.list}>
                <li className={styles.listItem}><Link to={PAGES.SEARCH_ROUTE}>Search</Link></li>
                <li className={styles.listItem}><Link to={PAGES.CURRENT_TRACK_ROUTE}>Current Track</Link></li>
                <li className={styles.listItem}><Link to={PAGES.PLAYLISTS_ROUTE}>Playlists</Link></li>
            </ul>
        )
            : (
            <ul className={styles.list}>
                <li className={styles.listItem}><Link to={PAGES.LOGIN_ROUTE}>Sign In</Link></li>
            </ul>
        );

        return (
            <div className={styles.nav}>{links}</div>
        )
    }
}

export default Navigation;

Navigation.propTypes = {
    isAuthorized: PropTypes.bool
};