import React, { Component } from 'react';
import './navigation.css';

class Navigation extends Component {

    render() {
        return (
            <div className="sidenav">
                <a>Reports</a>
                <a>Services</a>
                <a>Clients</a>
                <img alt='logo' className="nav-logo" src="http://jsguru.io/wp-content/uploads/2017/02/jsguru_wh_large.png" />
            </div>
        );
    }
}

export default Navigation;
