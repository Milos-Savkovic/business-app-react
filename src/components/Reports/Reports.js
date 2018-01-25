import React, { Component } from 'react';
import { fireDB } from '../../api/firebaseApp';

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

  render() {
    const reportsArr = [];
    const users = this.state.users;
    const keys = Object.keys(users);
    const reports = keys.map(key => {
      if (users[key].Reports) {
        const reps = Object.keys(users[key].Reports)
        reps.map(reportKey => {
          users[key].Reports[reportKey].userFirstName = users[key].FirstName;
          users[key].Reports[reportKey].userLastName = users[key].LastName;
          users[key].Reports[reportKey].userId = key;
          users[key].Reports[reportKey].key = reportKey;
          reportsArr.push(users[key].Reports[reportKey]);
        });
      } else return null;
      // return reportsArr;
    });
    console.log(users);
    console.log(reportsArr);
    return (
      <div>
        {
          reportsArr.map(report => {
            return (
              <div key={report.key}>{report.reportName}</div>
            );
          })
        }
      </div>
    );
  }
}

export default Reports;