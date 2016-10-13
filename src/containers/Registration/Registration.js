import React, { Component } from 'react';
import {RegistrationForm} from 'components';
import Helmet from 'react-helmet';

export default class Registration extends Component {

  handleSubmit = data => {
    window.alert('You submitted:\n\n' + JSON.stringify(data, null, 2));
  }

  render() {
    return (
      <div>
        <Helmet title="Registration" />
        <RegistrationForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
