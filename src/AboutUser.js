import React, { Component } from 'react';
import UserDetail from './UserDetail';
import Field from './Field';
// import AddReport from './AddReport';
import './aboutUser.css';

class AboutUser extends Component {

    // state = {
    //     addReport: false,
    // }

    // handleAddReport = () => {
    //     this.setState({
    //         addReport: true,
    //     })
    // }

    render() {
        // if (!AddReport) {
        return (
            <div className="aboutUser">
                <UserDetail
                    key={this.props.id}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                    position={this.props.position}
                    reports={this.props.reports}
                    description={this.props.description}
                // addReport={this.handleAddReport}
                />
                <Field />
            </div>
        );
        // } else return(
        //     <div className="aboutUser">
        //             <UserDetail
        //                 key={this.props.id}
        //                 firstName={this.props.firstName}
        //                 lastName={this.props.lastName}
        //                 position={this.props.position}
        //                 reports={this.props.reports}
        //                 description={this.props.description}
        //                 addReport={this.handleAddReport}
        //             />
        //             <AddReport />
        //         </div>
        // )
    }
}

export default AboutUser;
