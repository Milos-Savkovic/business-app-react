import React, { Component } from 'react';
import UserDetail from '../UserDetail/UserDetail';
import Field from '../Field/Field';
import './aboutUser.css';
import AddReport from '../AddReport/AddReport';

class AboutUser extends Component {

    state = {
        addReport: true,
    }
    clicked = () => {
        this.setState({
            addReport: true,
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
        let report = (this.state.addReport) ?
            <Field
                id={this.props.id}
                path={this.props.path}
                clicked={this.addReportHandler}
                fname={this.props.firstName}
                lname={this.props.lastName}  
                position={this.props.position}              
            /> :
            <AddReport 
                closeReport={this.closeHandler} 
                updateReportList={this.updateReportHandler}
                id={this.props.id} 
                history={this.props.history}            
            />;
        return (
            <div className="aboutUser">
                <UserDetail
                    key={this.props.id}
                    path={this.props.path}
                    id={this.props.id}
                    // email={this.props.email}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                    position={this.props.position}
                    reports={this.props.reports}
                    // description={this.props.description}
                    image={this.props.image}
                    clickedLink={this.clicked}
                    keyLocation={this.props.location.key}
                />
                {report}
            </div>
        );
    }
}

export default AboutUser;
