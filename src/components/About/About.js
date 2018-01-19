import React, { Component } from 'react';
import { fireDB } from '../../api/firebaseApp';
import AboutUser from '../AboutUser/AboutUser';
import uuidv4 from 'uuid/v4';
import './about.css';

class About extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData = () => {
        const id =  this.props.match.params.id;
        fireDB.ref('/users').once('value')
            .then((snapshot) => {
                const Team = [
                    ...snapshot.val(),
                ];
                Team.filter(item => item.Id === id)
                    .map(item => (
                        this.setState({
                            user: item,
                        })
                    ))
            })
            .catch((e) => console.log(e))
    }
    updateReportList = () => {
        this.fetchData();
    }

    about() {
        if (this.state.user) {
            return (
                <AboutUser
                    key={this.state.user.Id}
                    id={this.state.user.Id}
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
            <div className="about" >                
                {this.about()}
            </div>
        );
    }
}

export default About;
