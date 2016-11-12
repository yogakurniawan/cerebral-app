import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Patients.scss';

export default class PatientSocial extends Component {

  handleSubmit = () => {
  }

  render() {
    return (
      <div className={'container ' + styles.content}>
        <Helmet title="Patient Social" />
        <h4>Patient Social - Under Construction</h4>
      </div>
    );
  }
}
