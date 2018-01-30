import React, { Component } from 'react';
import { fireDB } from '../../api/firebaseApp';
import { Link } from 'react-router-dom';
import Report from './Report/Report';
import './Reports.css';

class Reports extends Component {
  state = {
    users: [],
  }
  componentWillMount() {
    fireDB.ref(`/users/`).on("value", snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    }, errorObject => {
      console.log("The read failed: " + errorObject.code);
    });
  }
  sortedArrayOfReports = (array) => {
    const reportsArr = [];
    const keys = Object.keys(array);
    keys.map(key => {
      if (array[key].Reports) {
        const reps = Object.keys(array[key].Reports)
        return reps.map(reportKey => {
          const report = array[key].Reports[reportKey];
          report.userFirstName = array[key].FirstName;
          report.userLastName = array[key].LastName;
          report.userId = key;
          report.key = reportKey;
          return reportsArr.push(report);
        });
      } else return null;
    });
    const sortedReports = reportsArr.reverse();
    return sortedReports;
  }

  render() {
    const reports = this.sortedArrayOfReports(this.state.users);
    console.log(reports);
    return (
      <div className="reports-wrapper">
        {
          reports.map(report => {
            return (
              <Link 
                to={`/users/${report.userId}/${report.key}`}
                key={report.key}
              >
                <Report
                  fname={report.userFirstName}
                  lname={report.userLastName}
                  userId={report.userId}
                  name={report.protocol}
                  date={report.date1}
                />
              </Link>
            );
          })
        }
      </div>
    );
  }
}

export default Reports;