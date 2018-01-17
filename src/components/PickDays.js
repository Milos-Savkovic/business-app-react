import React from 'react';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';

const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
export default class DatePickerExampleToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minDate: props.startDate,
            maxDate: props.endDate,
        };
    }

    handleChangeMinDate = (event, date) => {
        this.props.handleDateStart(date);
    };

    handleChangeMaxDate = (event, date) => {
        this.props.handleDateStart(date);
    };
    render() {
        console.log(this.props);
        return (
            <div>
                <div style={optionsStyle}>
                    <DatePicker
                        onChange={this.handleChangeMinDate}
                        autoOk={this.state.autoOk}
                        floatingLabelText="datum polaska"
                        maxDate={this.state.maxDate}
                        defaultDate={this.state.minDate}
                        disableYearSelection={this.state.disableYearSelection}
                    />
                    <DatePicker
                        onChange={this.handleChangeMaxDate}
                        autoOk={this.state.autoOk}
                        floatingLabelText="Datum dolaska"
                        minDate={this.state.minDate}
                        defaultDate={this.state.maxDate}
                        disableYearSelection={this.state.disableYearSelection}
                    />
                </div>
            </div>
        );
    }
}