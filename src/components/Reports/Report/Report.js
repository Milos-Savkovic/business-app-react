import React from 'react';
import './Report.css';
import Update from 'material-ui/svg-icons/action/update';

const Report = (props) => {
  return (
    <div className="report-wrapper">
      <div className="report-left">
        <h3 className="report-heading">{props.name}</h3>
        <div className="report-user">{`${props.fname} ${props.lname}`}</div>
      </div>
      <div className="report-right">
        <Update
          color={'#909090'}
          hoverColor={'#3cb8ff'}
        />
        <div className="reports-date">
          <div>{`${props.date}`}</div>
        </div>
      </div>
    </div>
  );
}

export default Report;