import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import Cookie from 'js-cookie';
import NotificationSystem from 'react-notification-system';
import {LoginForm} from 'components';

@connect(
  state => ({
    user: state.auth.user
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = values => {
    const username = values.username;
    const password = values.password;
    const notification = this.refs.notificationSystem;
    const promise = this.props.login(username, password);
    return promise
      .then(login => {
        Cookie.set('token', login.id);
      })
      .catch(() => {
        notification.addNotification({
          message: 'Invalid Email or Password',
          level: 'error',
          position: 'tc'
        });
      });
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <NotificationSystem ref="notificationSystem" />
        {!user &&
        <div className={styles.formTitle + ' row'}>
          <div className="text-center">
            <h1>Sign In</h1>
          </div>
        </div>}

        {!user &&
        <div className="row">
          <LoginForm onSubmit={this.handleSubmit} />
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
