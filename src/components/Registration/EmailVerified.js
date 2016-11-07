import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import styles from 'containers/Login/Login.scss';

@connect(undefined, { pushState: push })
export default class RegistrationSuccess extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired
  };

  login = () => {
    this.props.pushState('/login');
  }

  render() {
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Registration Success" />
        <div className="row">
          <div className={styles.appLogo}><img src="https://storage.googleapis.com/cerebral/cerebral-logo.png" /></div>
          <div className="alert alert-success text-center" role="alert">
            <p>Congratulations!</p>
            <p>Your email has been verified.</p>
          </div>
        </div>
        <div className="row text-center">
          <button type="button" className="btn btn-info" onClick={this.login}>
            Login Now
          </button>
        </div>
      </div>
    );
  }
}
