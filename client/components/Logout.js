import React from 'react';
import PropTypes from 'prop-types';
import { AUTH } from '../common/constants';
import styles from '../styles/app.scss';
import {fa_sign_out_icon} from '../common/fonts';

class Logout extends React.Component {
    logout = () => {
        localStorage.removeItem(AUTH.ACCESS_TOKEN);
        this.props.logout();
    };

    render(){
        return (
            <a onClick={this.logout}><i className={[fa_sign_out_icon, styles.icon].join(' ')} /></a>
        )
    }
}

export default Logout;

Logout.propTypes = {
    logout: PropTypes.func
};