import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class DatePickerExampleToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minDate: undefined,
            maxDate: undefined,
        };
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            minDate: date,
        });

        const convertDate = this.formatDate(date);
        this.props.handleDateStart(convertDate);
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            maxDate: date,
        });

        const convertDate = this.formatDate(date);
        this.props.handleDateEnd(convertDate);
    };

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;

        if (day.toString().length === 1) {
            day = "0" + day;
        }
        if (month.toString().length === 1) {
            month = "0" + month;
        }
        return day + "." + month + "." + date.getFullYear() + ".";
    }

    render() {
        return (
            <div>
                <DatePicker
                    onChange={this.handleChangeMinDate}
                    floatingLabelText="Datum polaska"
                    maxDate={this.state.maxDate}
                    defaultDate={this.state.minDate}
                    formatDate={this.formatDate}
                    firstDayOfWeek={1}
                    mode="landscape"
                    textFieldStyle={{
                        width: '130px',
                    }}
                    required
                />
                <DatePicker
                    onChange={this.handleChangeMaxDate}
                    floatingLabelText="Datum dolaska"
                    minDate={this.state.minDate}
                    defaultDate={this.state.maxDate}
                    formatDate={this.formatDate}
                    firstDayOfWeek={1}
                    mode="landscape"
                    textFieldStyle={{
                        width: '130px',
                    }}
                    required
                />
            </div>
        );
    }
}