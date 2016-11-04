import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router';
import zxcvbn from 'zxcvbn';
import * as authActions from 'redux/modules/auth';
import { connect } from 'react-redux';
import commonStyles from 'common/Common.scss';
import regStyles from './RegistrationForm.scss';

const requiredValidation = (values, fields) => {
  const errors = {};
  for (const val of fields) {
    if (!values[val]) {
      errors[val] = 'Required';
    }
  }
  return errors;
};

const asyncValidate = (values, dispacth, {validateUsername}) => {
  const validate = res => {
    return new Promise((resolve, reject) => {
      const errors = {
        username: 'Username is already used'
      };
      if (!res.isValid) {
        reject(errors);
      }
      return resolve();
    });
  };

  if (!values.username) {
    return Promise.resolve({});
  }
  return validateUsername(values.username)
          .then(validate);
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

const renderField = ({ input, meta: { asyncValidating, touched, error, warning }, ...rest }) => {
  return (
    <div className={(input.name === 'password' ? regStyles.marginBottom8px : '') + ' form-group' + (error && touched ? ' has-error' : '')}>
      <div className="col-xs-12">
        <input {...input} {...rest} />
        {input.name === 'username' && asyncValidating && <i className="fa fa-cog fa-spin" />}
        {input.name === 'username' && asyncValidating && ' Validating...'}
        {touched && ((error && <span className={commonStyles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
      </div>
    </div>
  );
};

const selector = formValueSelector('Registration');

@connect(state => ({
  password: selector(state, 'password')
}), {...authActions})
@reduxForm({
  form: 'Registration',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})
export default class RegistrationForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    password: PropTypes.string
  }

  getStrengthClassName = {
    0: 'passwordstrength-none',
    1: 'passwordstrength1',
    2: 'passwordstrength2',
    3: 'passwordstrength3',
    4: 'passwordstrength4'
  }

  getStrengthLiteral = {
    0: 'Weak',
    1: 'Fair',
    2: 'Good',
    3: 'Strong',
    4: 'Very Strong'
  }

  render() {
    const {submitting, handleSubmit, password} = this.props;
    const styles = require('containers/Login/Login.scss');
    let registerButtonText = 'GET STARTED';
    let className = '';
    let strengthLiteral = '';
    if (password) {
      const score = zxcvbn(password).score;
      className = this.getStrengthClassName[score];
      strengthLiteral = 'Password strength: ' + this.getStrengthLiteral[score];
    }

    if (submitting) {
      registerButtonText = 'SIGNING UP...';
    }
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className={styles.appLogo}><img src="https://storage.googleapis.com/cerebral/cerebral-app-logo.svg" /></div>
          <Field name="firstname" maxLength="100" type="text" component={renderField} className="form-control" placeholder="First Name" />
          <Field name="lastname" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Last Name" />
          <Field name="username" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Username" />
          <Field name="email" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Email" />
          <Field name="password" type="password" component={renderField} className="form-control" placeholder="Password" />
          <div className={regStyles.passwordstrength + ' ' + regStyles[className]}>
            {strengthLiteral}
          </div>
          <button disabled={submitting} className="btn-block btn btn-primary">
            {submitting && <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>}{submitting && ' '}{registerButtonText}{' '}{!submitting && <i className="fa fa-angle-right" aria-hidden="true"></i>}
          </button>
          <p className={styles.message + ' text-center'}>Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    );
  }
}
