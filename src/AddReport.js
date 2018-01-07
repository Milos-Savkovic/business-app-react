import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from './DayPicker';
import MyMap from './MyMap';
import './addReport.css';

class AddReport extends Component {

    state = {
        city: {
            cityName: '',
            distance: 0,
        },
        inputs: {
            earnings: 'domaća',
            typeOfTransport: 'sluzbeno',
            costs: 'kompanija',
        },
        startDate: moment().format('DD.MM.YYYY'),
        endDate: moment().add(3, 'days').format('DD.MM.YYYY'),
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

    handleInputs = (e) => {
        const inputs = this.state.inputs;
        const name = e.target.name;
        const value = e.target.value;

        inputs[name] = value;
        this.setState({
            inputs
        })
    }

    handleCity = (e) => {
        e.preventDefault();
        const city = this.state.city;
        const name = e.target.name;
        const value = e.target.value;

        city[name] = value;

        this.setState({
            city
        })
    }

    xhandler = () => {
        this.props.closeReport();
    }
    render() {
        console.log(this.state);
        return (
            <div className="field">
                <form method="post" className="form-newReport"  >
                    <div className="rowDate">
                        <DayPicker
                            handleDateStart={this.handleDateStart}
                            handleDateEnd={this.handleDateEnd}
                        />
                    </div>
                    <p>Dnevnica : </p>
                    <div className="rowEarnings" onChange={this.handleInputs}>
                        <div className="box">
                            <input type="radio" name="earnings" value="domaća" id="choice1" className="ch1" defaultChecked />
                            <label>domaća</label>
                        </div>
                        <div className="box">
                            <input type="radio" name="earnings" value="EX-YU" id="choice2" className="ch2" />
                            <label>EX-YU</label>
                        </div>
                        <div className="box">
                            <input type="radio" value="strana" name="earnings" id="choice3" className="ch3" />
                            <label>strana</label>
                        </div>
                    </div>
                    <div className="drop">
                        <div className="dropItem">
                            <p>Troškove snosi : </p>
                            <div className="buttom-costs" onChange={this.handleInputs}>
                                <select id="dropdownItem" name="costs">
                                    <option name="dropdowna" value="kompanija">Kompanija</option>
                                    <option name="dropdowna" value="zaposleni">Zaposleni</option>
                                </select>
                            </div>
                        </div>
                        <div className="dropItem">
                            <p>Vrsta prevoza : </p>
                            <div className="buttom-costs" onChange={this.handleInputs}>
                                <select id="dropdownItem" name="typeOfTransport">
                                    <option name="dropdowna" value="sluzbeno">Službeno vozilo</option>
                                    <option name="dropdowna" value="licno">Lično vozilo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p>Lokacija : </p>
                    <div className="input-group">
                        <input type="text" className="form-control" id="mapSearch" placeholder="Search..." name="cityName" onChange={this.handleCity} required />
                    </div>
                    <MyMap
                        city={this.state.city.cityName || 'Banja Luka'}
                        handleDistance={this.handleDistance}
                    />
                    <div
                        className="close"
                        onClick={this.xhandler}
                    >
                        X
                    </div>
                    <input type="submit" value="Add report" className="submit" />
                </form>

            </div>
        );
    }
}
export default AddReport;