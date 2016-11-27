import React, { Component, PropTypes } from 'react';
// import connect from 'react-redux';
import Helmet from 'react-helmet';
import { PatientForm } from 'components';
import styles from './Patients.scss';
import { connect } from 'react-redux';
import {parseLookup} from 'utils/extractValue';
import {save as savePatient} from 'redux/modules/patients';

@connect(undefined, {
  savePatient
})
export default class PatientDemographic extends Component {
  static propTypes = {
    savePatient: PropTypes.func
  }

  constructFullname = (values) => {
    const title = values.title.lookuptext;
    const {firstname, lastname} = values;
    const fullname = `${title} ${lastname}, ${firstname} `;
    values.fullname = fullname;
    return values;
  }

  handleSubmit = (values) => {
    let patient = this.constructFullname(values);
    patient = parseLookup(values);
    const promise = this.props.savePatient(patient);
    return promise;
  }

  render() {
    return (
      <div className={'container ' + styles.content}>
        <Helmet title="Patient Demographic" />
        <PatientForm cancelAdd={this.cancel} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
