import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

class Navigation extends Component {

    render() {
        return (
            <div className="sidenav">
                <Link to='/users'>Users</Link>
                <img alt='logo' className="nav-logo" src="http://jsguru.io/wp-content/uploads/2017/02/jsguru_wh_large.png" />
            </div>
        );
    }
}

export default Navigation;
