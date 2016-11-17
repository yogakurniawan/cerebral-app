import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Patients.scss';

export default class PatientList extends Component {

  handleSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <div className={'container ' + styles.content}>
        <Helmet title="Patient List" />
      </div>
    );
  }
}
