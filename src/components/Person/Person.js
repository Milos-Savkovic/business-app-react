import React, { Component } from 'react';
import './person.css';
import RaisedButton from 'material-ui/RaisedButton';

class Person extends Component {

    handleDetailPerson(id) {
        this.props.clickHandlerDetail(id);
    }

    render() {

        return (
            <div className="card">
                <img src={this.props.image} className="avatar" alt="Jane" />
                <div >
                    <h2 className="name">{`${this.props.firstName} ${this.props.lastName}`}</h2>
                    <p className="title">{this.props.position}</p>
                    <RaisedButton
                        label="Više"
                        onClick={() => { this.handleDetailPerson(this.props.id) }}
                        primary={true}
                    />

                </div>
            </div>
        );
    }
}

export default Person;