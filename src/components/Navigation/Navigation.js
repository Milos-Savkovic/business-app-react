import React from 'react';
import fire from '../../api/firebaseApp';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { grey900, yellow400, blueGrey500 } from 'material-ui/styles/colors';
import './navigation.css';

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <div className="menu-item-right">
            <MenuItem primaryText={props.email} />
            <Avatar src={props.photo} size={50} />
            <MenuItem primaryText="Refresh" onClick={() => { window.location.reload() }} />
            <MenuItem primaryText="Sign out" onClick={props.handlelogout} />
        </div>
    </IconMenu>
);

Logged.muiName = 'IconMenu';

class Navigation extends React.Component {
    state = {
        isLoggin: true,
        userEmail: '',
        userName: '',
        photo: ''
    }
    componentWillMount() {
        this.authUser();
    }
    authUser = () => {
        let user = fire.auth().currentUser;
        if (user) {
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const displayName = user.displayName;
            console.log(user);
            this.setState({
                userEmail: userEmail,
                photo: userPhoto,
                userName: displayName,
            });
        } else this.setState({
            isLoggin: false,
        })
    }
    handlelogout = (props) => {
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
        const linkToHome = <Link to='/users'>Bussines Trip</Link>
        return (
            <AppBar
                className="material-bar"
                title={linkToHome}
                showMenuIconButton={false}
                iconElementRight={<Logged
                    handlelogout={this.handlelogout}
                    photo={this.state.photo}
                    email={this.state.userEmail}
                />}
                style={{
                    backgroundColor: 'rgb(60, 184, 255)'
                }}

            />

            // <div className="sidenav" >
            //     <div className="welcome-user">
            //         <h4>Welcome,</h4>
            //         {this.state.userEmail}
            //         <div className="picture-btn">
            //             <img className="user-image" src={this.state.photo} alt="user" />
            //             <span className="logout-btn" onClick={this.handlelogOut}>Log out</span>
            //         </div>
            //     </div>
            //     <Link to='/users'>Users</Link>
            //     <img alt='logo' className="nav-logo" src="http://jsguru.io/wp-content/uploads/2017/02/jsguru_wh_large.png" />
            // </div>
        );
    }
}

export default withRouter(Navigation);