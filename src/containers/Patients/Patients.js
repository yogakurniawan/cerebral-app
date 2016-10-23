import React, { Component } from 'react';
import { PatientForm } from 'components';
import Helmet from 'react-helmet';

export default class Patients extends Component {
  handleSubmit = () => {
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Patients" />
        <div className="row">
          <div className="col-xs-12">
            <h2>Patients</h2>
            <ol className="breadcrumb">
              <li><a href="#">Home</a></li>
              <li><a href="#">Library</a></li>
              <li className="active">Data</li>
            </ol>
          </div>
        </div>
        <PatientForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
