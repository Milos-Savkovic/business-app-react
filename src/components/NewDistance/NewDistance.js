import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import './newDistance.css';

class NewDistance extends Component {

    handleDeleteInput = (e) => {
        e.preventDefault();
        this.props.handleDeleteInput(e);
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
                <IconButton onClick={(e) => { this.handleDeleteInput(e) }} >
                    <DeleteIcon className="delete-icon"
                    />
                </IconButton>
            </div>
        );
    }
}

export default NewDistance;