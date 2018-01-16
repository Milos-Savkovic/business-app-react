import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ReportDetails from './ReportDetails';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './field.css';

class Field extends Component {

    clickHandler = () => {
        this.props.clicked();
    }
    render() {
        return (
            <div className="fieldBack-container">
                <div className="fieldBack">
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/users/${this.props.id}/new-report`}
                        onClick={this.clickHandler}
                    >
                        <div className="fieldButton">
                            <FloatingActionButton >
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                    </Link>
                </div>

                <Route
                    path={`/users/:${this.props.id}/:date/:reportName`}
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
