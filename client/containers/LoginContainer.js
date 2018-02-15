import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/Login';

import { getCurrentUser } from '../actions/authActionCreators';
import { setTitle } from '../actions/appActionCreators';

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getCurrentUser, setTitle }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)

