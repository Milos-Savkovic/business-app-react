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
          <div className="long-field">{destinations[0].from}</div>
          <div className="long-field">{destinations[1] ? destinations[1].from : null}</div>
          <div className="long-field">{destinations[2] ? destinations[2].from : null}</div>
          <div className="long-field">{destinations[3] ? destinations[3].from : null}</div>
          <div className="long-field">{destinations[4] ? destinations[4].from : null}</div>
          <div className="long-field">{destinations[5] ? destinations[5].from : null}</div>
          <div className="long-field long-field-end"></div>
        </div>
        <div className="cell cell-3 table-row-2-cell-3">
          <div className="long-field">Do</div>
          <div className="long-field">{destinations[0].to}</div>
          <div className="long-field">{destinations[1] ? destinations[1].to : null}</div>
          <div className="long-field">{destinations[2] ? destinations[2].to : null}</div>
          <div className="long-field">{destinations[3] ? destinations[3].to : null}</div>
          <div className="long-field">{destinations[4] ? destinations[4].to : null}</div>
          <div className="long-field">{destinations[5] ? destinations[5].to : null}</div>
          <div className="long-field long-field-end"></div>
        </div>
        <div className="cell cell-4 table-row-2-cell-4">
          <div className="long-field">Vrsta prevoza</div>
          <div className="long-field">{rep.typeOfTransport}</div>
          <div className="long-field">{destinations[1] ? rep.typeOfTransport : null}</div>
          <div className="long-field">{destinations[2] ? rep.typeOfTransport : null}</div>
          <div className="long-field">{destinations[3] ? rep.typeOfTransport : null}</div>
          <div className="long-field">{destinations[4] ? rep.typeOfTransport : null}</div>
          <div className="long-field">{destinations[5] ? rep.typeOfTransport : null}</div>
          <div className="long-field long-field-end"></div>
        </div>
        <div className="cell cell-5 table-row-2-cell-5">
          <div className="short-field short-field-row-2">Kl.</div>
          <div className="short-field short-field-row-2"></div>
          <div className="short-field short-field-row-2"></div>
          <div className="short-field short-field-row-2"></div>
          <div className="short-field short-field-row-2"></div>
          <div className="short-field short-field-row-2"></div>
          <div className="short-field short-field-row-2"></div>
          <div className="short-field short-field-end short-field-row-2"></div>
        </div>
        <div className="cell cell-6 table-row-2-cell-6">
          <div className="medium-field medium-field-row-2">KM</div>
          <div className="medium-field medium-field-row-2">{(destinations[0].distance / 7).toFixed(2)}</div>
          <div className="medium-field medium-field-row-2">{destinations[1] ? (destinations[1].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[2] ? (destinations[2].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[3] ? (destinations[3].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[4] ? (destinations[4].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[5] ? (destinations[5].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2 medium-field-end"></div>
        </div>
        <div className="cell cell-7 table-row-2-cell-7">
          <div className="medium-field medium-field-row-2"></div>
          <div className="medium-field medium-field-row-2">{(destinations[0].distance / 7).toFixed(2)}</div>
          <div className="medium-field medium-field-row-2">{destinations[1] ? (destinations[1].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[2] ? (destinations[2].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[3] ? (destinations[3].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[4] ? (destinations[4].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2">{destinations[5] ? (destinations[5].distance / 7).toFixed(2) : null}</div>
          <div className="medium-field medium-field-row-2 medium-field-end"></div>
        </div>
      </div>
      <div className="table-row table-row-8">
        <div className="cell cell-1 table-row-8-cell-1">
          <p className="cell-1__text">Ostalo</p>
        </div>
        <div className="cell cell-6 table-row-2-cell-6">
          <div className="longer-field"></div>
          <div className="longer-field"></div>
          <div className="longer-field" style={{ borderBottom: 0 }}></div>
        </div>
        <div className="cell cell-6 table-row-2-cell-6">
          <div className="medium-field medium-field-row-2"></div>
          <div className="medium-field medium-field-row-2"></div>
          <div className="medium-field medium-field-row-2 medium-field-end"></div>
        </div>
        <div className="cell cell-7 table-row-2-cell-7">
          <div className="medium-field medium-field-row-2">{props.totalCosts.rest}</div>
          <div className="medium-field medium-field-row-2"></div>
          <div className="medium-field medium-field-row-2 medium-field-end"></div>
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
          Broj priloga: <span className="underline underline-medium">{rep.protocol}</span>
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