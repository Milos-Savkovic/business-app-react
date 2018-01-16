import React from 'react';
import './ReportTable.css';

export const ReportTable = (props) => {
  const style = {
    borderTop: {borderTop: '1px solid #333'},
  }
  return (
    <div className="table-container">
      <div className="table-row table-row-1">
        <div className="cell cell-1"><p className="cell-1__text">Dnevnice</p></div>
        <div className="cell cell-2">
          <div className="cell-2-row">
            Dan odlaska
            <span className="underline"></span>
            u
            <span className="underline">08:00</span>
            č
          </div>
          <div className="cell-2-row">
            Dan dolaska
            <span className="underline"></span>
            u
            <span className="underline">23:00</span>
            č
          </div>
        </div>
        <div className="cell cell-3">
          <div className="short-field">Broj sati</div>
          <div className="short-field" style={style.borderTop}></div>
        </div>
        <div className="cell cell-4">
          <div className="medium-field">Broj dana na putu</div>
          <div className="medium-field" style={style.borderTop}></div>
        </div>
        <div className="cell cell-5">
          <div className="short-field">Broj dnev</div>
          <div className="short-field" style={style.borderTop}></div>
        </div>
        <div className="cell cell-6">
          <div className="medium-field">Po KM</div>
          <div className="medium-field" style={style.borderTop}></div>
        </div>
        <div className="cell cell-7">
          <div className="medium-field medium-field-end"><b>SVEGA</b></div>
          <div className="medium-field medium-field-end" style={style.borderTop}></div>
        </div>
      </div>
      <div className="table-row table-row-2">
        <div className="cell cell-1 table-row-2-cell-1">
          Prevozni troškovi
        </div>
        <div className="cell cell-2 table-row-2-cell-1 long-field">
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
        </div>
        <div className="cell cell-3 long-field"></div>
        <div className="cell cell-4 long-field"></div>
        <div className="cell cell-5 short-field table-row-2-cell-5"></div>
        <div className="cell cell-6 medium-field table-row-2-cell-6"></div>
        <div className="cell cell-7 medium-field table-row-2-cell-7"></div>
      </div>
      <div className="table-row table-row-3"></div>
      <div className="table-row table-row-4"></div>
      <div className="table-row table-row-5"></div>
    </div>
  );
}