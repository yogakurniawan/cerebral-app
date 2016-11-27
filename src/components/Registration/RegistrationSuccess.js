import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import commonStyles from 'common/Common.scss';
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
          <div className={styles.appLogo}><img src="https://storage.googleapis.com/cerebral/checked.svg" /></div>
          <div style={{ width: '500' }} className={commonStyles.standardBox}>
            <span className="text-center"><h1>Registration Successful!</h1></span>
            <span className="text-center"><p>Please check your email and follow the activation link to get started.</p></span>
            <div className="text-center">
              <button type="button" className="btn btn-primary btn-lg" style={{ marginTop: '15', marginBottom: '10' }} onClick={this.login}>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                {'  '}
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
