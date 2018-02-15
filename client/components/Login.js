import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { AUTH, PAGES } from '../common/constants';

class Login extends React.Component {
    componentWillMount() {
        this.props.setTitle(PAGES.LOGIN_TITLE);
    }

    componentDidMount(){
        let query = new URLSearchParams(this.props.location.search);
        let accessToken = query.get('accessToken');
        let refreshToken = query.get('refreshToken');

        if (accessToken && refreshToken){
            localStorage.setItem("accessToken", query.get('accessToken'));
            localStorage.setItem("refreshToken", query.get('refreshToken'));
            this.props.getCurrentUser();
        }
    }

    render(){
        let { isAuthorized } = this.props;

        if (!isAuthorized) {
            return (
                <div>
                    Hi, <a href={AUTH.SPOTIFY_AUTH_URL}>Sign In</a> using Spotify.
                </div>
            )
        } else {
            return (
                <Redirect to={PAGES.SEARCH_ROUTE} />
            )
        }
    }
}

export default Login;

Login.propTypes = {
    isAuthorized: PropTypes.bool,
    getCurrentUser: PropTypes.func,
    setTitle: PropTypes.func
};
