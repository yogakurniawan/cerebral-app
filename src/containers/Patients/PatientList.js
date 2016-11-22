import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactDataGrid from 'react-data-grid';

export default class PatientList extends Component {

  componentWillMount() {
    for (let idx = 1; idx < 100; idx++) {
      this._rows.push({
        id: idx,
        task: 'Task ' + idx,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.randomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.randomDate(new Date(), new Date(2016, 0, 1))
      });
    }
  }

  _rows = []

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  }

  handleSubmit = (values) => {
    console.log(values);
  }

  columns = [
    {
      key: 'id',
      name: 'ID',
      resizable: true,
      width: 40
    },
    {
      key: 'task',
      name: 'Title',
      resizable: true
    },
    {
      key: 'priority',
      name: 'Priority',
      resizable: true
    },
    {
      key: 'issueType',
      name: 'Issue Type',
      resizable: true
    },
    {
      key: 'complete',
      name: '% Complete',
      resizable: true
    },
    {
      key: 'startDate',
      name: 'Start Date',
      resizable: true
    },
    {
      key: 'completeDate',
      name: 'Expected Complete',
      resizable: true
    }
  ]

  rowGetter = idx => (this._rows[idx])

  render() {
    return (
      <div>
        <Helmet title="Patient List" />
        <div className="row">
          <div className="col-xs-12">
            <ReactDataGrid
              columns={this.columns}
              rowGetter={this.rowGetter}
              rowsCount={this._rows.length}
              minHeight={500} />
          </div>
        </div>
      </div>
    );
  }
}
