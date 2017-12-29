import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireAuth } from './firebaseApp';
import './registerForm.css';

class RegisterForm extends Component {
    state = {
        isLoggedIn: false
    }

    initApp = (event) => {
        event.preventDefault();
        fireAuth.createUserWithEmailAndPassword(this.email.value, this.password.value)
            .then(() => {
                console.log("USPJESNO STE REGISTROVANI!");
            })
            .then(() => {
                fireAuth.signInWithEmailAndPassword(this.email.value, this.password.value)
                    .then(() => {
                        fireAuth.onAuthStateChanged(user => {
                            this.setState({
                                isLoggedIn: true
                            })
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect from='/register' to='/users' />
            )
        } else return (
            <div className="Register">
                <div>
                    <form className="form-register" onSubmit={(e) => this.initApp(e)}>
                        <input type="email" id="register-email" placeholder="email" className="form-register input" required ref={(input) => this.email = input} />
                        <input type="password" id="register-password-first" placeholder="password" className="form-register input" required />
                        <input type="password" id="register-password" placeholder="retupe password" className="form-register input" required ref={(input) => this.password = input} />
                        <button type="submit" id="button" className="btn btn-success center-block form-register button">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
