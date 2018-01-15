import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire, { provider, session } from '../api/firebaseApp';
import Header from './Header';
import './loginForm.css';
import googleLogo from '../assets/images/google.png';

class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        user: null,
        // token: '',
        // username: ''
    }

    login = (e) => {
        e.preventDefault();
        session
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return fire.auth().signInWithPopup(provider)
                    .then(result => {
                        console.log(result);
                        this.setState({
                            // token: result.credential.accessToken,
                            user: result.user,
                            isLoggedIn: true,
                            // username: result.user.displayName,
                        });
                    })
                    .catch(error => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // const email = error.email;
                        // const credential = error.credential;
                        console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });

    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect to='/users' />
            )
        } else return (
            <div className="Login">
                <form className="form-login" onSubmit={(e) => this.login(e)}>
                    <Header />
                    <img src={googleLogo} alt="google logo" className="google-logo" />
                    <button type="submit" id="button" className="btn btn-success center-block form-login button">Log in with Google</button>
                </form>
                <h1 className="Title">Business Trip</h1>
            </div>
        );
    }
}

export default LoginForm;