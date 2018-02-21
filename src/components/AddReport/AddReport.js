import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
// import MyMap from '../../api/MyMap';
import { MyGoogleMapWithSearch } from '../../api/GoogleMap';
// import DistanceInput from '../../api/DistanceInput';
import { fireDB } from '../../api/firebaseApp';
import PickDays from '../PickDays/PickDays';
import NewCosts from '../NewCosts/NewCosts';
import NewDistance from '../NewDistance/NewDistance';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import { blue500 } from 'material-ui/styles/colors';
import './addReport.css';

const styles = {
    radioButton: {
        marginBottom: 10,
    },
    floatingLabelStyle: {
        color: blue500,
        fontSize: '16px',
    },
    menuItem: {
        textAlign: 'center',
    },
    selectField: {
        width: '200px',
    },
};

class AddReport extends Component {

    state = {
        toggled: true,
        city: {
            cityName: '',
            distance: 0,
            busTicket: '',
        },
        towns: [],
        earnings: 'domaća',
        typeOfTransport: 'službeno',
        personalVehicleFuel: null,
        fuelPrice: null,
        costs: 'kompanije',
        startDate: null,
        endDate: null,
        startTime: '08:00',
        endTime: '23:00',
        moreCosts: [],
        protocol: '',
        reason: '',
        numberOfProtocol: 1,
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
                    busTicket: this.state.city.busTicket || '',
                },],
                typeOfTransport: this.state.typeOfTransport,
                moreCosts: this.state.moreCosts,
                protocol: this.state.protocol,
                reason: this.state.reason,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                fuelPrice: this.state.fuelPrice || '',
                personalVehicleFuel: this.state.personalVehicleFuel || '',
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
                fuelPrice: this.state.fuelPrice || '',
                personalVehicleFuel: this.state.personalVehicleFuel || '',

            };
        }
        //push new report in reports array
        const ref = fireDB.ref(`/users/${this.props.id}/Reports`);
        ref.push(report, error => {
            console.log(error);
        });
        this.handleSubmit();
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
        let value = e.target.value;
        city[name] = value;
        this.setState({
            city
        });
    }

    xhandler = () => {
        this.props.closeReport();
    }

    handleMoreCosts = () => {
        const newArray = this.state.moreCosts;
        newArray.push({
            id: uuidv4(),
            name: 0,
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
                distance: '',
                busTicket: ''
            });
        } else {
            towns.push({
                id: uuidv4(),
                from: '',
                to: '',
                busTicket: '',
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
                else if (this.state.typeOfTransport === "autobus") {
                    item.busTicket = e.target.value;
                }
                else {
                    item.distance = e.target.value;
                    item.busTicket = '';
                }
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
                        <div className="location-div">
                            <p>Destinacija : </p>
                            {/* <DistanceInput */}
                            {/* handleCity={this.handleCity} */}
                            {/* /> */}
                        </div>
                        <div className="distance-div">
                            <p>Distanca : </p>
                            <div className="distance-label">
                                <TextField
                                    id="mapDistance"
                                    autoComplete='off'
                                    name="distance"
                                    onChange={this.handleCity}
                                    value={this.state.city.distance}
                                    style={{ width: 60 }}
                                    required
                                />
                                <p>km</p>
                            </div>
                        </div>
                    </div>
                    {/* <MyMap
                        city={this.state.city.cityName || 'Banja Luka'}
                        handleDistance={this.handleDistance}
                    /> */}
                    <MyGoogleMapWithSearch />
                </div>
            )
        }
        else return (
            <div className="add-destinations">
                <p style={{ marginTop: '3rem' }}>Destinacije</p>
                <div>
                    {this.state.towns.map(input => <NewDistance
                        finalDestination={this.isFinalDestination(input.id)}
                        typeOfTransport={this.state.typeOfTransport}
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
        );
    }

    convertToNumber = (string) => {
        const position = string.indexOf("/");
        let newNumber = +string.slice(0, position);
        newNumber++;
        if (this.state.numberOfProtocol < newNumber) {
            this.setState({
                numberOfProtocol: newNumber,
            });
        }
    }

    isFinalDestination(id) {
        if (this.state.towns[Math.floor(this.state.towns.length / 2) - 1] !== undefined) {
            if (id === this.state.towns[Math.floor(this.state.towns.length / 2) - 1].id) return 1;
            return 0;
        }
    }

    componentWillMount() {
        fireDB.ref('/users').on('value', snapshot => {
            const users = snapshot.val();
            Object.keys(users).map((key) => {
                if (users[key].Reports) {
                    const reports = users[key].Reports;
                    Object.keys(reports).map((key) => {
                        return this.convertToNumber(reports[key].protocol)
                    });
                }
                return null;
            })
        });
    }

    handlePersonVehicle(e) {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;

        if (id === "person-vehicle-specs-input1") this.setState({ personalVehicleFuel: value });
        else this.setState({ fuelPrice: value });
        console.log("Izmjena na licnom vozilu");
    }

    renderPersonalVehicle() {
        if (this.state.typeOfTransport === "lično") return (
            <div className="personal-vehicle-specs">
                <TextField
                    id='person-vehicle-specs-input1'
                    hintText='7'
                    floatingLabelText='Potrošnja'
                    floatingLabelStyle={{
                        color: blue500,
                    }}
                    defaultValue={this.state.personalVehicleFuel}
                    hintStyle={{ width: '100px', textAlign: 'center' }}
                    style={{
                        width: '100px',
                    }}
                    onChange={e => this.handlePersonVehicle(e)}
                    required
                />
                <p> l</p>
                <TextField
                    id='person-vehicle-specs-input2'
                    hintText='2.10'
                    floatingLabelText='Cijena goriva'
                    floatingLabelStyle={{
                        color: blue500,
                        textAlign: 'center',
                    }}
                    defaultValue={this.state.fuelPrice}
                    hintStyle={{ width: '100px', textAlign: 'center' }}
                    style={{
                        width: '100px',
                        marginLeft: '40px',
                    }}
                    required
                    onChange={e => this.handlePersonVehicle(e)}
                />
                <p>KM</p>
            </div>
        )
    }

    render() {
        const date = new Date();
        return (
            <div className="field">
                <form className="form-newReport" onSubmit={this.setFirebase} >
                    <div className="protocol">
                        <TextField
                            hintText={`${('0' + this.state.numberOfProtocol).slice(-2)}/${date.getFullYear()}`}
                            floatingLabelText="Broj protokola"
                            floatingLabelStyle={{
                                color: blue500,
                            }}
                            style={{
                                width: '130px',
                            }}
                            onChange={this.handleProtocol}
                        />
                    </div>
                    <div className="dates">
                        <div>
                            <PickDays
                                handleDateStart={this.handleDateStart}
                                handleDateEnd={this.handleDateEnd}
                            />
                        </div>
                        <div>
                            <TimePicker
                                format="24hr"
                                hintText="08:00"
                                textFieldStyle={{
                                    width: '130px',
                                    color: blue500,
                                }}
                                onChange={this.handleChangeMinTime}
                            />
                            <br />
                            <TimePicker
                                format="24hr"
                                hintText="23:00"
                                textFieldStyle={{
                                    width: '130px',
                                    color: blue500,
                                }}
                                onChange={this.handleChangeMaxTime}
                            />
                        </div>
                        <div className="rowEarnings">
                            <p>Dnevnica : </p>
                            <RadioButtonGroup
                                name="earnings"
                                onChange={this.handleEarnings}
                                defaultSelected="domaća"
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
                            color: blue500,
                        }}
                        multiLine={true}
                        rows={1}
                        onChange={this.handleReason}
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
                    {this.renderPersonalVehicle()}
                    <div className="toggle-map-mod">
                        <Toggle
                            labelStyle={{
                                fontSize: '14px',
                            }}
                            defaultToggled={true}
                            label="Mapa mod"
                            labelPosition="right"
                            onToggle={() => this.setState({ toggled: !this.state.toggled })}
                        />
                    </div>
                    {this.displayMap()}
                    <p style={{ marginTop: '3rem' }}>Dodatni troškovi</p>
                    <div>
                        {this.state.moreCosts.map(input => <NewCosts
                            key={input.id}
                            id={input.id}
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
                        label="Dodaj"
                    />
                    <RaisedButton
                        type="submit"
                        label="Dodaj novi izvještaj"
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
export default AddReport;