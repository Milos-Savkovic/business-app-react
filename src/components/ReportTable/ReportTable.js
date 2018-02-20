import React from 'react';
// import { Route } from 'react-router-dom';
// import EditReport from '../EditReport/EditReport';
import './ReportTable.css';
import moment from 'moment';

export const ReportTable = (props) => {
  const style = {
    borderTop: { borderTop: '1px solid #333' },
    borderBottom: { borderBottom: '1px solid #333' },
  }
  const rep = props.report;
  const days = props.days;
  const sum = props.sum;
  const dailyEarnings = props.dailyEarnings;
  const destinations = props.cities;
  const costs = props.extraCosts;
  const avareageConsumption = props.report.personalVehicleFuel;
  const priceOfFuel = props.report.fuelPrice;
  const tableRowsOf = (arrayOfObjects, typeOfTransport, option, divClass, rows, formula) => {
    let array = [];
    for (let i = 0; i <= rows; i++) {
      array.push(arrayOfObjects[i] ? arrayOfObjects[i] : '');
    }
    if (!typeOfTransport) {
      return array.map((obj, id) => {
        return <div key={id} className={divClass.join(' ')}>{!formula ? (obj ? obj[option] : '') : (obj ? formula(obj, option) : '')}</div>
      });
    } else {
      return array.map((obj, id) => {
        return <div key={id} className={divClass.join(' ')}>{obj ? typeOfTransport : ''}</div>
      });
    }
  }
  const formulas = {
    replaceComma: (obj, prop) => +parseFloat(obj[prop].replace(/,/g, ".")).toFixed(2),
    priceForFuel: (obj, prop) => (obj[prop] * (+avareageConsumption) / 100 * (+priceOfFuel)).toFixed(2),
  }
  const tripExpense = transitionType => {
    switch (transitionType) {
      case 'službeno':
        return tableRowsOf([], null, null, ["medium-field", "medium-field-row-2"], 6);
      case 'autobus':
        return tableRowsOf(destinations, null, "busTicket", ["medium-field", "medium-field-row-2"], 6);
      case 'lično':
        return tableRowsOf(destinations, null, "distance", ["medium-field", "medium-field-row-2"], 6, formulas.priceForFuel);
      default:
        return 0;
    }
  }
  const expense = tripExpense(rep.typeOfTransport);
  const tickets = () => {
    if (rep.typeOfTransport === 'autobus') {
      const ticketCount = destinations.map(dest => dest.busTicket ? 1 : 0).reduce((amount, val) => amount + val);
      return ticketCount;
    } else return 0;
  }
  const numberOfTickets = tickets();
  const countExtraCosts = (array) => {
    const count = array.map(item => {
      if (item.number) {
        return parseInt(item.number, 10);
      } else return 1;
    }).reduce((a, b) => a + b);
    return count;
  };
  const numberOfExtraCosts = costs.length >= 1 ? countExtraCosts(costs) : 0;
  console.log(costs);
  return (
    <div className="table-container">
      <div className="table-row table-row-1">
        <div className="cell cell-1">
          <p className="cell-1__text">Dnevnice</p>
        </div>
        <div className="cell table-row-cell-2">
          <div className="cell-2-row">
            Dan odlaska&nbsp;
            <span className="underline">{rep.date1}</span>
            &nbsp;u
            <span className="underline">{rep.startTime}</span>
            č
          </div>
          <div className="cell-2-row">
            Dan dolaska&nbsp;
            <span className="underline">{rep.date2}</span>
            &nbsp;u
            <span className="underline">{rep.endTime}</span>
            č
          </div>
        </div>
        <div className="cell cell-3">
          <div className="short-field">Broj sati</div>
          <div className="short-field" style={style.borderTop}></div>
        </div>
        <div className="cell cell-4">
          <div className="medium-field">Broj dana na putu</div>
          <div className="medium-field" style={style.borderTop}>{days}</div>
        </div>
        <div className="cell cell-5">
          <div className="short-field">Broj dnev</div>
          <div className="short-field" style={style.borderTop}>{days}</div>
        </div>
        <div className="cell cell-6">
          <div className="medium-field">Po KM</div>
          <div className="medium-field" style={style.borderTop}>{dailyEarnings}</div>
        </div>
        <div className="cell cell-7">
          <div className="medium-field medium-field-end"><b>SVEGA</b></div>
          <div className="medium-field medium-field-end" style={style.borderTop}>{props.totalCosts.daily.toFixed(2)}</div>
        </div>
      </div>
      <div className="table-row table-row-2">
        <div className="cell cell-1 table-row-2-cell-1">
          <p className="cell-1__text">Prevozni troškovi</p>
        </div>
        <div className="cell cell-2 table-row-2-cell-2">
          <div className="long-field">Od</div>
          {tableRowsOf(destinations, null, 'from', ['long-field'], 6)}
        </div>
        <div className="cell cell-3 table-row-2-cell-3">
          <div className="long-field">Do</div>
          {tableRowsOf(destinations, null, 'to', ['long-field'], 6)}
        </div>
        <div className="cell cell-4 table-row-2-cell-4">
          <div className="long-field">Vrsta prevoza</div>
          {tableRowsOf(destinations, rep.typeOfTransport, 'to', ['long-field'], 6)}
        </div>
        <div className="cell cell-5 table-row-2-cell-5">
          <div className="short-field short-field-row-2">Kl.</div>
          {tableRowsOf([], null, null, ["short-field", "short-field-row-2"], 6)}
        </div>
        <div className="cell cell-6 table-row-2-cell-6">
          <div className="medium-field medium-field-row-2">KM</div>
          {expense}
        </div>
        <div className="cell cell-7 table-row-2-cell-7">
          <div className="medium-field medium-field-row-2"></div>
          {expense}
        </div>
      </div>
      <div className="table-row table-row-8">
        <div className="cell cell-1 table-row-8-cell-1">
          <p className="cell-1__text">Ostalo</p>
        </div>
        <div className="cell cell-6 table-row-2-cell-6">
          {tableRowsOf(costs, null, 'name', ['longer-field'], 2)}
        </div>
        <div className="cell cell-6 table-row-2-cell-6">
          {tableRowsOf(costs, null, 'KM', ['medium-field', 'medium-field-row-2'], 2, formulas.replaceComma)}
        </div>
        <div className="cell cell-7 table-row-2-cell-7">
          {tableRowsOf(costs, null, 'KM', ['medium-field', 'medium-field-row-2'], 2, formulas.replaceComma)}
        </div>
      </div>
      <div className="table-row table-row-3">
        <div className="cell cell-2 table-row-3-cell-1">
          <div className="large-field">
            <div className="medium-field medium-field-row-2">Svega</div>
          </div>
          <div className="large-field">
            <div className="medium-field medium-field-row-2 large-field-no-border">Primljena akontacija</div>
          </div>
        </div>
        <div className="cell cell-2 table-row-3-cell-2">
          <div className="medium-field medium-field-row-2">{sum}</div>
          <div className="medium-field medium-field-row-2 medium-field-end">{0}</div>
        </div>
      </div>
      <div className="table-row table-row-4">
        <div className="table-row-4-1">
          Broj priloga: <span className="underline underline-medium">{(costs ? numberOfExtraCosts : 0) + numberOfTickets}</span>
        </div>
        <div className="table-row-4-2">
          Ostaje za isplatu-uplatu&nbsp;
        </div>
        <div className="medium-field medium-field-row-2">{sum}</div>
      </div>
      <div className="table-row table-row-5"></div>
      <div className="table-row table-row-6">
        U&nbsp;
        <span className="underline underline-long">Banjoj Luci</span>
        dana&nbsp;
        <span className="underline underline-long">{moment().format('DD.MM.YYYY')}</span>
        &nbsp;&nbsp;
        <span className="underline underline-large"></span>
      </div>
      <div className="table-row table-row-7">Potpis podnosioca obračuna&nbsp;</div>
    </div>
  );
}