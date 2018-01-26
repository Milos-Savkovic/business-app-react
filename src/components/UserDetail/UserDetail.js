import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import fire from '../../api/firebaseApp';
import { getImage } from '../../api/getImage';
import Report from '../Report/Report';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui/svg-icons/content/create';
import { grey50 } from 'material-ui/styles/colors';
// import base64Img from 'base64-img';
import './userDetail.css';

class UserDetail extends Component {

    state = {
        image: null,
    }

    click = () => {
        this.props.clickedLink();
    }
    reporter() {
        if (this.props.reports) {
            const reports = Object.keys(this.props.reports).map(key => {
                return (
                    <NavLink
                        exact
                        key={key}
                        to={`/users/${this.props.id}/${key}`}
                        className="navLink"
                        activeClassName="active"
                        onClick={this.click}
                    >
                        <Report
                            userId={this.props.id}
                            id={key}
                            key={this.props.reports[key].reportName}
                            cost={this.props.reports[key].costs}
                            reportName={this.props.reports[key].towns[0].to}
                            distance={this.props.reports[key].distance}
                            dailyEarnings={this.props.reports[key].dailyEarnings}
                            typeOfTransport={this.props.reports[key].typeOfTransport}
                            date1={this.props.reports[key].date1}
                            date2={this.props.reports[key].date2}
                        />
                    </NavLink>
                );
            }).reverse();
            return (reports);
        } else return null;
    }

    handleUploadImage = (e) => {
        try {
            console.log(this.props.id)
            const file = e.target.files[0];
            const storageRef = fire.storage().ref(`images/${this.props.id}`).put(file);
            console.log(storageRef);
            console.log("Successfully added new picture.");
            // window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    componentWillMount() {
        try {
            getImage(this.props.id)
                .then((url) => {
                    this.setState({
                        image: url,
                    });
                }).catch(error => {
                    this.setState({
                        image:"https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png",
                    })
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    render() {    
        console.log(this.props);
        return (
            <div className="user">
                <div className="profile-pic">
                    <img src={this.state.image} className="img" alt="Profile" />
                    <div className="edit">
                        <IconButton
                            onClick={() => this.fileUpload.click()}
                            tooltip="Edit image"
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
                <div className="nameClass">
                    {this.props.firstName + " " + this.props.lastName}
                </div>
                <div className="emailClass">
                    {this.props.email}
                </div>
                <div className="positionClass">
                    {this.props.position}
                </div>
                <div className="descriptionClass">
                    {this.props.description}
                </div>
                <h4 className="reports-heading">Reports</h4>
                <div className="reportsClass">
                    {this.reporter()}
                </div>
            </div>
        );
    }
}

export default UserDetail;
