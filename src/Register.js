import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Header from './Header';

class Register extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <RegisterForm />
            </div>
        );
    }
}

export default Register;