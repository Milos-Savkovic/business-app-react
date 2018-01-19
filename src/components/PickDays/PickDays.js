import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};

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
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + ".";
    }

    render() {
        return (
            <div>
                <div style={optionsStyle}>
                    <DatePicker
                        onChange={this.handleChangeMinDate}
                        floatingLabelText="Datum polaska"
                        maxDate={this.state.maxDate}
                        defaultDate={this.state.minDate}
                        formatDate={this.formatDate}
                        firstDayOfWeek={1}
                        mode="landscape"
                    />
                    <DatePicker
                        onChange={this.handleChangeMaxDate}
                        floatingLabelText="Datum dolaska"
                        minDate={this.state.minDate}
                        defaultDate={this.state.maxDate}
                        formatDate={this.formatDate}
                        firstDayOfWeek={1}
                        mode="landscape"
                    />
                </div>
            </div>
        );
    }
}