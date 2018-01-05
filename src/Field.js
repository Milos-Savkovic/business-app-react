import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ReportDetails from './ReportDetails';
import './field.css';

class Field extends Component {

    clickHandler = () => {
        this.props.clicked();
    }
    render() {
        console.log(this.props)
        return (
            <div className="fieldBack-container">
                <div className="fieldBack">
                    <h3 className="fieldTitle">Add new report</h3>
                    <Link
                        to={`/users/${this.props.id}/new-report`}
                        onClick={this.clickHandler}
                    >
                        <div
                            className="fieldButton"
                        >
                            <strong className="fieldPlus" >+</strong>
                        </div>
                    </Link>
                </div>
                <hr className='separator'/>
                <Route
                    path={`/users/:id/reports/:reportName`}
                    render={() => <ReportDetails 
                                    id={this.props.id}
                                    path={this.props.path} 
                                />}
                />
            </div>
        );
    }
}

export default Field;
