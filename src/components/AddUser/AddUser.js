import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp'
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
            email: '',
        },
        isAdded: false,
        close: false,
    }

    xhandler = () => {
        this.setState({
            close: true,
        });
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
        const newUser = {
            FirstName: this.state.user.firstname,
            LastName: this.state.user.lastname,
            Position: this.state.user.position,
            Email: this.state.user.email,
            Image:'',
        }
        const ref = fireDB.ref(`/users`);
        ref.push(newUser, error => {
            console.log(error);
        });
        this.setState({
            isAdded: true,
        })
    }

    render() {
        if (this.state.isAdded || this.state.close) return <Redirect to="/users" />
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
                    <FlatButton type="submit" label="Dodaj novu osobu" name="submit" style={styles.button} />
                </form>
                <div
                    className="close"
                    onClick={this.xhandler}
                >
                    X
                    </div>
            </div>
        );
    }
}

export default AddUser;