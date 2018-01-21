import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire, { provider, session } from '../../api/firebaseApp';
import Header from '../Header/Header';
import './login.css';
import googleLogo from '../../assets/images/google.png';

class Login extends Component {
    state = {
        isLoggedIn: true,
        user: '',
        token: '',
        credential: '',
    }

    componentWillMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    userInTheHouse: false,
                });
            }
            else {
                console.log(user);
                this.setState({
                    user: user,
                    token: user.refreshToken,
                });
            }
        });
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
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        if (this.state.isLoggedIn && this.state.token) {
            return (
                <Redirect to='/' />
            )
        } else
            return (
                <div className="Login">
                    <form className="form-login" onSubmit={(e) => this.login(e)}>
                        <Header />
                        <button type="submit" id="button" className="form-login">
                            <img src={googleLogo} alt="google logo" className="google-logo" />
                            <span className="login-text">Login with Google  </span>
                        </button>
                    </form>
                    <h1 className="Title">Business Trip</h1>
                </div>
            );
    }
}

export default Login;