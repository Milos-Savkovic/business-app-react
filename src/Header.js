import React, { Component } from 'react';
import logo from './logo.svg';
import logo2 from './logo2.svg';
import './header.css';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div>
                <img src={logo} className="App-logo" alt="logo" />
                <img src={logo2} className="App-logo2" alt="logo2" />
                </div>
                <h1 className="App-title">Business TRIP-App</h1>
            </header>
        );
    }
}

export default Header;
