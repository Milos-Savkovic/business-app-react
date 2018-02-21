import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import fire, { fireDB } from '../../api/firebaseApp';
import Report from '../Report/Report';
import {Loader} from '../Loader/Loader';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui/svg-icons/content/create';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey50, grey800 } from 'material-ui/styles/colors';
// import base64Img from 'base64-img';
import './userDetail.css';

class UserDetail extends Component {

    state = {
        openAlert: false,
        key: null,
        loading: false,
    }

    click = () => {
        this.props.clickedLink();
    }

    handleOpen = (key) => {
        this.setState({ openAlert: true, key: key });
    };

    handleClose = () => {
        this.setState({ openAlert: false });
    };

    handleDelete = () => {
        fireDB.ref(`/users/${this.props.id}/Reports/${this.state.key}`).remove();
        this.setState({
            openAlert: false,
        });
    }

    handleTownName(towns) {
        if (towns[Math.floor(towns.length / 2) - 1] !== undefined) {
            return towns[Math.floor(towns.length / 2) - 1].to;
        }
        return towns[0].to;
    }

    reporter() {
        const actions = [
            <FlatButton
                label="Ne"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Da"
                secondary={true}
                onClick={this.handleDelete}
            />,
        ];
        if (this.props.reports) {
            const reports = Object.keys(this.props.reports).map(key => {
                const activeLink = this.props.path === `/users/${this.props.id}/${key}` ? 'active-link' : '';
                const report = this.props.reports[key];
                return (
                    <div className={`reportName ${activeLink}`} key={key}>
                        <NavLink
                            exact
                            key={key}
                            to={`/users/${this.props.id}/${key}`}
                            className="navLink"
                            activeClassName="active"
                            onClick={this.click}
                        >
                            <Report
                                key={report.reportName}
                                cost={report.costs}
                                reportName={this.handleTownName(report.towns)}
                                distance={report.distance}
                                dailyEarnings={report.dailyEarnings}
                                typeOfTransport={report.typeOfTransport}
                                date1={report.date1}
                                date2={report.date2}
                            />
                        </NavLink>
                        <div className="icon-menu">
                            <IconMenu
                                multiple={false}
                                iconButtonElement={
                                    <IconButton className="icon-menu-dots" ><MoreVertIcon color={grey800} /></IconButton>
                                }
                                targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            >
                                <Link to={`/users/${this.props.id}/${key}/edit`} className="underile-link"> <MenuItem primaryText="Izmijeni" leftIcon={<Create />} /></Link>
                                <MenuItem primaryText="Obriši" leftIcon={<Delete />} onClick={() => this.handleOpen(key)} />
                            </IconMenu>
                            <Dialog
                                actions={actions}
                                modal={false}
                                open={this.state.openAlert}
                                onRequestClose={this.handleDelete}
                            >
                                Da li ste sigurni da želite obrisati ovaj putni nalog?
                            </Dialog>
                        </div>
                    </div>
                );
            }).reverse();
            return (reports);
        } else return null;
    }

    handleUploadImage = (e) => {
        this.setState({
            loading: true,
        });
        try {
            const file = e.target.files[0];
            fire.storage().ref(`images/${this.props.id}`).put(file)
                .then(() => {
                    const fetchImage = fire.storage().ref(`images/${this.props.id}`).getDownloadURL();
                    fetchImage.then((url) => {
                        return (url);
                    }).then((image) => {
                        fireDB.ref(`users/${this.props.id}`).update({
                            Image: image,
                        });
                    }).then(() => {
                        this.setState({
                            loading: false,
                        });
                    })
                })
        } catch (error) {
            console.log(error);
        }
    }
    renderPicture = () => {
        if(this.state.loading) return (
            <div className="profile-pic">
                <div className="change-img-loader" >
                    <Loader />
                </div>
            </div>
        );
        else {
            return (
                <div className="profile-pic">
                    <img src={this.props.image} className="img" alt="Profile" />
                    <div className="edit">
                        <IconButton
                            onClick={() => this.fileUpload.click()}
                            tooltip="Dodajte sliku"
                            tooltipPosition="bottom-left"
                            tooltipStyles={{
                                fontSize: "14px",
                            }}>
                            <Create color={grey50} />
                        </IconButton>
                        <input type="file" ref={(fileUpload) => {
                            this.fileUpload = fileUpload;
                        }}
                            style={{ visibility: 'hidden' }}
                            onChange={(e) => this.handleUploadImage(e)} />
                    </div>
                </div>
            );
        }
    }
    render() {
         return (
            <div className="user">
                {this.renderPicture()}
                <div className="nameClass">
                    {this.props.firstName + " " + this.props.lastName}
                </div>
                <div className="positionClass">
                    {this.props.position}
                </div>
                <h4 className="reports-heading">Izvještaji</h4>
                <div className="reportsClass">
                    {this.reporter()}
                </div>
            </div>
        );
    }
}

export default UserDetail;
