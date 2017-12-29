import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Header from './Header';

class Login extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <LoginForm />
            </div>
        );
    }
}

export default Login;