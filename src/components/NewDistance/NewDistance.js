import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import './newDistance.css';

class NewDistance extends Component {

    handleDeleteInputCity = (e) => {
        e.preventDefault();
        this.props.handleDeleteInputCity(this.props.id);
    }

    renderLabel() {
        if (this.props.typeOfTransport === "autobus") return <strong>KM</strong>;
        return <strong>km</strong>;
    }

    isFinalDestination() {
        if (this.props.finalDestination) return "Finalna destinacija";
    }

    render() {
        return (
            <div className="newInput">
                <TextField
                    required
                    name="1"
                    id={this.props.id}
                    hintText="Od"
                    style={{
                        width: '200px',
                    }}
                    onChange={this.props.handleNextTown}
                />
                <TextField
                    required
                    floatingLabelText={this.isFinalDestination()}
                    name="2"
                    hintText="Do"
                    id={this.props.id}
                    style={{
                        width: '200px',
                        marginLeft: '20px',
                    }}
                    onChange={this.props.handleNextTown}
                />
                <TextField
                    required
                    name="3"
                    id={this.props.id}
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