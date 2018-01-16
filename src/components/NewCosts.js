import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './newCosts.css';

class NewCosts extends Component {

    render() {
        return (
            <div className="">
                <TextField
                    id={this.props.id}
                    hintText="Novi trošak"
                    style={{
                        width: '300px',
                    }}
                    onChange={this.props.handleMoreCostsName}
                />
                <TextField
                    id={this.props.id}
                    style={{
                        width: '70px',
                        marginLeft: '20px',
                    }}
                    onChange={this.props.handleMoreCostsValue}
                />
                KM
            </div>
        );
    }
}

export default NewCosts;