import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './field.css';

class Field extends Component {
    
    state={
        showReport:false,
        addReport:false,
    }
    render() {
        return (
            <div className="fieldBack">
                <h3 className="fieldTitle">Add new report</h3>
                <Link 
                    to={`${this.props.path}/new-report`}     
                >
                    <div
                        className="fieldButton"
                        
                    >
                        <strong className="fieldPlus" >+</strong>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Field;
