import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import './newDistanceEdit.css';

class NewDistance extends Component {

    handleDeleteInputCity = (e) => {
        e.preventDefault();
        this.props.handleDeleteInputCity(this.props.id);
    }

    renderLabel() {
        if (this.props.typeOfTransport === "autobus") return <strong>KM</strong>;
        return <strong>km</strong>;
    }

    render() {
        return (
            <div className="newInput">
                <TextField
                    name="1"
                    id={this.props.id}
                    defaultValue={this.props.input.from}
                    style={{
                        width: '200px',
                    }}
                    onChange={this.props.handleNextTown}
                />
                <TextField
                    name="2"
                    defaultValue={this.props.input.to}
                    id={this.props.id}
                    style={{
                        width: '200px',
                        marginLeft: '20px',
                    }}
                    onChange={this.props.handleNextTown}
                />
                <TextField
                    name="3"
                    type="number"
                    id={this.props.id}
                    defaultValue={+this.props.input.distance}
                    style={{
                        width: '80px',
                        marginLeft: '20px',
                    }}
                    onChange={this.props.handleNextTown}
                />
                {this.renderLabel()}
                <IconButton onClick={(e) => { this.handleDeleteInputCity(e) }} >
                    <DeleteIcon className="delete-icon"
                    />
                </IconButton>
            </div>
        );
    }
}

export default NewDistance;