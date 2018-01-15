import React from 'react';
import fire from '../api/firebaseApp';
import { Link, withRouter } from 'react-router-dom';

import './navigation.css';

class Navigation extends React.Component {
    state = {
        isLoggin: true,
        userEmail: '',
        photo: ''
    }
    // componentWillMount() {
    //   let user = fire.auth().currentUser;
    //   if (user) {
    //     const userEmail = user.email;
    //     const userPhoto = user.photoURL;
    //     const photo = userPhoto.slice(0, userPhoto.length);
    //     console.log(photo);
    //     this.setState({
    //       isLoggin: true,
    //       userEmail: userEmail,
    //       photo: userPhoto,
    //     });
    //   } else this.setState({
    //     isLoggin: false,
    //   })

    // }
    componentWillMount() {
        this.authUser();
    }
    authUser = () => {
        let user = fire.auth().currentUser;
        if (user) {
            const userEmail = user.email;
            const userPhoto = user.photoURL;
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
            this.setState({
                isLoggin: false,
            });
            this.props.logout();
            this.props.history.push('/login');
        }).catch((error) => {
            console.log("Error in log out.");
        });
    }
    render() {
        return (
            <div className="sidenav" >
                <div className="wellcome-user">
                    <img className="user-image" src={this.state.photo} alt="user" />
                    {this.state.userEmail}
                    <span className="logout-btn" onClick={this.handleLogOut}>Log out</span>
                    {/*<hr className="user-separator" />*/}
                </div>
                <Link to='/users'>Users</Link>
                <img alt='logo' className="nav-logo" src="http://jsguru.io/wp-content/uploads/2017/02/jsguru_wh_large.png" />
            </div>
        );
    }
}

export default withRouter(Navigation);
