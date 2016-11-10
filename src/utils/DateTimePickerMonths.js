import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

export default class DateTimePickerMonths extends Component {
  static propTypes = {
    subtractYear: PropTypes.func.isRequired,
    addYear: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showYears: PropTypes.func.isRequired,
    setViewMonth: PropTypes.func.isRequired
  }

  renderMonths = () => {
    let classes;
    let it;
    let month;
    let months;
    let monthsShort;
    month = this.props.selectedDate.month();
    monthsShort = moment.monthsShort();
    it = 0;
    months = [];
    while (it < 12) {
      classes = {
        month: true,
        'active': it === month && this.props.viewDate.year() === this.props.selectedDate.year()
      };
      months.push(<span className={classnames(classes)} key={it} onClick={this.props.setViewMonth}>{monthsShort[it]}</span>);
      it++;
    }
    return months;
  }

  render() {
    return (
    <div className="datepicker-months" style={{display: 'block'}}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th className="prev" onClick={this.props.subtractYear}>‹</th>

                <th className="switch" colSpan="5" onClick={this.props.showYears}>{this.props.viewDate.year()}</th>

                <th className="next" onClick={this.props.addYear}>›</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="7">{this.renderMonths()}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
