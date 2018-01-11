import React from 'react';
import './ReportTable.css';

export const ReportTable = (props) => {
  return (
    <div className="table-container">
      <div className="table-row table-row-1">
        <div className="row-1 row-1-cell-1"><p className="row-1-cell-1__text">Dnevnice</p></div>
        <div className="row-1 row-1-cell-2">
          <div className="cell-2-row"></div>
          <div className="cell-2-row"></div>
        </div>
        <div className="row-1 row-1-cell-3"></div>
        <div className="row-1 row-1-cell-4"></div>
        <div className="row-1 row-1-cell-5"></div>
        <div className="row-1 row-1-cell-6"></div>
        <div className="row-1 row-1-cell-7"></div>
      </div>
      <div className="table-row table-row-2"></div>
      <div className="table-row table-row-3"></div>
      <div className="table-row table-row-4"></div>
    </div>
  );
}