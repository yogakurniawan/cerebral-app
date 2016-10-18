import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

const requiredValidation = (values, fields) => {
  const errors = {};
  for (const val of fields) {
    if (!values[val]) {
      errors[val] = 'Required';
    }
  }
  return errors;
};

const validate = values => {
  const errors = {};
  const {username, email} = values;
  if (username && username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  const fields = ['username', 'email', 'firstname', 'lastname'];

  return {...requiredValidation(values, fields), ...errors };
};

const renderField = ({ input, meta: { touched, error, warning }, ...rest }) => {
  const regStyles = require('./RegistrationForm.scss');
  return (
    <div className={'form-group' + (error && touched ? ' has-error' : '')}>
      <div className="col-xs-12">
        <input {...input} {...rest} />
        {touched && ((error && <span className={regStyles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
      </div>
    </div>
  );
};

@reduxForm({
  form: 'Registration',
  validate
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
    let registerButtonText = 'GET STARTED';
    if (submitting) {
      registerButtonText = 'SIGNING UP...';
    }
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className={styles.appLogo}><img src={appLogo} /></div>
          <Field name="firstname" maxLength="100" type="text" component={renderField} className="form-control" placeholder="First Name" />
          <Field name="lastname" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Last Name" />
          <Field name="username" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Username" />
          <Field name="email" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Email" />
          <Field name="password" type="password" component={renderField} className="form-control" placeholder="Password" />
          <button disabled={submitting} className="btn-block btn btn-primary">
            {submitting && <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>}{submitting && ' '}{registerButtonText}{' '}{!submitting && <i className="fa fa-angle-right" aria-hidden="true"></i>}
          </button>
          <p className={styles.message + ' text-center'}>Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    );
  }
}
