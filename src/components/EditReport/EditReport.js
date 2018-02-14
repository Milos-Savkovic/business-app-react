import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { fireDB } from '../../api/firebaseApp';
import PickDaysEdit from './PickDaysEdit/PickDaysEdit';
import NewCostsEdit from './NewCostsEdit/NewCostsEdit';
import NewDistanceEdit from './NewDistanceEdit/NewDistanceEdit';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import { grey400 } from 'material-ui/styles/colors';
import './editReport.css';

const styles = {
    radioButton: {
        marginBottom: 10,
    },
    floatingLabelStyle: {
        color: grey400,
        fontSize: '16px',
    },
    menuItem: {
        textAlign: 'center',
    },
    selectField: {
        width: '200px',
    },
};

class EditReport extends Component {

    state = {
        towns: [],
        earnings: '',
        typeOfTransport: '',
        costs: '',
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        moreCosts: [],
        protocol: '',
        reason: '',
        loading: true,
    }
    componentWillMount() {
        fireDB.ref(`/users/${this.props.match.params.id}/Reports/${this.props.match.params.key}`).once('value').then(snapshot => {
            const report = snapshot.val();
            this.setState({
                protocol: report.protocol,
                startDate: report.date1,
                endDate: report.date2,
                startTime: report.startTime,
                endTime: report.endTime,
                reason: report.reason,
                costs: report.costs,
                earnings: report.dailyEarnings,
                typeOfTransport: report.typeOfTransport,
                towns: report.towns,
                loading: false,
            });
            if (report.moreCosts) {
                this.setState({
                    moreCosts: report.moreCosts,
                });
            }
        })
    }

    setFirebase = (e) => {
        e.preventDefault();
        //Add report with  google map
        let report;
        if (this.state.toggled) {
            report = {
                costs: this.state.costs,
                dailyEarnings: this.state.earnings,
                date1: this.state.startDate,
                date2: this.state.endDate,
                towns: [{
                    id: uuidv4(),
                    from: 'Banja Luka',
                    to: this.state.city.cityName,
                    distance: this.state.city.distance,
                },],
                typeOfTransport: this.state.typeOfTransport,
                moreCosts: this.state.moreCosts,
                protocol: this.state.protocol,
                reason: this.state.reason,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            };
        } else {
            //create new report with more destinations
            report = {
                costs: this.state.costs,
                dailyEarnings: this.state.earnings,
                date1: this.state.startDate,
                date2: this.state.endDate,
                towns: this.state.towns,
                typeOfTransport: this.state.typeOfTransport,
                moreCosts: this.state.moreCosts,
                protocol: this.state.protocol,
                reason: this.state.reason,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            };
        }
        //push new report in reports array
        const ref = fireDB.ref(`/users/${this.props.match.params.id}/Reports/${this.props.match.params.key}`);
        ref.update(report);
        this.handleSubmit();
    }

    handleSubmit = () => {
        console.log("Successfully update report.");
        this.props.history.goBack();
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

    handleEarnings = (e, value) => this.setState({
        earnings: value,
    })

    handleCosts = (event, index, value) => this.setState({
        costs: value,
    });

    handleTypeOfTransport = (event, index, value) => this.setState({
        typeOfTransport: value,
    });

    xhandler = () => {
        this.props.history.goBack();
    }

    handleMoreCosts = () => {
        const newArray = this.state.moreCosts;
        newArray.push({
            id: uuidv4(),
            name: '',
            KM: '',
            number: 0,
        });
        this.setState({
            moreCosts: newArray,
        });
    }
    handleNextDistance = () => {
        const towns = this.state.towns;
        if (this.state.typeOfTransport === "autobus") {
            towns.push({
                id: uuidv4(),
                from: '',
                to: '',
                busTicket: ''
            });
        } else {
            towns.push({
                id: uuidv4(),
                from: '',
                to: '',
                distance: ''
            });
        }
        this.setState({
            towns: towns,
        });
    }

    handleNextTown = (e) => {
        e.preventDefault();
        let towns = this.state.towns;
        let changer = towns.map(item => {
            if (item.id === e.target.id) {
                if (e.target.name === "1") item.from = e.target.value;
                else if (e.target.name === "2") item.to = e.target.value;
                else if (this.state.typeOfTransport === "autobus") item.busTicket = e.target.value;
                else item.distance = e.target.value;
            }
            return item;
        });
        towns = changer;
        this.setState({
            towns,
        });
    }

    handleMoreCostsName = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;
        const name = e.target.name;
        let moreCosts = this.state.moreCosts;

        let changer = moreCosts.map(item => {
            if (item.id === id) {
                if (name === "1") item.name = value;
                else if (name === "2") item.number = value;
                else item.KM = value;
            }
            return item;
        });

        moreCosts = changer;
        this.setState({
            moreCosts,
        });
    }

    handleDeleteInput = (id) => {
        let moreCosts = this.state.moreCosts;
        const changer = moreCosts.filter(item => item.id !== id)
            .map(item => { return item });

        this.setState({
            moreCosts: changer,
        });
    }
    handleDeleteInputCity = (id) => {
        let towns = this.state.towns;
        const changer = towns.filter(item => item.id !== id)
            .map(item => { return item });

        this.setState({
            towns: changer,
        });
    }

    handleProtocol = (event, value) => this.setState({
        protocol: value,
    });

    handleReason = (event, value) => this.setState({
        reason: value,
    });

    handleChangeMinTime = (event, date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (hours.toString().length === 1) {
            hours = "0" + hours;
        }
        if (minutes.toString().length === 1) {
            minutes = "0" + minutes;
        }
        date = `${hours}:${minutes}`;
        this.setState({
            startTime: date,
        });
    };

