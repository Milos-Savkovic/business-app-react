import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from '../api/firebaseApp'
import TextField from 'material-ui/TextField';
import { grey900, blue500, lime50 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import './addUser.css';


//Styles for inputs
const styles = {
    floatingLabelStyle: {
        color: grey900,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
    button: {
        margin: 12,
        backgroundColor: blue500,
        color: lime50,
    },
};

class AddUser extends Component {

    state = {
        user: {
            firstname: '',
            lastname: '',
            position: '',
            description: '',
            email: '',
        },
        isAdded: false,
    }

    handleInput = (e) => {
        const user = this.state.user;
        const name = e.target.name;
        const value = e.target.value;

        user[name] = value;
        this.setState({
            user
        })
    }

    setFirebase = (event) => {
        event.preventDefault();
        let ourTeam = [];
        fireDB.ref('/users').once('value')
            .then((snapshot) => {
                const team = [
                    ...snapshot.val(),
                ];
                ourTeam = team;
                console.log(ourTeam);
                return ourTeam;
            })
            .then((team) => {
                let maxId = 0;
                for (let j = 0; j < team.length; j++) {
                    if (team[j].Id > maxId) maxId = team[j].Id;
                }
                const id = maxId + 1;

                team = [
                    ...team, {
                        Description: this.state.user.description,
                        FirstName: this.state.user.firstname,
                        Id: id,
                        LastName: this.state.user.lastname,
                        Position: this.state.user.position,
                        Email: this.state.user.email,
                        Selected: true,
                    }];
                return team;
            })
            .then((team) => {
                fireDB.ref('/users').set(team);
            })
            .then(() => {
                this.setState({
                    isAdded: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (this.state.isAdded) return <Redirect to="/users" />
        return (
            <div className="add-user-container" >
                <form className="contactForm" onSubmit={this.setFirebase}>
                    <TextField
                        floatingLabelText="Ime"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={this.handleInput}
                        name="firstname"
                        required
                    /><br />
                    <TextField
                        floatingLabelText="Prezime"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={this.handleInput}
                        name="lastname"
                        required
                    /><br />
                    <TextField
                        type="email"
                        floatingLabelText="Email"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={this.handleInput}
                        name="email"
                        required
                    /><br />
                    <TextField
                        floatingLabelText="Pozicija"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={this.handleInput}
                        name="position"
                        required
                    /><br />
                    <TextField
                        floatingLabelText="Deskripcija"
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={this.handleInput}
                        name="description"
                        required
                    /><br />
                    <FlatButton type="submit" label="Dodaj novu osobu" name="submit" style={styles.button} />
                </form>
            </div>
        );
    }
}

export default AddUser;
