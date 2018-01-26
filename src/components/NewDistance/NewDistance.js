import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import './newDistance.css';

class NewDistance extends Component {

    handleDeleteInputCity = (e) => {
        e.preventDefault();
        console.log("This input will be removed");
        this.props.handleDeleteInputCity(this.props.id);
    }

    render() {
        return (
            <div className="newInput">
                <TextField
                    name="1"
                    id={this.props.id}
                    hintText="Od"
                    style={{
                        width: '200px',
                    }}
                    onChange={ this.props.handleNextTown} 
                />
                <TextField
                    name="2"
                    hintText="Do"
                    id={this.props.id}
                    style={{
                        width: '200px',
                        marginLeft: '20px',
                    }}
                    onChange={ this.props.handleNextTown} 
                />
                <TextField
                    name="3"
                    type="number"
                    id={this.props.id}
                    style={{
                        width: '80px',
                        marginLeft: '20px',
                    }}
                    onChange={ this.props.handleNextTown} 
                />
                <strong>km</strong>
                <IconButton onClick={(e) => { this.handleDeleteInputCity(e) }} >
                    <DeleteIcon className="delete-icon"
                    />
                </IconButton>
            </div>
        );
    }
}

export default NewDistance;