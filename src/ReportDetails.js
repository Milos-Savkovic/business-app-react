import React, { Component } from 'react';
import { fireDB } from './firebaseApp';
import './ReportDetails.css';

class ReportDetails extends Component {
  state = {
    user: null
  }
  componentWillMount() {
    fireDB.ref('/users').once('value')
      .then((snapshot) => {
        const Team = [
          ...snapshot.val(),
        ];
        Team.filter(item => item.Id === this.props.id)
          .map(item => (
            this.setState({
              user: item,
            })
          ))
        // console.log(this.props);
      })
      .catch((e) => console.log(e))
  }
  render() {
    const giveMeReport = () => {
      const arrayFromUrl = this.props.path.split('/');
      const repName = arrayFromUrl.pop();
      const reportArr = this.state.user.Reports.filter(rep => rep.reportName === repName);
      const reportObj = reportArr.pop();
      return reportObj;
    }
    if (this.state.user) {
      const report = giveMeReport();
      return (
        <div className="report-container">
          <div className="report-row"><strong>Report Name: </strong><i>{report.reportName}</i></div>
          <div className="report-row"><strong>Daily Earnings: </strong><i>{report.dailyEarnings}</i></div>
          <div className="report-row"><strong>Type of transport: </strong><i>{report.typeOfTransport}</i></div>
          <div className="report-row"><strong>Distance: </strong><i>{report.distance}</i></div>
          <div className="report-row"><strong>Start: </strong><i>{report.date1}</i></div>
          <div className="report-row"><strong>End: </strong><i>{report.date2}</i></div>
          <div className="report-row"><strong>Costs: </strong><i>{report.costs}</i></div>
        </div>
      );
    } else {
      return (
        <div class="load-bar">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      );
    }
  }
}

export default ReportDetails;