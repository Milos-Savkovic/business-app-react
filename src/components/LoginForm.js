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
        token: '',
        credential: '',
        // username: ''
    }

    login = (e) => {
        e.preventDefault();
        session
            .then(() => {
                return fire.auth().signInWithPopup(provider)
                    .then(result => {
                        const token = result.credential.accessToken;
                        const credential = result.credential;
                        this.setState({
                            token: token,
                            user: result.user,
                            isLoggedIn: true,
                            credential: credential,
                            // username: result.user.displayName,
                        });
                    })
                    .catch(error => {
                        const errorCode = error.code;
                        const errorMessage = error.message;``
                        console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    render() {
        if (this.state.isLoggedIn && this.state.token) {
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