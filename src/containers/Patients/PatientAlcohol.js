import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Patients.scss';

export default class PatientAlcohol extends Component {

  handleSubmit = () => {
  }

  render() {
    return (
      <div className={'container ' + styles.content}>
        <Helmet title="Patient Alcohol" />
        <h4>Patient Alcohol - Under Construction</h4>
      </div>
    );
  }
}
