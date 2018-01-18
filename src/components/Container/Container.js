import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import './container.css';
import Person from '../Person/Person';
import fetchUsers from '../../api/Seed';
import Paper from 'material-ui/Paper';
// import fetchUsers from './Seed-offline';

const style = {
    height: 350,
    width: 250,
    margin: 20,
    textAlign: 'center',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

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
                <Paper style={style} zDepth={3} >
                    <Person
                        key={person.Id}
                        id={person.Id}
                        firstName={person.FirstName}
                        lastName={person.LastName}
                        position={person.Position}
                        clickHandler={this.clickHandler}
                        clickHandlerDetail={this.clickHandlerDetail}
                    />
                </Paper>
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