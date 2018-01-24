import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import './container.css';
import Person from '../Person/Person';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import { grey700 } from 'material-ui/styles/colors';
import fetchUsers from '../../api/Seed';
import Paper from 'material-ui/Paper';
// import fetchUsers from './Seed-offline';

const style = {
    height: 400,
    width: 320,
    margin: 20,
    textAlign: 'center',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

class Container extends Component {

    state = {
        users: [],
        newUser: false,
        userDetails: false,
        userDetailsId: [],
    }

    helper() {
        fetchUsers().on("value", snapshot => {
            this.setState({
                users: snapshot.val(),
            });
        }, errorObject => {
            console.log("The read failed: " + errorObject.code);
        });
    }

    componentWillMount() {
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
            const teamComponents = this.state.users;

            const myData = Object.keys(teamComponents).map(key => {
                return (
                    <Paper key={key} style={style} zDepth={0} className="material-paper">
                        <Person
                            id={key}
                            firstName={teamComponents[key].FirstName}
                            lastName={teamComponents[key].LastName}
                            position={teamComponents[key].Position}
                            clickHandlerDetail={this.clickHandlerDetail}
                        />
                    </Paper>
                )
            })

            return (
                <div className="container">
                    <div className="users-heading">
                        <h3>Users</h3>
                        <IconButton
                            onClick={this.clickHandler}
                            className="add-person-icon-container"
                            tooltip="Add User"
                            touch={true}
                            tooltipPosition="bottom-left"
                        >
                            <PersonAdd
                                className="add-person-icon"
                                color={grey700}
                            />
                        </IconButton>
                    </div>
                    {myData}
                </div>
            )
        }
    }
}

export default withRouter(Container);