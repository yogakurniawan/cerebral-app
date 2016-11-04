import React, { Component, PropTypes } from 'react';
import { RegistrationForm } from 'components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import NotificationSystem from 'react-notification-system';
import { push } from 'react-router-redux';
import styles from '../Login/Login.scss';

@connect(undefined, {...authActions, pushState: push})
export default class Registration extends Component {

  static propTypes = {
    register: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  handleSubmit = data => {
    const promise = this.props.register(data);
    const notification = this.refs.notificationSystem;
    return promise
      .then(() => {
        this.props.pushState('/registerSuccess');
      })
      .catch(() => notification.addNotification({
        message: 'Invalid Email or Password',
        level: 'error',
        position: 'tc'
      }));
  }

  render() {
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Registration" />
        <NotificationSystem ref="notificationSystem" />
        <div className={styles.formTitle + ' row'}>
          <div className="text-center">
            <h1>Sign Up</h1>
          </div>
        </div>
        <RegistrationForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
