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
    clicked = () => {
        this.setState({
            addReport: true
        })
    }
    addReportHandler = () => {
        this.setState({
            addReport: false,
        });
    }
    closeHandler = () => {
        this.props.history.push(this.props.history.goBack());
        this.setState({
            addReport: true,
        });
    }
    updateReportHandler = () => {
        this.setState({
            addReport: true,
        });
        this.props.history.replace(`/users/${this.props.id}`);
        this.props.addReportToList();
    }

    render() {
        console.log(this.props);
        let report = (this.state.addReport) ?
            <Field
                id={this.props.id}
                path={this.props.path}
                clicked={this.addReportHandler}
            /> :
            <AddReport 
                closeReport={this.closeHandler} 
                updateReportList={this.updateReportHandler}
                id={this.props.id} 
                history={this.props.history}            
            />;
        // if (this.props.location.pathname === `/users/${this.props.id}/new-report`) {
        //     report = <AddReport closeReport={this.closeHandler} />;
        // }
        return (
            <div className="aboutUser">
                <UserDetail
                    key={this.props.id}
                    id={this.props.id}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                    position={this.props.position}
                    reports={this.props.reports}
                    description={this.props.description}
                    clickedLink={this.clicked}
                />
                {report}
            </div>
        );
    }
}

export default AboutUser;
