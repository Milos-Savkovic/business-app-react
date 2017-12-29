import React, { Component } from 'react';
import './person.css';

class Person extends Component {

    handleDetailPerson(id) {
        this.props.clickHandlerDetail(id);
    }

    handleAddPerson() {
        this.props.clickHandler();
    }

    render() {
        if (this.props.firstName !== undefined && this.props.lastName !== undefined) {
            return (
                <div className="card">
                    <img src="https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png" className="avatar" alt="Jane" />
                    <div >
                        <h2>{`${this.props.firstName} ${this.props.lastName}`}</h2>
                        <p className="title">{this.props.position}</p>
                        <p><button className="button" onClick={() => { this.handleDetailPerson(this.props.id) }}>More</button></p>
                    </div>
                </div>
            );
        }
        else return (
            <div className="cardImagePlus" onClick={() => { this.handleAddPerson() }}>
                <div className="plusElement">+</div>
            </div>
        );
    }
}

export default Person;