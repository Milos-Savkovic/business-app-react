import React, { Component } from 'react';
import { fireDB } from './firebaseApp';
import Navigation from './Navigation';
import AboutUser from './AboutUser';
import './about.css';

class About extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        const id = + this.props.match.params.id;
        fireDB.ref('/users').once('value')
            .then((snapshot) => {
                const Team = [
                    ...snapshot.val(),
                ];
                Team.filter(item => item.Id === id)
                    .map(item => {
                        this.setState({
                            user: item,
                        })
                    })
            })
            .catch((e) => console.log(e))
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
                />
            )
        }
    }

    render() {
        return (
            <div className="about" >
                <Navigation />
                {this.about()}
            </div>
        );
    }
}

export default About;
