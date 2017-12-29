import React, { Component } from 'react';
import Navigation from './Navigation';
import AddUser from './AddUser';
import './home.css';

class Home extends Component {

    render() {
        return (
            <div className="home">
                <Navigation />
                <AddUser/>
            </div>
        );
    }
}

export default Home;
