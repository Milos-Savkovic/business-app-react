import React, { Component } from 'react';
import './person.css';
import RaisedButton from 'material-ui/RaisedButton';
import { getImage } from '../../api/getImage';

class Person extends Component {

    state = {
        image: '',
    }

    handleDetailPerson(id) {
        this.props.clickHandlerDetail(id);
    }

    componentWillMount() {
        try {
            getImage(this.props.id)
                .then((url) => {
                    this.setState({
                        image: url,
                    });
                }).catch(error => {
                    this.setState({
                        image: "https://cdn.dribbble.com/users/112117/screenshots/3792149/avatar-dribbble_1x.png",
                    })
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <div className="card">
                <img src={this.state.image} className="avatar" alt="Jane" />
                <div >
                    <h2 className="name">{`${this.props.firstName} ${this.props.lastName}`}</h2>
                    <p className="title">{this.props.position}</p>
                    <RaisedButton
                        label="More"
                        onClick={() => { this.handleDetailPerson(this.props.id) }}
                        primary={true}
                    />

                </div>
            </div>
        );
    }
}

export default Person;