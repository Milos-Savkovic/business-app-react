import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import MyMap from '../../api/MyMap';
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
import Toggle from 'material-ui/Toggle';
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
        toggled: true,
        city: {
            cityName: '',
            distance: 0,
        },
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
        report: null,
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
            if (report.towns.length > 1) {
                this.setState({
                    toggled: false,
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
        alert("Successfully update report.");
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

    handleDistance = (dis, nm) => {
        this.setState({
            city: {
                cityName: nm,
                distance: Math.ceil(dis / 1000),
            }
        })
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
        this.props.history.goBack();
    }

    handleMoreCosts = () => {
        const newArray = this.state.moreCosts;
        newArray.push({
            id: uuidv4(),
            name: 0,
            KM: '',
        });
        this.setState({
            moreCosts: newArray,
        });
    }
    handleNextDistance = () => {
        const towns = this.state.towns;
        towns.push({
            id: uuidv4(),
            from: '',
            to: '',
            distance: ''
        });
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

        let moreCosts = this.state.moreCosts;

        let costArray = moreCosts.map(item => {
            if (item.id === id) {
                item.name = value;
            }
            return item;
        });
        moreCosts = costArray;
        this.setState({
            moreCosts,
        });
    }

    handleMoreCostsValue = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;

        let moreCosts = this.state.moreCosts;

        let costArray = moreCosts.map(item => {
            if (item.id === id) {
                item.KM = value;
            }
            return item;
        });
        moreCosts = costArray;
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

    displayMap = () => {
        if (this.state.toggled) {
            return (
                <div className="map-element">
                    <div className="location-components">
                        <div >
                            <p>Lokacija : </p>
                            <input type="text" id="mapSearch" placeholder="Search..." name="cityName" onChange={this.handleCity} defaultValue={this.state.towns.map(town => town.to)} required />
                        </div>
                        <div >
                            <p>Distanca : </p>
                            <input type="text" className="map-distance" value={this.state.towns.map(town => town.distance + " km")} onChange={this.handleCity} required />
                        </div>
                    </div>
                    <MyMap
                        city={this.state.city.cityName || 'Banja Luka'}
                        handleDistance={this.handleDistance}
                    />
                </div>
            )
        }
        else return (
            <div className="add-destinations">
                <div>
                    {this.state.towns.map(input => <NewDistanceEdit
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
                    label="Add"
                />
            </div>
        );
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
                                required
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
                        <div className="toggle-map-mod">
                            <Toggle
                                labelStyle={{
                                    fontSize: '14px',
                                }}
                                defaultToggled={this.state.toggled}
                                label="Map mod"
                                labelPosition="right"
                                onToggle={() => this.setState({ toggled: !this.state.toggled })}
                            />
                        </div>
                        {this.displayMap()}
                        <div className="drop">
                            <SelectField
                                floatingLabelText="Troškove snosi:"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                value={this.state.costs}
                                onChange={this.handleCosts}
                                style={styles.selectField}
                            >
                                <MenuItem
                                    value="kompanija"
                                    primaryText="Kompanija"
                                    style={styles.menuItem}
                                />
                                <MenuItem
                                    value="zaposleni"
                                    primaryText="Zaposleni"
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
                                <MenuItem value="službeno" primaryText="Službeno vozilo" />
                                <MenuItem value="lično" primaryText="Lično vozilo" />
                            </SelectField>
                        </div>
                        <p style={{ marginTop: '3rem' }}>Dodatni troškovi: </p>
                        <div>
                            {this.state.moreCosts.map(input => <NewCostsEdit
                                key={input.id}
                                id={input.id}
                                input={input}
                                handleMoreCostsName={this.handleMoreCostsName}
                                handleMoreCostsValue={this.handleMoreCostsValue}
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
                            label="Add"
                        />
                        <RaisedButton
                            type="submit"
                            label="Save changes"
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