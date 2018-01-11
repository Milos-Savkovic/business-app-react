import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Report from './Report';
import './userDetail.css';

class UserDetail extends Component {
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
                    key={item.date1+item.reportName}
                    to={`/users/${this.props.id}/${item.date1}/${item.reportName}`}
                    className="navLink"
                    activeClassName="active"
                    onClick={this.click}
                >
                    <Report
                        const={item.costs}
                        reportName={item.reportName}
                        distance={item.distance}
                        dailyEarnings={item.dailyEarnings}
                        typeOfTransport={item.typeOfTransport}
                        date1={item.date1}
                        date2={item.date2}
                    />
                </NavLink>
            ))
            return (reports)
        } else return null;
    }

    render() {
        return (
            <div className="user">
                <img src="https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png" className="img" alt="Jane" />
                <div className="nameClass">
                    {this.props.firstName + " " + this.props.lastName}
                </div>
                <div className="positionClass">
                    {this.props.position}
                </div>
                <div className="descriptionClass">
                    {this.props.description}
                </div>
                <hr className="description-separator" />
                <div className="reportsClass">
                    {this.reporter()}
                </div>
                {/*<button className="buttonAdd"> <span className="buttonSpan">+</span> </button>*/}
            </div>
        );
    }
}

export default UserDetail;
