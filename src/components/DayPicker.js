import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import './dayPicker.css';
import 'moment/locale/it';

export default function Example(props) {

    const handleChangeStartDate = (day) => {
        props.handleDateStart(moment(day).format('DD.MM.YYYY'));
    }

    const handleChangeEndDate = (day) => {
        props.handleDateEnd(moment(day).format('DD.MM.YYYY'));
    }

    return (
        <div className="rowDate">
            <p>Datum polaska:</p>
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format='DD.MM.YYYY.'
                value={moment().format('DD.MM.YYYY')}
                onDayChange={handleChangeStartDate}
            />
            <p>
                Datum dolaska:
      </p>
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format='DD.MM.YYYY.'
                max="1979-12-31"
                value={moment().add(3, 'days').format('DD.MM.YYYY')}
                dayPickerProps={{
                    localeUtils: MomentLocaleUtils,
                }}
                onDayChange={handleChangeEndDate}
            />
        </div>
    );
}
