import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import './container.css';
import Person from './Person';
import fetchUsers from '../api/Seed';
// import fetchUsers from './Seed-offline';

class Container extends Component {

    state = {
        users: [],
        newUser: false,
        userDetails: false,
        userDetailsId: [],
    }

    helper() {
        fetchUsers().then((items) => {
            this.setState({
                users: items,
            })

        });
    }

    componentDidMount() {
        this.helper();
    }

    clickHandlerDetail = (id) => {
        this.setState({
            userDetails: true,
            userDetailsId: id,
        });
        this.props.history.push(`/users/${this.state.userDetailsId}`);

    }

    clickHandler = () => {
        this.setState({
            newUser: true,
        })
        this.props.history.push(`/users/add`);
    }

    render() {
        if (this.state.newUser === true) {
            return (
                <Redirect to="/users/add" />
            )
        } else if (this.state.userDetails === true) {
            return <Redirect to={"/users/" + this.state.userDetailsId} />
        } else {
            const teamComponents = this.state.users.map((person) => (
                <Person
                    key={person.Id}
                    id={person.Id}
                    firstName={person.FirstName}
                    lastName={person.LastName}
                    position={person.Position}
                    clickHandler={this.clickHandler}
                    clickHandlerDetail={this.clickHandlerDetail}
                />
            ))

            return (
                <div className="container">
                    {teamComponents}
                </div>
            )
        }
    }
}

export default withRouter(Container);