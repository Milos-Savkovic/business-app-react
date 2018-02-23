import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { blue500 } from 'material-ui/styles/colors';
import './newDistanceEdit.css';

class NewDistance extends Component {

    state = {
        distance: this.props.input.distance || 0,
        busTicket: this.props.input.busTicket || 0,
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.distance !== nextProps.input.distance || this.state.busTicket !== nextProps.input.busTicket) {
            this.setState({
                distance: nextProps.input.distance,
                busTicket: nextProps.input.busTicket,
            })
        }
    }

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
                    defaultValue={this.props.input.from}
                    style={{
                        width: '200px',
                    }}
                    onChange={this.props.handleNextTown}
                />
                <TextField
                    required
                    floatingLabelText={this.isFinalDestination()}
                    floatingLabelStyle={{
                        color: blue500,
                    }}
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
                    required
                    name="3"
                    id={this.props.id}
                    value={this.state.busTicket || this.state.distance}
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