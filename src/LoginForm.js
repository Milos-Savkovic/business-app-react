import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire, { provider } from './firebaseApp';
// import Auth from './Auth';
import Header from './Header';
import './loginForm.css';

class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        user: null,
        token: '',
    }

    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithPopup(provider)
            .then(result => {
                this.setState({
                    result: result,
                    token: result.credential.accessToken,
                    user: result.user,
                    isLoggedIn: true,
                });
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
            });
    }

    render() {
        console.log(this.state.user);
        console.log(this.state.token);
        console.log(this.state.isLoggedIn);
        if (this.state.isLoggedIn) {
            return (
                <Redirect to='/users' />
            )
        } else return (
            <div className="Login">
                <form className="form-login" onSubmit={(e) => this.login(e)}>
                    <Header />
                    <button type="submit" id="button" className="btn btn-success center-block form-login button">Log in with Google</button>
                </form>
                <h1 className="Title">Business Trip-app</h1>
            </div>
        );
    }
}

export default LoginForm;