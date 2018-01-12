import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../api/firebaseApp';
import './navigation.css';

class Navigation extends Component {

    state = {
        isLoggin: true,
        userEmail: '',
        photo: ''
    }
    componentDidMount() {
        let user = fire.auth().currentUser;
        if (user) {
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const photo = userPhoto.slice(0, userPhoto.length);
            console.log(photo);
            this.setState({
                userEmail: userEmail,
                photo: userPhoto,
            });
        } else this.setState({
            isLoggin: false,
        })

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
                    <div className="wellcome-user">
                        {this.state.userEmail}
                        <img className="user-image" src={this.state.photo} alt="" />
                        <span className="logout-btn" onClick={this.handleLogOut}>Log out</span>
                        <hr className="user-separator" />
                    </div>
                    <Link to='/users'>Users</Link>
                    <img alt='logo' className="nav-logo" src="http://jsguru.io/wp-content/uploads/2017/02/jsguru_wh_large.png" />
                </div>
            );
        } else return (<Redirect to='/login' />);
    }
}

export default Navigation;
