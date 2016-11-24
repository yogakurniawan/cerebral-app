import React, { Component } from 'react';
import Helmet from 'react-helmet';
import FakeObjectDataListStore from 'utils/FakeObjectDataListStore';
import FixedDataTable from 'fixed-data-table';

const {Table, Column, Cell} = FixedDataTable;

const DateCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col].toLocaleString()}
  </Cell>
);

const LinkCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    <a href="#">{data.getObjectAt(rowIndex)[col]}</a>
  </Cell>
);

const TextCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

export default class PatientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(100),
    };
  }

  render() {
    const {dataList} = this.state;
    return (
      <div>
        <Helmet title="Patient List" />
        <div className="row">
          <div className="col-xs-12">
            <Table
              rowHeight={50}
              headerHeight={50}
              rowsCount={dataList.getSize()}
              width={1100}
              height={500}
              {...this.props}>
              <Column
                header={<Cell>First Name</Cell>}
                cell={<LinkCell data={dataList} col="firstName" />}
                width={100}
                />
              <Column
                header={<Cell>Last Name</Cell>}
                cell={<TextCell data={dataList} col="lastName" />}
                width={100}
                />
              <Column
                header={<Cell>City</Cell>}
                cell={<TextCell data={dataList} col="city" />}
                width={100}
                />
              <Column
                header={<Cell>Street</Cell>}
                cell={<TextCell data={dataList} col="street" />}
                width={200}
                />
              <Column
                header={<Cell>Zip Code</Cell>}
                cell={<TextCell data={dataList} col="zipCode" />}
                width={200}
                />
              <Column
                header={<Cell>Email</Cell>}
                cell={<LinkCell data={dataList} col="email" />}
                width={200}
                />
              <Column
                header={<Cell>DOB</Cell>}
                cell={<DateCell data={dataList} col="date" />}
                width={200}
                />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
