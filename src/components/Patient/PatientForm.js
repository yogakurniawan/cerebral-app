import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
// import { Link } from 'react-router';

const renderField = ({ input, label, meta: { touched, error, warning }, ...rest }) => {
  const styles = require('common/Common.scss');
  return (
    <FormGroup controlId={input.name} className={(error && touched ? ' has-error' : '')}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input} {...rest} />
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </FormGroup>
  );
};

const renderCheckbox = ({ input, label, meta: { touched, error, warning }, ...rest }) => {
  const styles = require('common/Common.scss');
  return (
    <div className="checkbox checkbox-primary" style={{marginTop: 30}}>
      <FormControl {...input} {...rest} />
      <ControlLabel>{label}</ControlLabel>
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  );
};

@reduxForm({
  form: 'Patient'
})
export default class PatientForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    lookups: PropTypes.arrayOf(PropTypes.shape({
      lookupname: PropTypes.string.isRequired,
      lookupvalue: PropTypes.number.isRequired,
      lookuptext: PropTypes.string.isRequired,
      displayorder: PropTypes.number.isRequired,
      createddate: PropTypes.string.isRequired,
      updateddate: PropTypes.string.isRequired,
      recordstatusid: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired).isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {handleSubmit, lookups} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-9">
              <h4>Details</h4>
            </div>
            <div className="col-sm-3">
              <ButtonToolbar style={{ float: 'right' }}>
                <Button>Cancel</Button>
                <Button type="submit" bsStyle="primary">Save</Button>
              </ButtonToolbar>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2">
              <label htmlFor="title">Title</label>
              <Field name="title" component="select" className="form-control">
                <option>Title</option>
                {
                  lookups.map(lookup =>
                    <option value={lookup.lookupvalue}>{lookup.lookuptext}</option>
                  )
                }
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <Field name="firstname" label="First Name" maxLength="100" type="text" component={renderField} className="form-control" placeholder="First Name" />
            </div>
            <div className="col-xs-3">
              <Field name="middlename" label="Middle Name" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Middle Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <Field name="lastname" label="First Name" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-xs-3">
              <Field name="preferredname" label="Preferred Name" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Preferred Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <Field name="previouslyknownas" label="Previously Known As" maxLength="100" type="text" component={renderField} className="form-control" placeholder="Previously Known As" />
            </div>
            <div className="col-xs-3">
              <Field name="onenameonly" type="checkbox" className="styled" component={renderCheckbox} label="One Name Only" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
