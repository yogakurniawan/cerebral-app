import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FixedDataTable from 'fixed-data-table';
import { ButtonBsV4 } from 'components/Buttons/Buttons';
import { push } from 'react-router-redux';
import dimensions from 'react-dimensions';
import GridDataListStore from 'utils/GridDataListStore';
import { loadPatients } from 'redux/modules/patients';
import commonStyles from 'common/Common.scss';

const {Table, Column, Cell} = FixedDataTable;

const DateCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col].toLocaleString()}
  </Cell>
);

const TextCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

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
      return patient;
    });
    return patients;
  }

  newPatient = () => {
    this.props.pushState('/patients/details/demographic');
  }

  render() {
    const {containerWidth, patients, isLoadingPatients} = this.props;
    let dataList = new GridDataListStore([]);
    if (patients) {
      const parsedValues = this.parsePatientData(patients);
      dataList = new GridDataListStore(parsedValues);
    }
    return (
      <div>
        <Helmet title="Patient List" />
        <div className="row" style={{ marginBottom: 10 }}>
          <div className="col-xs-12">
            <ButtonBsV4 onClick={this.newPatient}>New Patient</ButtonBsV4>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {isLoadingPatients && dataList.getSize() === 0 &&
              <div className={commonStyles.loaderBox}></div>}
            <Table
              rowHeight={40}
              headerHeight={40}
              rowsCount={dataList.getSize()}
              width={containerWidth}
              height={500}
              {...this.props}>
              <Column
                header={<Cell>Name</Cell>}
                cell={<TextCell data={dataList} col="fullname" />}
                flexGrow={1}
                width={200}
                />
              <Column
                header={<Cell>Gender</Cell>}
                cell={<TextCell data={dataList} col="gender" />}
                flexGrow={1}
                width={100}
                />
              <Column
                header={<Cell>DOB</Cell>}
                cell={<DateCell data={dataList} col="dateofbirth" />}
                flexGrow={1}
                width={100}
                />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
