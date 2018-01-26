import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp';
// import ReportDetails from '../ReportDetails/ReportDetails';
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
import AddReport from '../AddReport/AddReport';

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
        fireDB.ref(`/users/${this.props.userId}/Reports/${this.props.id}`).remove()
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
                        <Link to={`/users/${this.props.userId}/${this.props.id}/edit`}> <MenuItem primaryText="Edit" leftIcon={<Create />} /></Link>
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
                {/* <Route
                    path={`/users/${this.props.userId}/${this.props.id}/edit`}
                    render={() => <AddReport
                        // id={this.props.id}
                        // path={this.props.path}
                        // firstName={this.props.fname}
                        // lastName={this.props.lname}
                        // position={this.props.position}
                    />}
                /> */}
            </div>
        )
    }
}

export default Report;
