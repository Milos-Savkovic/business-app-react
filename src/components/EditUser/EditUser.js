import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp'
import TextField from 'material-ui/TextField';
import { grey900, blue500, lime50 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import './editUser.css';

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
        sex: '',
        image: '',
        isAdded: false,
        loading: true,
        close: false,
    }
    componentWillMount() {
        this.getFireBase();
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
    getFireBase = () => {
        fireDB.ref(`/users/${this.props.match.params.id}`).once('value').then(snapshot => {
            const user = snapshot.val();
            this.setState({
                user: {
                    firstname: user.FirstName,
                    lastname: user.LastName,
                    position: user.Position,
                    email: user.Email,
                },
                sex: user.Sex || 'muški',
                image: user.Image || (user.Sex === 'muški')
                    ? 'https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png'
                    : 'https://i.pinimg.com/474x/4b/5d/19/4b5d1954fbb5b6bad18f0ac25c4ab3c3--free-avatars-create-your-own-avatar.jpg',
                loading: false,
            });
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
        const ref = fireDB.ref(`/users/${this.props.match.params.id}`);
        ref.update(newUser);
        this.setState({
            isAdded: true,
        })
    }

    render() {
        console.log(this.state);
        if (this.state.isAdded || this.state.close) return <Redirect to="/users" />
        if (this.state.loading) return (
            <div className="load-bar">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        );
        else {
            return (
                <div className="add-user-container" >
                    <form className="contactForm" onSubmit={this.setFirebase}>
                        <div className="form-row">
                            <div className="form-column-size-2">
                                <p className="form-gender-heading">Osnovne informacije</p>
                                <TextField
                                    defaultValue={this.state.user.firstname}
                                    floatingLabelText="Ime"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="firstname"
                                    required
                                /><br />
                                <TextField
                                    defaultValue={this.state.user.lastname}
                                    floatingLabelText="Prezime"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="lastname"
                                    required
                                /><br />
                                <TextField
                                    defaultValue={this.state.user.email}
                                    type="email"
                                    floatingLabelText="Email"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="email"
                                    required
                                /><br />
                                <TextField
                                    defaultValue={this.state.user.position}
                                    floatingLabelText="Pozicija"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="position"
                                    required
                                />
                            </div>
                            <div className="form-column-size-2">
                                <p className="form-gender-heading">Pol</p>
                                <div className="radio-button-sex radio-buttons-container">
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
                                <div className="avatar-container">
                                    <p className="form-gender-heading">Avatar</p>
                                    <img src={this.state.image} className="avatar-img" alt="avatar" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <FlatButton type="submit" label="Sačuvaj izmjene" name="submit" style={styles.button} />
                        </div>
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
}

export default AddUser;