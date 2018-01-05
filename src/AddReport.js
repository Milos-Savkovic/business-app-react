import React, { Component } from 'react';
import DayPicker from './DayPicker';
import MyMap from './MyMap';
import './addReport.css';

class AddReport extends Component {
    xhandler = () => {
        this.props.closeReport();
    }
    render() {
        return (
            <div className="field">
                <form method="post" className="form-newReport"  >
                    <div className="rowDate">
                        <DayPicker />
                    </div>
                    <p>Dnevnica : </p>
                    <div className="rowEarnings">
                        <div className="box">
                            <input type="radio" name="radioButton" value="domaća" id="choice1" className="ch1" defaultChecked />
                            <label>domaća</label>
                        </div>
                        <div className="box">
                            <input type="radio" name="radioButton" value="EX-YU" id="choice2" className="ch2" />
                            <label>EX-YU</label>
                        </div>
                        <div className="box">
                            <input type="radio" value="strana" name="radioButton" id="choice3" className="ch3" />
                            <label>strana</label>
                        </div>
                    </div>
                    <div className="drop">
                        <div className="dropItem">
                            <p>Troškove snosi : </p>
                            <div type="buttom" className="buttom-costs">
                                <select id="dropdownItem">
                                    <option name="dropdowna" value="kompanija">Kompanija</option>
                                    <option name="dropdowna" value="zaposleni">Zaposleni</option>
                                </select>
                            </div>
                        </div>
                        <div className="dropItem">
                            <p>Vrsta prevoza : </p>
                            <div type="buttom" className="buttom-costs">
                                <select id="dropdownItem">
                                    <option name="dropdowna" value="sluzbeno">Službeno vozilo</option>
                                    <option name="dropdowna" value="licno">Lično vozilo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p>Lokacija : </p>
                    <input type="text" id="mapSearch" required="" />
                    <MyMap />
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