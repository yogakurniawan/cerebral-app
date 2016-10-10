import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import Cookie from 'js-cookie';
import NotificationSystem from 'react-notification-system';

@connect(
  state => ({
    user: state.auth.user,
    loggingIn: state.auth.loggingIn
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loggingIn: PropTypes.bool
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const password = this.refs.password;
    const notification = this.refs.notificationSystem;
    const promise = this.props.login(input.value, password.value);
    promise
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
    const {user, logout, loggingIn} = this.props;
    const styles = require('./Login.scss');
    const appLogo = require('./app-logo.svg');
    let loggingInClassName = 'fa fa-sign-in';
    let loginButtonText = 'SIGN IN TO YOUR ACCOUNT';
    if (loggingIn) {
      loggingInClassName += 'fa fa-spinner fa-spin';
      loginButtonText = 'SIGNING IN...';
    }
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
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className={styles.appLogo}><img src={appLogo} /></div>
            <div className={'input-group ' + styles.topBottomBuffer}>
              <span className="input-group-addon" id="username-addon"><i className={'fa fa-at ' + styles.faAt} /></span>
              <input aria-describedby="username-addon" type="text" ref="username" id="login-username" placeholder="Username" className="form-control"/>
            </div>
            <div className={'input-group ' + styles.topBottomBuffer}>
              <span className="input-group-addon" id="password-addon"><i className={'fa fa-lock ' + styles.faLock} /></span>
              <input aria-describedby="password-addon" type="password" ref="password" id="login-password" placeholder="Password" className="form-control"/>
            </div>
            <button disabled={loggingIn} className="btn-block btn btn-primary" onClick={this.handleSubmit}>
              <i className={loggingInClassName}/>{' '}{loginButtonText}
            </button>
            <p className={styles.message + ' text-center'}>Not registered? <a href="#">Create an account</a></p>
          </form>
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
