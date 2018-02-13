import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp';
import './person.css';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import Create from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';
import { cyan50 } from 'material-ui/styles/colors';

class Person extends Component {
    state = {
        openAlert: false,
        key: null,
    }
    handleDetailPerson(id) {
        this.props.clickHandlerDetail(id);
    }
    handleDelete = () => {
        fireDB.ref(`/users/${this.props.id}`).remove();
        this.setState({
            openAlert: false,
        });
    }
    handleOpen = (key) => {
        this.setState({ openAlert: true, key: key });
    }
    render() {
        const actions = [
            <FlatButton
                label="Ne"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Da"
                secondary={true}
                onClick={this.handleDelete}
            />,
        ];
        return (
            <div className="card">
                <div className="icon-menu-user">
                    <IconMenu
                        multiple={false}
                        iconButtonElement={
                            <IconButton><MoreVertIcon color={cyan50} /></IconButton>
                        }
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                        <Link to={`/users/${this.props.id}/edit`} className="underile-link"> <MenuItem primaryText="Izmijeni" leftIcon={<Create />} /></Link>
                        <MenuItem primaryText="Obriši" leftIcon={<Delete />} onClick={() => this.handleOpen(this.props.id)} />
                    </IconMenu>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.openAlert}
                        onRequestClose={this.handleDelete}
                    >
                        Da li ste sigurni da želite obrisati ovaj putni nalog?
                    </Dialog>
                </div>
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