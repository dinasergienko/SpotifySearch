import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/popupWindow.scss';
import {fa_close_icon} from '../common/fonts';

class PopupWindow extends React.Component {
    render() {
        return (
            <div className={styles.popupWindow}>
                    <i className={[fa_close_icon, styles.closeButton].join(' ')} onClick={this.props.close} />
                {this.props.children}
            </div>
        )
    }
}

export default PopupWindow;

PopupWindow.propTypes = {
    close: PropTypes.func
};