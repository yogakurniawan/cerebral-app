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
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <span className="input-group-addon" id="username-addon"><i className={'fa fa-at ' + styles.faAt} /></span>
              <input aria-describedby="username-addon" type="text" ref="username" id="login-username" placeholder="Username" className="form-control"/>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="password-addon"><i className={'fa fa-lock ' + styles.faLock} /></span>
              <input aria-describedby="password-addon" type="text" ref="password" id="login-password" placeholder="Password" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
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
