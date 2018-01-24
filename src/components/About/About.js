import React, { Component } from 'react';
import { fireDB } from '../../api/firebaseApp';
import AboutUser from '../AboutUser/AboutUser';
import './about.css';

class About extends Component {

    state = {
        user: null,
        id: this.props.match.params.id,
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fireDB.ref(`/users/${this.state.id}`).on("value", snapshot => {
            this.setState({
                user: snapshot.val(),
            });
        }, errorObject => {
            console.log("The read failed: " + errorObject.code);
        });
    }
    updateReportList = () => {
        this.fetchData();
    }

    about() {
        if (this.state.user) {
            return (
                <AboutUser
                    key={this.state.id}
                    id={this.state.id}
                    firstName={this.state.user.FirstName}
                    lastName={this.state.user.LastName}
                    position={this.state.user.Position}
                    reports={this.state.user.Reports}
                    description={this.state.user.Description}
                    path={this.props.location.pathname}
                    history={this.props.history}
                    location={this.props.location}
                    addReportToList={this.updateReportList}
                />
            )
        }
    }

    render() {
        return (
            <div className="container-about" >
                {this.about()}
            </div>
        );
    }
}

export default About;
