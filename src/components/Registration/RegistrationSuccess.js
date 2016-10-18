import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';

@connect(undefined, { pushState: push })
export default class RegistrationSuccess extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired
  };

  login = () => {
    this.props.pushState('/login');
  }

  render() {
    const styles = require('containers/Login/Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Registration Success" />
        <div className="row">
          <div className={styles.appLogo}><img src="https://storage.googleapis.com/cerebral/cerebral-app-logo.svg" /></div>
          <div className="alert alert-success text-center" role="alert">
            <p>Registration Success!</p>
            <p>Please check your email and follow the activation link to get started.</p>
          </div>
        </div>
        <div className="row text-center">
          <button type="button" className="btn btn-info" onClick={this.login}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            {'  '}
            Back to Login
          </button>
        </div>
      </div>
    );
  }
}
