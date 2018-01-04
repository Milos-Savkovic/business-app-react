import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import NotFound from './NotFound';
import './field.css';

class Field extends Component {

    clickHandler = () => {
        this.props.clicked();
    }
    render() {
        console.log(this.props.path)
        return (
            <div className="fieldBack">
        {/*<h3 className="fieldTitle">Add new report</h3>*/}
                <Link
                    to={`${this.props.path}/new-report`}
                    onClick={this.clickHandler}
                >
                    <div
                        className="fieldButton"
                    >
                        <strong className="fieldPlus" >+</strong>
                    </div>
                </Link>
                <Route
                    path={`/users/:id/reports/:reportName`}
                    component={NotFound}
                />
            </div>
        );
    }
}

export default Field;
