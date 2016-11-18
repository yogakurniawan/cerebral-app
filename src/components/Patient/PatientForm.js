import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import { connect } from 'react-redux';
import styles from 'common/Common.scss';
import patientStyles from 'containers/Patients/Patients.scss';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import patientFormValidation from './PatientFormValidation';

const Moment = require('moment');
const momentLocalizer = require('react-widgets/lib/localizers/moment');
const numberLocalizer = require('react-widgets/lib/localizers/simple-number');

momentLocalizer(Moment);
numberLocalizer();

const renderField = ({ input, label, meta: { touched, error, warning }, ...rest }) => {
  return (
    <FormGroup controlId={input.name} className={(error && touched ? ' has-error' : '')}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input} {...rest} />
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </FormGroup>
  );
};

const renderDateInput = ({ input, label, meta: { touched, error, warning }, ...rest }) => {
  return (
    <FormGroup controlId={input.name + '_input'} className={(error && touched ? 'has-error' : '')}>
      <ControlLabel>{label}</ControlLabel>
        <Field
          {...input}
          {...rest}
          id={input.name}
          time={false}
          component={DateTimePicker}
          defaultValue={null} />
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </FormGroup>
  );
};

const renderDropdown = ({ input, label, meta: { touched, error, warning }, ...rest }) => {
  const {data, valuefield, textfield, defaultvalue, ...args} = rest;
  console.log(valuefield);
  console.log(textfield);
  return (
    <FormGroup controlId={input.name + '_input'} className={(error && touched ? 'has-error' : '')}>
      <ControlLabel>{label}</ControlLabel>
        <Field
          {...input}
          {...args}
          id={input.name}
          data={data}
          component={DropdownList}
          defaultValue={parseInt(defaultvalue, 10)}
          valueField={valuefield}
          textField={textfield} />
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </FormGroup>
  );
};

const renderCheckbox = ({ input, label, meta: { touched, error, warning }, ...rest }) => {
  return (
    <div className="checkbox checkbox-primary" style={{ marginTop: 30 }}>
      <FormControl {...input} {...rest} />
      <ControlLabel>{label}</ControlLabel>
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  );
};

@connect(state => ({
  ethnicity: state.lookups.ethnicity,
  gender: state.lookups.gender,
  title: state.lookups.title
}))
@reduxForm({
  form: 'Patient',
  validate: patientFormValidation
})
export default class PatientForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    ethnicity: PropTypes.arrayOf(PropTypes.shape({
      lookupname: PropTypes.string.isRequired,
      lookupvalue: PropTypes.number.isRequired,
      lookuptext: PropTypes.string.isRequired,
      displayorder: PropTypes.number.isRequired,
      createddate: PropTypes.string.isRequired,
      updateddate: PropTypes.string.isRequired,
      recordstatusid: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired).isRequired,
    gender: PropTypes.arrayOf(PropTypes.shape({
      lookupname: PropTypes.string.isRequired,
      lookupvalue: PropTypes.number.isRequired,
      lookuptext: PropTypes.string.isRequired,
      displayorder: PropTypes.number.isRequired,
      createddate: PropTypes.string.isRequired,
      updateddate: PropTypes.string.isRequired,
      recordstatusid: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired).isRequired,
    title: PropTypes.arrayOf(PropTypes.shape({
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
    const {handleSubmit, ethnicity, title, gender} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ marginBottom: 10 }}>
            <div className="col-xs-3 col-sm-7 col-md-8">
              <h4>Details</h4>
            </div>
            <div className="col-xs-9 col-sm-5 col-md-4">
              <div className="col-xs-6 col-sm-6 col-md-6" style={{ paddingRight: 5 }}>
                <Button style={{ width: '100%' }}>Cancel</Button>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6" style={{ paddingLeft: 5 }}>
                <Button style={{ width: '100%' }} type="submit" bsStyle="primary">Save</Button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={'col-xs-12 col-sm-12 col-md-6 col-lg-6 ' + patientStyles.rightBorderWithGradient}>
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <label htmlFor="title">Title</label>
                  <Field name="title" component="select" className="form-control">
                    <option value="0">Title</option>
                    {
                      title.map(lookup =>
                        <option value={lookup.lookupvalue} key={lookup.lookupvalue}>{lookup.lookuptext}</option>
                      )
                    }
                  </Field>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <Field name="firstname" label="First Name" maxLength="100" type="text" component={renderField} placeholder="First Name" />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <Field name="middlename" label="Middle Name" maxLength="100" type="text" component={renderField} placeholder="Middle Name" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <Field name="lastname" label="Last Name" maxLength="100" type="text" component={renderField} placeholder="Last Name" />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <Field name="preferredname" label="Preferred Name" maxLength="100" type="text" component={renderField} placeholder="Preferred Name" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <Field name="previouslyknownas" label="Previously Known As" maxLength="100" type="text" component={renderField} placeholder="Previously Known As" />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <Field name="onenameonly" type="checkbox" className="styled" component={renderCheckbox} label="One Name Only" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <Field name="dateofbirth" label="Date of Birth" maxLength="100" type="text" component={renderDateInput} placeholder="Date of Birth" />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <label htmlFor="title">Gender</label>
                  <Field name="gender" component="select" className="form-control">
                    <option value="0">Gender</option>
                    {
                      gender.map(lookup =>
                        <option value={lookup.lookupvalue} key={lookup.lookupvalue}>{lookup.lookuptext}</option>
                      )
                    }
                  </Field>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <Field defaultvalue="5" label="Ethnicity" name="ethinicity" component={renderDropdown} data={ethnicity} valuefield="lookupvalue" textfield="lookuptext" />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <Field name="englishis2ndlanguage" type="checkbox" className="styled" component={renderCheckbox} label="English is a second language" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                  <Field name="notes" componentClass="textarea" rows="5" component={renderField} label="Enter Notes" placeholder="Enter Notes" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          </div>

        </form>
      </div>
    );
  }
}
