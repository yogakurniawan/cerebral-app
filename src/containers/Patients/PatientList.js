import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import FixedDataTable from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonBsV4 } from 'components/Buttons/Buttons';
import { push } from 'react-router-redux';
import dimensions from 'react-dimensions';
// import GridDataListStore from 'utils/GridDataListStore';
import { loadPatients } from 'redux/modules/patients';
import commonStyles from 'common/Common.scss';
import moment from 'moment';

// const {Table, Column, Cell} = FixedDataTable;

// const DateCell = ({ rowIndex, data, col, ...props }) => (
//   <Cell {...props}>
//     {data.getObjectAt(rowIndex)[col].toLocaleString()}
//   </Cell>
// );

// const TextCell = ({ rowIndex, data, col, ...props }) => (
//   <Cell {...props}>
//     {data.getObjectAt(rowIndex)[col]}
//   </Cell>
// );

@connect((state) => ({
  isLoadingPatients: state.patients.loading,
  patients: state.patients.patients,
  gender: state.lookups.gender
}), { pushState: push, loadPatients })
@dimensions()
export default class PatientList extends Component {
  static propTypes = {
    patients: PropTypes.array,
    isLoadingPatients: PropTypes.bool.isRequired,
    pushState: PropTypes.func.isRequired,
    loadPatients: PropTypes.func.isRequired,
    containerWidth: PropTypes.number.isRequired,
    gender: PropTypes.arrayOf(PropTypes.shape({
      lookupname: PropTypes.string.isRequired,
      lookupvalue: PropTypes.number.isRequired,
      lookuptext: PropTypes.string.isRequired,
      displayorder: PropTypes.number.isRequired,
      createddate: PropTypes.string.isRequired,
      updateddate: PropTypes.string.isRequired,
      recordstatusid: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired).isRequired
  };

  componentWillMount() {
    this.props.loadPatients();
  }

  parsePatientData = (patients) => {
    const genderLookup = this.props.gender;
    patients.map((patient) => {
      const gender = parseInt(patient.gender, 10);
      if (!isNaN(gender)) {
        const filterByGender = genderLookup.filter((object) => {
          return gender === object.lookupvalue;
        });
        patient.gender = filterByGender[0].lookuptext;
      }
      patient.dateofbirth = moment(patient.dateofbirth).format('DD/MM/YYYY');
      return patient;
    });
    return patients;
  }

  newPatient = () => {
    this.props.pushState('/patients/details/demographic');
  }

  render() {
    const {patients, isLoadingPatients} = this.props;
    let dataList = [];
    if (patients) {
      const parsedValues = this.parsePatientData(patients);
      dataList = parsedValues;
    }
    return (
      <div>
        <Helmet title="Patient List" />
        <div className="row" style={{ marginBottom: 10 }}>
          <div className="col-xs-12">
            <ButtonBsV4 onClick={this.newPatient}>New Patient</ButtonBsV4>
          </div>
        </div>
        <BootstrapTable data={dataList}>
          <TableHeaderColumn dataField="id" isKey>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField="fullname">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="gender">Gender</TableHeaderColumn>
          <TableHeaderColumn dataField="dateofbirth">DOB</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
