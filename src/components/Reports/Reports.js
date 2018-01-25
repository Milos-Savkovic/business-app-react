import React, {Component} from 'react';
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
    if (this.state.users) {
      const users = this.state.users;
      const keys = Object.keys(users);
      const reportsArr = [];
      const reports = keys.map(key => {
        if(users[key].Reports) {
          const reps = Object.keys(users[key].Reports)        
          reps.map(reportKey => {
            reportsArr.push(users[key].Reports[reportKey]);
          });
        } else return null;
        // return reportsArr;
      });
      console.log(reportsArr);
    }    
    return ( 
      <h1>Reports</h1>
    );
  }
}

export default Reports;