import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import Create from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey800 } from 'material-ui/styles/colors';
import './report.css';

class Report extends Component {

    state = {
        openAlert: false,
    }

    handleOpen = () => {
        this.setState({ openAlert: true });
    };

    handleClose = () => {
        this.setState({ openAlert: false });
    };

    handleDelete = () => {
        alert('Deleted');
        console.log(this.props);
        // ref.child(key).remove();
        // fireDB.ref('/users').once('value')
        // .then((snapshot) => {
        //     const Team = [
        //         ...snapshot.val(),
        //     ];
        //     Team.filter(item => item.Id === id)
        //         .map(item => (
        //             this.setState({
        //                 user: item,
        //             })
        //         ))
        // })
        // .catch((e) => console.log(e))
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Yes"
                secondary={true}
                onClick={this.handleDelete}
            />,
        ];

        return (
            <div className="reportName">
                <div className="report">
                    {this.props.reportName}
                    <div className="date">
                        <small>{" ( " + this.props.date1 + " - " + this.props.date2 + " ) "}</small>
                    </div>
                </div>
                <div className="icon-menu">
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon color={grey800} /></IconButton>
                        }
                        targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    >
                        <MenuItem primaryText="Edit" leftIcon={<Create />} />
                        <MenuItem primaryText="Remove" leftIcon={<Delete />} onClick={() => this.handleOpen()} />
                    </IconMenu>
                </div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.openAlert}
                    onRequestClose={this.handleDelete}
                >
                    Are you sure you want to delete this item?
             </Dialog>
            </div>
        )
    }
}

export default Report;
