import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import './newCosts.css';

class NewCosts extends Component {

    handleDeleteInput = (e) => {
        e.preventDefault();
        this.props.handleDeleteInput(this.props.id);
    }
    render() {
        return (
            <div className="newInput">
                <TextField
                    id={this.props.id}
                    hintText="Novi trošak"
                    style={{
                        width: '300px',
                    }}
                    onChange={this.props.handleMoreCostsName}
                />
                <TextField
                    id={this.props.id}
                    style={{
                        width: '70px',
                        marginLeft: '20px',
                    }}
                    onChange={this.props.handleMoreCostsValue}
                />
                <strong>KM</strong>
                <IconButton  onClick={(e) => { this.handleDeleteInput(e) }} >
                    <DeleteIcon className="delete-icon"
                    />
                </IconButton>
            </div> 
        );
    }
}

export default NewCosts;