import React, { Component } from 'react';
import PickDays from './PickDays';
import MyMap from '../api/MyMap';
import { fireDB } from '../api/firebaseApp';
import uuidv4 from 'uuid/v4';
import { grey900 } from 'material-ui/styles/colors';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewCosts from './NewCosts';
import './addReport.css';

const styles = {
    radioButton: {
        marginBottom: 10,
    },
    floatingLabelStyle: {
        color: grey900,
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
        city: {
            cityName: '',
            distance: 0,
        },
        earnings: 'domaća',
        typeOfTransport: 'službeno',
        costs: 'kompanija',
        startDate: new Date(),
        endDate: this.date(),
        user: null,
        moreCosts: [],
    }

    date() {
        const date = new Date()
        date.setDate(date.getDate() + 3);
        return date;
    }
    setFirebase = (e) => {
        e.preventDefault();
        console.log("Set FIREBASE!");
        //create new report 
        const report = {
            costs: this.state.costs,
            dailyEarnings: this.state.earnings,
            date1: this.state.startDate,
            date2: this.state.endDate,
            distance: this.state.city.distance,
            reportName: this.state.city.cityName,
            typeOfTransport: this.state.typeOfTransport,
            moreCosts: this.state.moreCosts,
            id: uuidv4(),
        };
        //get user details from database
        fireDB.ref('/users').once('value')
            .then((snapshot) => {
                const users = [...snapshot.val()]

                users.filter(item => item.Id === this.props.id)
                    .map(item => {
                        this.setState({
                            user: item,
                        });
                        return item;
                    })
                //push new report in reports array
                let oldReport = this.state.user.Reports || [];
                oldReport.push(report);

                const newUser = this.state.user;
                newUser.Reports = oldReport;

                this.setState({
                    user: newUser,
                });

                users.map(item => {
                    if (item.Id === this.state.user.Id) {
                        item.Reports = this.state.user.Reports;
                    }
                    return item;
                })
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

    handleEarnings = (e, value) => this.setState({
        earnings: value
    })

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

    handleMoreCosts = () => {
        const newArray = this.state.moreCosts;
        newArray.push({
            id: uuidv4(),
            name: '',
            KM: '',
        });
        this.setState({
            moreCosts: newArray,
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

    render() {
        return (
            <div className="field">
                <form className="form-newReport" onSubmit={this.setFirebase} >
                    <div className="rowDate">
                        <PickDays
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            handleDateStart={this.handleDateStart}
                            handleDateEnd={this.handleDateEnd}
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
                    <p>Lokacija : </p>
                    <div className="input-group">
                        <input type="text" id="mapSearch" placeholder="Search..." name="cityName" onChange={this.handleCity} required />
                    </div>
                    <MyMap
                        city={this.state.city.cityName || 'Banja Luka'}
                        handleDistance={this.handleDistance}
                    />

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
                    <p>Dodatni troškovi: </p>
                    {/* <div className="moreCosts"> */}
                    {this.state.moreCosts.map(input => <NewCosts
                        key={input.id}
                        id={input.id}
                        name={input.name}
                        KM={input.KM}
                        handleMoreCostsName={this.handleMoreCostsName}
                        handleMoreCostsValue={this.handleMoreCostsValue}
                        handleDeleteInput={this.handleDeleteInput}
                    />)}
                    {/* </div> */}
                    <FloatingActionButton
                        mini={true}
                        style={{
                            marginTop: '10px',
                        }}
                        onClick={this.handleMoreCosts}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                    <RaisedButton
                        type="submit"
                        label="Add report"
                        className="submit"
                        backgroundColor="#E0B222"
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