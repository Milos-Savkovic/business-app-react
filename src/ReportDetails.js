import React, { Component} from 'react';
import { fireDB } from './firebaseApp';

class ReportDetails extends Component {
  state = {
    user: null
  }
  componentDidMount() {
    fireDB.ref('/users').once('value')
        .then((snapshot) => {
            const Team = [
                ...snapshot.val(),
            ];
            Team.map(item => (
                    this.setState({
                        user: item,
                    })
                ))
        })
        .catch((e) => console.log(e))
  }
  render() {
    console.log(this.state.user);
    return(
      <div>Report Details</div>
    );
  }
}

export default ReportDetails;