import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/modal.scss';
import {fa_close_icon} from '../common/fonts';

class Modal extends React.Component {
    render() {
        return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {this.props.title}
                    </div>
                    <i className={[fa_close_icon, styles.closeIcon].join(' ')} onClick={this.props.closeModal} />
                </div>
                {this.props.children}
            </div>
        </div>
        );
    }
}

export default Modal;

Modal.propTypes = {
    title: PropTypes.string
};