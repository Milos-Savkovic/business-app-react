import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  {fireAuth}  from './firebaseApp';
import './loginForm.css';

class LoginForm extends Component {
    state = {
        isLoggedIn: false
    }

    initApp = (event) => {
        event.preventDefault();

        fireAuth.signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(() => {
                fireAuth.onAuthStateChanged(user => {
                    this.setState({
                        isLoggedIn: true
                    })
                });
            })
            .catch(error => {
                console.log("The password you’ve entered is incorrect.")
            })
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect from='/login' to='/users' />
            )
        } else return (
            <div className="Login">
                <div>
                    <form className="form-login" onSubmit={(e) => this.initApp(e)}>
                        <input type="email" id="login-email" placeholder="email" className="form-login input" required ref={(input) => this.email = input} />
                        <input type="password" id="login-password" placeholder="password" className="form-login input" required ref={(input) => this.password = input} />
                        <button type="submit" id="button" className="btn btn-success center-block form-login button">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
