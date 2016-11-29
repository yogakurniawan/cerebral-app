import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import styles from 'containers/Login/Login.scss';
import commonSytles from 'common/Common.scss';

@reduxForm({
  form: 'Login'
})
export default class LoginForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {submitting, handleSubmit} = this.props;
    let loggingInClassName = 'fa fa-sign-in';
    let loginButtonText = 'SIGN IN TO YOUR ACCOUNT';
    if (submitting) {
      loggingInClassName += 'fa fa-spinner fa-spin';
      loginButtonText = 'SIGNING IN...';
    }
    return (
      <div className={styles.loginPage}>
        <form className={commonSytles.standardBox} onSubmit={handleSubmit}>
          <div className={styles.appLogo}><img src="https://storage.googleapis.com/cerebral/cerebral-logo.png" /></div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon" id="username-addon"><i className={'glyphicon glyphicon-user ' + commonSytles.colorPrimary} /></span>
              <Field name="username" maxLength="100" component="input" aria-describedby="username-addon" type="text" id="login-username" placeholder="Username" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon" id="password-addon"><i className={'glyphicon glyphicon-lock ' + commonSytles.colorPrimary} /></span>
              <Field name="password" component="input" aria-describedby="password-addon" type="password" id="login-password" placeholder="Password" className="form-control" />
            </div>
          </div>
          <button disabled={submitting} className="btn-block btn btn-primary">
            <i className={loggingInClassName} />{' '}{loginButtonText}
          </button>
          <p className={styles.message + ' text-center'}>Not registered? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    );
  }
}
