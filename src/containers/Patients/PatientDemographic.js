import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { PatientForm } from 'components';
import styles from './Patients.scss';

export default class PatientDemographic extends Component {

  handleSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <div className={'container ' + styles.content}>
        <Helmet title="Patient Demographic" />
        <PatientForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
