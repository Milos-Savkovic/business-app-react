import React from 'react';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';


let DateTimeFormat;

if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    // const IntlPolyfill = require('intl');
    // DateTimeFormat = IntlPolyfill.DateTimeFormat;
    // require('intl/locale-data/jsonp/fr');
    // require('intl/locale-data/jsonp/fa-IR');
    DateTimeFormat = global.Intl.DateTimeFormat;
}


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
        const m = moment.locale();
        console.log(m);
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
                        firstDayOfWeek={1}
                        mode="landscape"
                        formatDate={new DateTimeFormat('en', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        }).format}
                    />
                    <DatePicker
                        onChange={this.handleChangeMaxDate}
                        autoOk={this.state.autoOk}
                        floatingLabelText="Datum dolaska"
                        minDate={this.state.minDate}
                        defaultDate={this.state.maxDate}
                        disableYearSelection={this.state.disableYearSelection}
                        firstDayOfWeek={1}
                        mode="landscape"
                        formatDate={new DateTimeFormat('en', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        }).format}
                    />
                </div>
            </div>
        );
    }
}