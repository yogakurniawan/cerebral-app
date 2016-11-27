import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
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
        <Helmet title="Email Verified" />
        <div className="row">
          <div className={styles.appLogo}><img src="https://storage.googleapis.com/cerebral/checked.svg" /></div>
          <div style={{ width: '500' }} className={commonStyles.standardBox}>
            <span className="text-center"><h1>Congratulations!</h1></span>
            <span className="text-center"><p>Your email has been verified.</p></span>
            <div className="text-center">
              <button type="button" className="btn btn-primary btn-lg" style={{ marginTop: '15', marginBottom: '10' }} onClick={this.login}>
                Login Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
