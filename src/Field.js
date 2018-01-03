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
<<<<<<< HEAD
                <Link 
                    to={`${this.props.path}/new-report`}     
                >
                    <div
                        className="fieldButton"
                        
                    >
                        <strong className="fieldPlus" >+</strong>
                    </div>
                </Link>
=======
                <div className="fieldButton">
                    <strong className="fieldPlus" onClick={()=>{this.state.addReport()}}>+</strong>
                </div>
>>>>>>> ab40241b9ce2911b7daa5e14a0d0fbe879f36c48
            </div>
        );
    }
}

export default Field;
