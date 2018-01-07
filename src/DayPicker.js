import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

export default function Example() {

    const handleChange = (e) => {
        console.log(e);
    }

    return (
        <div>
            <p>Datum polaska:</p>
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format='DD.MM.YYYY.'
                value={moment().format('DD.MM.YYYY')}
                onChange={handleChange}

            />
            <p>
                Datum dolaska:
      </p>
            <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format='DD.MM.YYYY.'
                value={moment().add(3, 'days').format('DD.MM.YYYY')}
                dayPickerProps={{
                    localeUtils: MomentLocaleUtils,
                }}
                onChange={handleChange}
            />
        </div>
    );
}
