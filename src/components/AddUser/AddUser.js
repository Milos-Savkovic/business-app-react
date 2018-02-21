import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp'
import TextField from 'material-ui/TextField';
import { grey900, blue500, lime50 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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
        sex: 'muški',
        isAdded: false,
        close: false,
        image: 'https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png',
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

    handleSex = (e, value) => {
        this.setState({
            sex: value,
        });
        (value === "muški") ? this.setState({
            image: 'https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png',
        }) : this.setState({
            image: 'https://i.pinimg.com/474x/4b/5d/19/4b5d1954fbb5b6bad18f0ac25c4ab3c3--free-avatars-create-your-own-avatar.jpg',
        });
    }

    setFirebase = (event) => {
        event.preventDefault();
        const newUser = {
            FirstName: this.state.user.firstname,
            LastName: this.state.user.lastname,
            Position: this.state.user.position,
            Email: this.state.user.email,
            Sex: this.state.sex,
            Image: this.state.image,
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
                    <div className="radio-button-sex">
                        <p>Pol : </p>
                        <RadioButtonGroup
                            name="sex"
                            onChange={this.handleSex}
                            defaultSelected={this.state.sex}
                        >
                            <RadioButton
                                label="muški "
                                value="muški"
                            />
                            <RadioButton
                                label="ženski"
                                value="ženski"
                            />
                        </RadioButtonGroup>
                    </div>
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