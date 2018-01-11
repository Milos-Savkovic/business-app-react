import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from './firebaseApp'
import './addUser.css';
class AddUser extends Component {

    state = {
        user: {
            firstname: '',
            lastname: '',
            position: '',
            description: '',
        },
        isAdded: false,
    }

    handleInput = (e) => {
        const user = this.state.user;
        const name = e.target.name;
        const value = e.target.value;

        user[name] = value;
        this.setState({
            user
        })
    }

    setFirebase = (event) => {
        event.preventDefault();
        let ourTeam = [];
        fireDB.ref('/users').once('value')
            .then((snapshot) => {
                const team = [
                    ...snapshot.val(),
                ];
                ourTeam = team;
                console.log(ourTeam);
                return ourTeam;
            })
            .then((team) => {
                let maxId = 0;
                for (let j = 0; j < team.length; j++) {
                    if (team[j].Id > maxId) maxId = team[j].Id;
                }
                const id = maxId + 1;

                team = [
                    ...team, {
                        Description: this.state.user.description,
                        FirstName: this.state.user.firstname,
                        Id: id,
                        LastName: this.state.user.lastname,
                        Position: this.state.user.position,
                        // Reports: reports,
                        Selected: true,
                    }];
                return team;
            })
            .then((team) => {
                console.log(team)
                fireDB.ref('/users').set(team);
            })
            .then(() => {
                this.setState({ 
                    isAdded: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (this.state.isAdded) return <Redirect to="/users" />
        return (
            <div className="add-user-container" >
                <form className="contactForm" onSubmit={this.setFirebase}>
                    <label>Ime : </label>
                    <input type="text" name="firstname" onChange={this.handleInput} required />
                    <br />
                    <label>Prezime : </label>
                    <input type="text" name="lastname" onChange={this.handleInput} required />
                    <br />
                    <label>Pozicija : </label>
                    <input type="text" name="position" onChange={this.handleInput} required />
                    <br />
                    <label>Deskripcija : </label>
                    <textarea name="description" onChange={this.handleInput} required></textarea>
                    <br />
                    <input type="submit" name="submit" className="formBtn" value="Dodaj novu osobu" />
                </form>
            </div>
        );
    }
}

export default AddUser;
