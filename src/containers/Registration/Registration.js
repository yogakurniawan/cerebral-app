import React, { Component } from 'react';
import {RegistrationForm} from 'components';
import Helmet from 'react-helmet';

export default class Registration extends Component {

  handleSubmit = data => {
    window.alert('You submitted:\n\n' + JSON.stringify(data, null, 2));
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
