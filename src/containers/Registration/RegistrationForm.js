import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

@reduxForm({
  form: 'Registration'
})
export default class RegistrationForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
  }

  handleSubmit = values => {
    console.log('You submitted:\n\n' + JSON.stringify(values, null, 2));
  }

  render() {
    const {pristine, submitting} = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Field name="firstName" type="text" component="input" className="form-control" placeholder="First Name" />
          </div>
          <div className="form-group">
            <Field name="lastName" type="text" component="input" className="form-control" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <Field name="email" type="text" component="input" className="form-control" placeholder="Email" />
          </div>
          <button disabled={pristine || submitting} type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}
