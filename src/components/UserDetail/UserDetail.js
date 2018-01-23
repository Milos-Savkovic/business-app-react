import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import fire from '../../api/firebaseApp';
import Report from '../Report/Report';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui/svg-icons/content/create';
import { grey50 } from 'material-ui/styles/colors';
import './userDetail.css';

class UserDetail extends Component {

    state = {
        picture: null,
    }

    click = () => {
        this.props.clickedLink();
    }
    reporter() {
        const reportsArray = [];
        if (this.props.reports) {
            for (let i in this.props.reports) {
                reportsArray.push(this.props.reports[i]);
            }
            const reports = reportsArray.map((item) => (
                <NavLink
                    exact
                    key={item.id}
                    to={`/users/${this.props.id}/${item.id}`}
                    className="navLink"
                    activeClassName="active"
                    onClick={this.click}
                >
                    <Report
                        cost={item.costs}
                        reportName={item.reportName}
                        distance={item.distance}
                        dailyEarnings={item.dailyEarnings}
                        typeOfTransport={item.typeOfTransport}
                        date1={item.date1}
                        date2={item.date2}
                    />
                </NavLink>
            )).reverse();
            return (reports)
        } else return null;
    }

    handleUploadImage = (e) => {
        try {
            const file = e.target.files[0];
            const storageRef = fire.storage().ref(`images/${this.props.id}`).put(file);
            console.log(storageRef);
            console.log("Successfully added new picture.");
        } catch (error) {
            console.log(error);
        }
    }

    componentWillMount() {
        try {
            const p = fire.storage().ref(`images/${this.props.id}`).getDownloadURL().then(url => {
                this.setState({
                    picture: url,
                });
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let picture;
        if (this.state.picture) picture = this.state.picture;
        else picture = "https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png";

        return (
            <div className="user">
                <div className="profile-pic">
                    <img src={picture} className="img" alt="Profile" />
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
