import React, { Component } from 'react';
import DayPicker from './DayPicker';
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
                    <label>Dnevnica : </label>
                    <div className="dnevnica">
                        <div className="box">
                            <input type="radio" name="radioButton" value="domaća" id="choice2" defaultChecked />
                            <label>domaća</label>
                        </div>
                        <div className="box">
                            <input type="radio" name="radioButton" value="EX-YU" id="choice1" />
                            <label>EX-YU</label>
                        </div>
                        <div className="box">
                            <input type="radio" value="strana" name="radioButton" id="choice3" />
                            <label>strana</label>
                        </div>

                    </div>
                    <br />
                    <label>Troškove snosi : </label>
                    <div type="buttom" className="buttom-costs">
                        <select id="dropdownItem">
                            <option name="dropdowna" value="kompanija">Kompanija</option>
                            <option name="dropdowna" value="zaposleni">Zaposleni</option>
                        </select>
                    </div>
                    <label>Lokacija : </label>
                    <input type="text" id="mapsearch" required="" />
                    <div id="mapElement" >
                    </div>
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