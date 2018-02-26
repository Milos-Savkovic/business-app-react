import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp'
import TextField from 'material-ui/TextField';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { grey900, blue500, lime50 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import './editUser.css';

//Styles for inputs
const STYLES = {
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
        width: '250px',
        fontSize: '18px!important',
    },
    arrowBack: {
        color: '#676767',
    }
};
// Sex
const GENDER = {
    male: 'muški',
    female: 'ženski',
}
//Sex images
const DEFAULT_AVATAR = {
    male: 'https://firebasestorage.googleapis.com/v0/b/business-trip-app.appspot.com/o/images%2Fdefault_avatars%2Fboy_avatar.png?alt=media&token=7cccfefe-8396-40a1-96fb-7dadf9f5ebb5',
    female: 'https://firebasestorage.googleapis.com/v0/b/business-trip-app.appspot.com/o/images%2Fdefault_avatars%2Fgirl_avatar.jpg?alt=media&token=939eb8ed-b2d6-4ace-a87d-6e638623047e',
}


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
                sex: user.Sex || GENDER.male,
                image: user.Image || ((user.Sex === GENDER.male)
                    ? DEFAULT_AVATAR.male
                    : DEFAULT_AVATAR.female),
                loading: false,
            });
        })
    }

    handleSex = (e, value) => {
        this.setState({
            sex: value,
        });
        (value === GENDER.male) ? this.setState({
            image: DEFAULT_AVATAR.male,
        }) : this.setState({
            image: DEFAULT_AVATAR.female,
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
                    <form className="contactForm padding-down" onSubmit={this.setFirebase}>
                        <div className="form-row form-row-background-grey shadow-bottom form-row-no-margin">
                            <h2 className="edit-user-name">Osnovne informacije</h2>
                        </div>
                        <div className="padding-down"></div>
                        <div className="form-row form-row-no-margin">
                            <div className="form-column-size-2">                                
                                <TextField
                                    defaultValue={this.state.user.firstname}
                                    floatingLabelText="Ime"
                                    floatingLabelStyle={STYLES.floatingLabelStyle}
                                    floatingLabelFocusStyle={STYLES.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="firstname"
                                    required
                                /><br />
                                <TextField
                                    defaultValue={this.state.user.lastname}
                                    floatingLabelText="Prezime"
                                    floatingLabelStyle={STYLES.floatingLabelStyle}
                                    floatingLabelFocusStyle={STYLES.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="lastname"
                                    required
                                /><br />
                                <TextField
                                    defaultValue={this.state.user.email}
                                    type="email"
                                    floatingLabelText="Email"
                                    floatingLabelStyle={STYLES.floatingLabelStyle}
                                    floatingLabelFocusStyle={STYLES.floatingLabelFocusStyle}
                                    onChange={this.handleInput}
                                    name="email"
                                    required
                                /><br />
                                <TextField
                                    defaultValue={this.state.user.position}
                                    floatingLabelText="Pozicija"
                                    floatingLabelStyle={STYLES.floatingLabelStyle}
                                    floatingLabelFocusStyle={STYLES.floatingLabelFocusStyle}
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
                                            label={GENDER.male}
                                            value={GENDER.male}
                                        />
                                        <RadioButton
                                            label={GENDER.female}
                                            value={GENDER.female}
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
                            <FlatButton type="submit" label="Sačuvaj izmjene" name="submit" style={STYLES.button} />
                        </div>
                    </form>
                    <div
                        className="close close-no-background"
                        onClick={this.xhandler}
                    >
                        <ArrowBack 
                            color={STYLES.arrowBack.color}
                        />
                    </div>
                </div>
            );
        }

    }
}

export default AddUser;