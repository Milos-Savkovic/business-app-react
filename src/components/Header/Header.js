import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import logo2 from '../../assets/images/logo2.svg';
import './header.css';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div>
                <img src={logo} className="App-logo" alt="logo" />
                <img src={logo2} className="App-logo2" alt="logo2" />
                </div>
            </header>
        );
    }
}

export default Header;
