import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ReportDetails from '../ReportDetails/ReportDetails';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './field.css';

class Field extends Component {

    clickHandler = () => {
        this.props.clicked();
    }
    render() {
        let text = (this.props.path === `/users/${this.props.id}`) ?
            (
                <div className="fieldBack">
                    <h3 className="field-tip">Choose report on left to print</h3>
                </div>
            ) : null;
        return (
            <div className="fieldBack-container">
                {text}
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
                <Route
                    path={`/users/:${this.props.id}/:id`}
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
