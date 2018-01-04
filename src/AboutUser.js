import React, { Component } from 'react';
import UserDetail from './UserDetail';
import Field from './Field';
// import AddReport from './AddReport';
import './aboutUser.css';
import AddReport from './AddReport';

class AboutUser extends Component {

    state = {
        addReport: true,
    }

    // handleAddReport = () => {
    //     this.setState({
    //         addReport: true,
    //     })
    // }
    addReportHandler = () => {
        this.setState({
            addReport: false
        })
    }
    closeHandler = () => {
        this.props.history.push(`/users/${this.props.id}`);
        this.setState({
            addReport: true
        })
    }

    render() {
        let report = (this.state.addReport) ?
            <Field path={this.props.path} clicked={this.addReportHandler} /> :
            <AddReport closeReport={this.closeHandler} />;
        if(this.props.location.pathname === `/users/${this.props.id}/new-report`) {
            report = <AddReport closeReport={this.closeHandler} />;
        }
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
                {report}
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
