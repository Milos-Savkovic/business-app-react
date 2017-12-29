import React, { Component } from 'react';
import './report.css';

class Report extends Component {

    render() {
        return (
            <div className="reportName">
                {this.props.reportName}
                <div className="date">
                    {" ( " + this.props.date1 + " - " + this.props.date2 + " ) "}
                </div>
            </div>
        )
    }
}

export default Report;
