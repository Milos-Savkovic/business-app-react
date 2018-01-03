import React, { Component } from 'react';
import './field.css';

class Field extends Component {

    render() {
        return (
            <div className="fieldBack">
                <h3 className="fieldTitle">Add new report</h3>
                <div className="fieldButton">
                    <strong className="fieldPlus">+</strong>
                </div>
            </div>
        );
    }
}

export default Field;
