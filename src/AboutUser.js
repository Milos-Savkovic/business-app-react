import React, { Component } from 'react';
import UserDetail from './UserDetail';
import Field from './Field';
import './aboutUser.css';

class AboutUser extends Component {

    render() {
        return (
            <div className="aboutUser">
                <UserDetail
                    key={this.props.id}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                    position={this.props.position}
                    reports={this.props.reports}
                    description={this.props.description}
                />
                <Field />
            </div>
        );
    }
}

export default AboutUser;
