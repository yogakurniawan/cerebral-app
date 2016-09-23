import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const password = this.refs.password;
    this.props.login(input.value, password.value);
    input.value = '';
    password.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    const appLogo = require('./AppLogo.png');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        {!user &&
        <div className={styles.formTitle + ' row'}>
          <div className="text-center">
            <h1>iWareHouse</h1>
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
            <button className="btn-block btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}SIGN IN TO YOUR ACCOUNT
            </button>
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
