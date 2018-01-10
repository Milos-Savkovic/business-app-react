import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire, { provider } from './firebaseApp';
import Header from './Header';
import './loginForm.css';

class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        user: null,
    }

    login = (e) => {
        e.preventDefault();

        fire.auth().signInWithPopup(provider)
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                this.setState({
                    user: result.user,
                })
            })
            .then(() => {
                fire.auth().onAuthStateChanged(() => {
                    if (this.state.user) {
                        this.setState({
                            isLoggedIn: true,
                        })
                    } else {
                        this.setState({
                            isLoggedIn: false,
                        })
                    }
                });
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
            });
    }

    render() {
        if (this.state.user) {
            return (
                <Redirect to='/users' />
            )
        } else return (
            <div className="Login">
                <form className="form-login" onSubmit={(e) => this.login(e)}>
                    <Header />
                    <button type="submit" id="button" className="btn btn-success center-block form-login button">Log in with Google</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;