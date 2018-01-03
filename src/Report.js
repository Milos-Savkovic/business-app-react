import React, { Component } from 'react';
import './report.css';

class Report extends Component {

    render() {
        return (
            <div className="reportName">
                {this.props.reportName}
                <div className="date">
                    <small>{" ( " + this.props.date1 + " - " + this.props.date2 + " ) "}</small>
                </div>
            </div>
        )
    }
}

export default Report;