    handleChangeMaxTime = (event, date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (hours.toString().length === 1) {
            hours = "0" + hours;
        }
        if (minutes.toString().length === 1) {
            minutes = "0" + minutes;
        }
        date = `${hours}:${minutes}`;
        this.setState({
            endTime: date,
        });
    };

    isFinalDestination(id) {
        if (this.state.towns[Math.floor(this.state.towns.length / 2) - 1] !== undefined) {
            if (id === this.state.towns[Math.floor(this.state.towns.length / 2) - 1].id) return 1;
            return 0;
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="load-bar">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            );
        } else
            return (
                <div className="field">
                    <form className="form-newReport" onSubmit={this.setFirebase} >
                        <div className="protocol">
                            <TextField
                                defaultValue={this.state.protocol}
                                floatingLabelText="Broj protokola"
                                floatingLabelStyle={{
                                    color: grey400,
                                }}
                                style={{
                                    width: '130px',
                                }}
                                onChange={this.handleProtocol}

                            />
                        </div>
                        <div className="dates">
                            <div>
                                <PickDaysEdit
                                    handleDateStart={this.handleDateStart}
                                    handleDateEnd={this.handleDateEnd}
                                    start={this.state.startDate}
                                    end={this.state.endDate}
                                />
                            </div>
                            <div>
                                <TimePicker
                                    format="24hr"
                                    hintText={this.state.startTime}
                                    textFieldStyle={{
                                        width: '130px',
                                        color: grey400,
                                    }}
                                    onChange={this.handleChangeMinTime}
                                />
                                <br />
                                <TimePicker
                                    format="24hr"
                                    hintText={this.state.endTime}
                                    textFieldStyle={{
                                        width: '130px',
                                        color: grey400,
                                    }}
                                    onChange={this.handleChangeMaxTime}
                                />
                            </div>
                            <div className="rowEarnings">
                                <p>Dnevnica : </p>
                                <RadioButtonGroup
                                    name="earnings"
                                    onChange={this.handleEarnings}
                                    defaultSelected={this.state.earnings}
                                >
                                    <RadioButton
                                        label="strana ( 97.90 KM )"
                                        value="strana"
                                        style={styles.radioButton}
                                    />
                                    <RadioButton
                                        label="domaća ( 20.00 KM )"
                                        value="domaća"
                                        style={styles.radioButton}
                                    />
                                    <RadioButton
                                        label="EX-YU ( 39.16 KM )"
                                        value="EX-YU"
                                        style={styles.radioButton}
                                    />
                                </RadioButtonGroup>
                            </div>
                        </div>
                        <TextField
                            className="cause-field"
                            hintText="poslovnog angažmana za klijenta"
                            floatingLabelText="Putuje se radi"
                            floatingLabelStyle={{
                                color: grey400,
                            }}
                            multiLine={true}
                            rows={1}
                            onChange={this.handleReason}
                            defaultValue={this.state.reason}
                        />
                        <div className="drop">
                            <SelectField
                                floatingLabelText="Troškovi padaju na teret:"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                value={this.state.costs}
                                onChange={this.handleCosts}
                                style={styles.selectField}
                            >
                                <MenuItem
                                    value="kompanije"
                                    primaryText="Kompanije"
                                    style={styles.menuItem}
                                />
                                <MenuItem
                                    value="zaposlenog"
                                    primaryText="Zaposlenog"
                                    style={styles.menuItem}
                                />
                            </SelectField>
                            &nbsp;
                        <SelectField
                                floatingLabelText="Vrsta prevoza:"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                value={this.state.typeOfTransport}
                                onChange={this.handleTypeOfTransport}
                                style={styles.selectField}
                            >
                                <MenuItem value="autobus" primaryText="Autobus" />
                                <MenuItem value="službeno" primaryText="Službeno vozilo" />
                                <MenuItem value="lično" primaryText="Lično vozilo" />
                            </SelectField>
                        </div>
                        <div className="add-destinations">
                            <p style={{ marginTop: '3rem' }}>Destinacije</p>
                            <div>
                                {this.state.towns.map(input => <NewDistanceEdit
                                    finalDestination={this.isFinalDestination(input.id)}
                                    typeOfTransport={this.state.typeOfTransport}
                                    input={input}
                                    key={input.id}
                                    id={input.id}
                                    handleNextTown={this.handleNextTown}
                                    handleDeleteInputCity={this.handleDeleteInputCity}
                                />)}
                            </div>
                            <RaisedButton
                                primary={true}
                                style={{
                                    marginTop: '10px',
                                }}
                                onClick={this.handleNextDistance}
                                labelColor="rgb(255, 255, 255)"
                                label="Dodaj"
                            />
                        </div>
                        <p style={{ marginTop: '3rem' }}>Dodatni troškovi</p>
                        <div>
                            {this.state.moreCosts.map(input => <NewCostsEdit
                                key={input.id}
                                id={input.id}
                                input={input}
                                handleMoreCostsName={this.handleMoreCostsName}
                                // handleMoreCostsValue={this.handleMoreCostsValue}
                                handleDeleteInput={this.handleDeleteInput}
                            />)}
                        </div>
                        <RaisedButton
                            primary={true}
                            style={{
                                marginTop: '10px',
                            }}
                            onClick={this.handleMoreCosts}
                            labelColor="rgb(255, 255, 255)"
                            label="Dodaj"
                        />
                        <RaisedButton
                            type="submit"
                            label="Sačuvaj izmjene"
                            className="submit"
                            backgroundColor="rgb(60, 184, 255)"
                            labelColor="rgb(255, 255, 255)"
                        />
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
export default EditReport;
