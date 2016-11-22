import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Patients extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    const {children} = this.props;
    return (
      <div className="container">
        <Helmet title="Patients" />
        <div className="row">
          <div className="col-xs-12">
            <h2>Patients</h2>
          </div>
        </div>
        {children}
      </div>
    );
  }
}
