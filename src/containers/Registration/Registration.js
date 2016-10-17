import React, { Component, PropTypes } from 'react';
import {RegistrationForm} from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(undefined, authActions)
export default class Registration extends Component {

  static propTypes = {
    register: PropTypes.func.isRequired
  }

  handleSubmit = data => {
    const promise = this.props.register(data);
    return promise
      .then()
      .catch();
  }

  render() {
    const styles = require('../Login/Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Registration" />
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
