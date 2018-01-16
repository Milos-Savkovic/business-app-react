import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './newCosts.css';

class NewCosts extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="">
                <TextField
                    hintText="Novi trošak"
                    style={{
                        width:'300px',
                    }}
                    onChange={this.props.handleMoreCostsValue}
                />
                <TextField
                    style={{
                        width:'70px',
                        marginLeft:'20px',
                    }}
                    onChange={this.props.handleMoreCostsValue}
                />
                KM
            </div>
        );
    }
}

export default NewCosts;