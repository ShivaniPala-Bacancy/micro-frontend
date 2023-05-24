import React, {FC, memo} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Controller} from 'react-hook-form';
import {IFormElementProps} from '../../../types/IFormElementProps';
import {formatDate} from '../../../common/Util';

/* eslint-disable no-unused-vars */
const DateElement: FC<IFormElementProps> = (props) => {
    const {col, control} = props;
    const {id, options} = col;
    return (
        <Controller
            name={id}
            control={control}
            render={({field: {onChange, value}}) => (
                <DatePicker
                    dateFormat={
                        col.showMonthYearPicker ? 'MM/yyyy' : 'dd/MM/yyyy'
                    }
                    minDate={new Date(col.minDate || '')}
                    disabled={col.disabled}
                    selected={value}
                    onChange={(value) => {
                        console.log('value is ', value);
                        onChange(value ? value : '');
                        col.onChange &&
                            col.onChange(formatDate(value || new Date()));
                    }}
                    showMonthYearPicker={col.showMonthYearPicker}
                    includeDates={options}
                    id={id}
                />
            )}
        />
    );
};
export default memo(DateElement);
