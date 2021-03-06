import React, { Component } from 'react';
import fire from '../../api/firebaseApp';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey50 } from 'material-ui/styles/colors';
import './navigation.css';
import Drawer from 'material-ui/Drawer';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import People from 'material-ui/svg-icons/social/people';
import Reports from 'material-ui/svg-icons/image/filter-none';
import Divider from 'material-ui/Divider';
import logo from '../../assets/images/js-logo.png';

class Logged extends Component {
    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon color={grey50} /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <div className="menu-item-right">
                    <MenuItem primaryText={this.props.email} />
                    <Avatar src={this.props.photo} size={50} />
                    {/*<MenuItem primaryText="Osvježi" onClick={() => { window.location.reload() }} />*/}
                    <MenuItem primaryText="Odjavite se" onClick={this.props.handlelogout} />
                </div>
            </IconMenu>
        );
    }
}

class Navigation extends Component {
    state = {
        userEmail: '',
        userName: '',
        photo: '',
        open: false,
    }
    componentDidMount() {
        this.authUser();
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });
    authUser = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                const userEmail = user.email;
                const userPhoto = user.photoURL;
                const displayName = user.displayName;
                this.setState({
                    userEmail: userEmail,
                    photo: userPhoto,
                    userName: displayName,
                });
            } else {
                console.log('Niste prijavljeni.')
            }
        });
    }
    handlelogout = (props) => {
        fire.auth().signOut().then(() => {
            // this.props.logout();
            this.props.history.push('/login');
        }).catch((error) => {
            console.log("Error in log out.");
        });
    }

    render() {
        const linkToHome = <Link to='/users' style={{display: 'flex', alignItems: 'center'}}>
                                Business Trip
                            </Link>
        const appLogo = <img src={logo} className="drawer-logo" alt="logo" />;
        return (
            <div>
                <AppBar
                    className="material-bar"
                    title={linkToHome}
                    showMenuIconButton={true}
                    onLeftIconButtonClick={this.handleToggle}
                    iconElementRight={<Logged
                        handlelogout={this.handlelogout}
                        photo={this.state.photo}
                        email={this.state.userEmail}
                    />}
                    style={{
                        backgroundColor: 'rgb(23, 142, 244)'
                    }}

                />
                <Drawer
                    className="drawer"
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <Link to="/users"><MenuItem primaryText="Zaposleni" leftIcon={<People />} onClick={this.handleClose} /></Link>
                    <Link to="/users/add"><MenuItem primaryText="Novi zaposleni" leftIcon={<PersonAdd />} onClick={this.handleClose} /></Link>
                    <Link to="/reports">
                        <MenuItem
                            primaryText="Izvještaji"
                            leftIcon={<Reports />}
                            onClick={this.handleClose}
                        />
                    </Link>
                    <Divider />
                    <Link to={`http://jsguru.io/`} target="_blank" >{appLogo}</Link>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(Navigation);