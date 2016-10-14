import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';

@reduxForm({
  form: 'Registration'
})
export default class RegistrationForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {submitting, handleSubmit} = this.props;
    const appLogo = require('containers/Login/app-logo.svg');
    const styles = require('containers/Login/Login.scss');
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className={styles.appLogo}><img src={appLogo} /></div>
          <div className="form-group">
            <div className="col-xs-12">
              <Field name="firstName" maxLength="100" type="text" component="input" className="form-control" placeholder="First Name" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <Field name="lastName" maxLength="100" type="text" component="input" className="form-control" placeholder="Last Name" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <Field name="email" maxLength="100" type="text" component="input" className="form-control" placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <Field name="password" type="password" component="input" className="form-control" placeholder="Password" />
            </div>
          </div>
          <button disabled={submitting} className="btn-block btn btn-primary">
            GET STARTED{' '}<i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
          <p className={styles.message + ' text-center'}>Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    );
  }
}
