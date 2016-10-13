import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
  form: 'Registration'
})
export default class RegistrationForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {pristine, submitting, handleSubmit} = this.props;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="col-xs-6">
              <Field name="firstName" maxLength="100" type="text" component="input" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-xs-6">
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
          <button disabled={pristine || submitting} type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}
