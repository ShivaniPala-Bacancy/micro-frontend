import React, {FC, memo} from 'react';
import {Controller} from 'react-hook-form';
import {Typeahead} from 'react-bootstrap-typeahead';
import {IFormElementProps} from '../../../types/IFormElementProps';
import 'react-bootstrap-typeahead/css/Typeahead.css';
/* eslint-disable no-unused-vars */
const AutoComplete: FC<IFormElementProps> = (props) => {
    const {col, error, touched, control} = props;
    const {id, options, disabled, onChange} = col;

    const isValid = error && error.length > 0;
    const isInvalid = !isValid && touched;
    let optionsList =
        options && typeof options === 'function' ? options(id) : options;
    if (optionsList) {
        optionsList = optionsList.map((option) => {
            return {...option, label: option.text, labelKey: option.value};
        });
        optionsList = optionsList.sort((a, b) => {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0;
        });
    }
    return (
        <Controller
            name={id}
            control={control}
            render={({field, fieldState}) => {
                const selected = optionsList?.filter(
                    (op) => op.value === field.value
                );
                return (
                    <Typeahead
                        id={id}
                        options={optionsList || []}
                        onChange={(e) => {
                            field.onChange(e && e[0]?.value);
                            onChange && onChange(e && e[0]?.value, e && e[0]);
                        }}
                        disabled={disabled}
                        isValid={isValid}
                        isInvalid={isInvalid}
                        defaultSelected={selected || []}
                        clearButton
                    />
                );
            }}
        />
    );
};
export default memo(AutoComplete);
