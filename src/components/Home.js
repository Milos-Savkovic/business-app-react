import React, { Component } from 'react';
import Navigation from './Navigation';
import Container from './Container';
import './home.css';

class Home extends Component {

    render() {
        return (
            <div className="home">
                <Navigation />
                <Container/> 
            </div>
        );
    }
}

export default Home;
