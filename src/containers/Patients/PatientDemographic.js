import React, { Component, PropTypes } from 'react';
// import connect from 'react-redux';
import Helmet from 'react-helmet';
import { PatientForm } from 'components';
import styles from './Patients.scss';
import {extractLookup} from 'utils/extractValue';
// import * as patientActions from 'redux/modules/patients';

// @connect(undefined, {
  // ...authActions
// })
export default class PatientDemographic extends Component {
  static propTypes = {
    savePatient: PropTypes.func
  }

  handleSubmit = (values) => {
    console.log(extractLookup(values));
    // const promise = this.props.savePatient(values);
    // return promise
    //   .then(() => {
    //     // this.props.pushState('/registerSuccess');
    //   })
    //   .catch(() => {});
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
