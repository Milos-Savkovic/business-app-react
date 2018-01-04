import React, { Component } from 'react';
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
                        <label>Datum polaska: </label>
                        <input id="date1" />
                        <label>Datum dolaska: </label> 
                        <input id="date2" />
                    </div>
                    <label>Dnevnica : </label>
                    <label>domaća</label>
                    <input type="radio" name="radioButton" value="domaća" id="choice2" defaultChecked />
                    <label>EX-YU</label>
                    <input type="radio" name="radioButton" value="EX-YU" id="choice1" />
                    <label>strana</label>
                    <input type="radio" value="strana" name="radioButton" id="choice3" />
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
                </form>
                <div
                    className="close"
                    onClick={this.xhandler}
                >
                    X
                </div>
            </div>
        );
    }
}
export default AddReport;