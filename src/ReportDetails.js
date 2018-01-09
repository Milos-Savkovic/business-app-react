import React, { Component } from 'react';
import { fireDB } from './firebaseApp';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  printReport = () => {
    const divToPrint = document.getElementById('report');
    html2canvas(divToPrint)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("a4.pdf");
      })
      .catch(err => console.log(err))
      ;
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
        <div>
          <div className="report-container" id="report">
            <div className="report-row"><strong>Report Name: </strong><i>{report.reportName}</i></div>
            <div className="report-row"><strong>Daily Earnings: </strong><i>{report.dailyEarnings}</i></div>
            <div className="report-row"><strong>Type of transport: </strong><i>{report.typeOfTransport}</i></div>
            <div className="report-row"><strong>Distance: </strong><i>{report.distance}</i></div>
            <div className="report-row"><strong>Start: </strong><i>{report.date1}</i></div>
            <div className="report-row"><strong>End: </strong><i>{report.date2}</i></div>
            <div className="report-row"><strong>Costs: </strong><i>{report.costs}</i></div>
          </div>
          <button
            className="printReportBtn"
            onClick={this.printReport}
          >
            &#128438;
        </button>
        </div>
      );
    } else {
      return (
        <div className="load-bar">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      );
    }
  }
}

export default ReportDetails;