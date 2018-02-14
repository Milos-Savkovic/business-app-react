import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { blue500 } from 'material-ui/styles/colors';
import './newCostsEdit.css';

class NewCosts extends Component {

    handleDeleteInput = (e) => {
        e.preventDefault();
        this.props.handleDeleteInput(this.props.id);
    }
    render() {
        return (
            <div className="newInput">
                <TextField
                    name="1"
                    id={this.props.id}
                    hintText="Novi trošak"
                    defaultValue={this.props.input.name}
                    style={{
                        width: '300px',
                    }}
                    onChange={this.props.handleMoreCostsName}
                />
                <TextField
                    name="2"
                    id={this.props.id}
                    type='number'
                    floatingLabelText='kol.'
                    floatingLabelStyle={{
                        color: blue500,
                    }}
                    defaultValue={this.props.input.number}
                    style={{
                        width: '40px',
                        marginLeft: '20px',
                        height: '74px',
                    }}
                    onChange={this.props.handleMoreCostsName}
                />
                <TextField
                    name="3"
                    type="number"
                    id={this.props.id}
                    defaultValue={+this.props.input.KM}
                    style={{
                        width: '70px',
                        marginLeft: '20px',
                    }}
                    onChange={this.props.handleMoreCostsName}
                />
                <strong>KM</strong>
                <IconButton onClick={(e) => { this.handleDeleteInput(e) }} >
                    <DeleteIcon className="delete-icon"
                    />
                </IconButton>
            </div>
        );
    }
}

export default NewCosts;