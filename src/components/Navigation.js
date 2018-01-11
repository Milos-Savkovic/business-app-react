import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../api/firebaseApp';
import './navigation.css';

class Navigation extends Component {

    state = {
        isLoggin: true,
    }

    handleLogOut = () => {
        fire.auth().signOut().then(() => {
            console.log("LOG OUT!");
            this.setState({
                isLoggin: false,
            })
        }).catch((error) => {
            console.log("Error in log out.");
        });
    }
    render() {
        if (this.state.isLoggin) {
            return (
                <div className="sidenav">
                    <a onClick={this.handleLogOut}>LogOut</a>
                    <Link to='/users'>Users</Link>
                    <img alt='logo' className="nav-logo" src="http://jsguru.io/wp-content/uploads/2017/02/jsguru_wh_large.png" />
                </div>
            );
        } else return (<Redirect to='/login' />);
    }
}

export default Navigation;
