import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire, { provider } from '../api/firebaseApp';
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
        return fire.auth().signInWithPopup(provider)
            .then(result => {
                var token = result.credential.accessToken;
                // The signed-in user info.
                var credential = result.credential;
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