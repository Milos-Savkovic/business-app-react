import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from './DayPicker';
import MyMap from '../api/MyMap';
import { fireDB } from '../api/firebaseApp';
import { grey900 } from 'material-ui/styles/colors';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './addReport.css';

const styles = {
    radioButton: {
        marginBottom: 10,
    },
    floatingLabelStyle: {
        color: grey900,
    },
};

class AddReport extends Component {

    state = {
        city: {
            cityName: '',
            distance: 0,
        },
        earnings: 'domaća',
        typeOfTransport: 'službeno',
        costs: 'kompanija',
        startDate: moment().format('DD.MM.YYYY'),
        endDate: moment().add(3, 'days').format('DD.MM.YYYY'),
        user: null,
    }

    setFirebase = (e) => {
        e.preventDefault();
        console.log("Set FIREBASE!");
        console.log(this.props.id);
        //create new report 
        const report = {
            costs: this.state.costs,
            dailyEarnings: this.state.inputs.earnings,
            date1: this.state.startDate,
            date2: this.state.endDate,
            distance: this.state.city.distance,
            reportName: this.state.city.cityName,
            typeOfTransport: this.state.inputs.typeOfTransport,
        }
        //get user details from database
        fireDB.ref('/users').once('value')
            .then((snapshot) => {
                const users = [...snapshot.val()]

                users.filter(item => item.Id === this.props.id)
                    .map(item => {
                        this.setState({
                            user: item,
                        });
                    })
                //push new report in reports array
                let oldReport = this.state.user.Reports || [];
                oldReport.push(report);

                const newUser = this.state.user;
                newUser.Reports = oldReport;

                this.setState({
                    user: newUser,
                })
                console.log(this.state.user);

                users.map(item => {
                    if (item.Id === this.state.user.Id) {
                        item.Reports = this.state.user.Reports;
                    }
                })
                console.log(users);
                // set new database with new user report
                fireDB.ref('/users').set(users);
                this.handleSubmit();
            })
            .catch((e) => console.log(e))
    }
    handleSubmit = () => {
        this.props.updateReportList();
    }

    handleDateStart = (date) => {
        this.setState({
            startDate: date,
        });
    }

    handleDateEnd = (date) => {
        this.setState({
            endDate: date,
        });
    }

    handleDistance = (dis, nm) => {
        console.log(dis, nm);
        this.setState({
            city: {
                cityName: nm,
                distance: dis,
            }
        })
    }

    handleEarnings = (e) => {
        e.preventDefault();
        const value = e.target.value;
        this.setState({
            earnings: value
        })
    }

    handleCosts = (event, index, value) => this.setState({
        costs: value
    });

    handleTypeOfTransport = (event, index, value) => this.setState({
        typeOfTransport: value
    });

    handleCity = (e) => {
        e.preventDefault();
        const city = this.state.city;
        const name = e.target.name;
        const value = e.target.value;

        city[name] = value;

        this.setState({
            city
        });
    }

    xhandler = () => {
        this.props.closeReport();
    }

    render() {
        console.log(this.state);
        return (
            <div className="field">
                <form className="form-newReport" onSubmit={this.setFirebase} >
                    <div className="rowDate">
                        <DayPicker
                            handleDateStart={this.handleDateStart}
                            handleDateEnd={this.handleDateEnd}
                        />
                    </div>
                    <div className="rowEarnings">
                        <p>Dnevnica : </p>
                        <RadioButtonGroup floatingLabelText="Dnevnica" name="earnings" onChange={this.handleEarnings} defaultSelected="domaća">
                            <RadioButton
                                label="strana"
                                value="strana"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                label="domaća"
                                value="domaća"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                label="EX-YU"
                                value="EX-YU"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>

                    <SelectField
                        floatingLabelText="Troškove snosi"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        value={this.state.costs}
                        onChange={this.handleCosts}
                    >
                        <MenuItem value="kompanija" primaryText="Kompanija" />
                        <MenuItem value="zaposleni" primaryText="Zaposleni" />
                    </SelectField>
                    <SelectField
                        floatingLabelText="Vrsta prevoza"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        value={this.state.typeOfTransport}
                        onChange={this.handleTypeOfTransport}
                    >
                        <MenuItem value="službeno" primaryText="Službeno vozilo" />
                        <MenuItem value="lično" primaryText="Lično vozilo" />
                    </SelectField>

                    <p>Lokacija : </p>
                    <div className="input-group">
                        <input type="text" id="mapSearch" placeholder="Search..." name="cityName" onChange={this.handleCity} required />
                    </div>
                    <MyMap
                        city={this.state.city.cityName || 'Banja Luka'}
                        handleDistance={this.handleDistance}
                    />
                    <input type="submit" name="submit" value="Add report" className="submit" />
                    <div
                        className="close"
                        onClick={this.xhandler}
                    >
                        X
                    </div>
                </form>

            </div>
        );
    }
}
export default AddReport;