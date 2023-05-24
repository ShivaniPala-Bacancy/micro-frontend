import React from 'react';
import { useTranslation } from 'react-i18next';
import { dateFromTodayPlus } from '../../../common/Util';
import { IFormElementProps } from '../../../types/IFormElementProps';
import InputTypes from '../../../types/InputTypes';

function InputElement(props: IFormElementProps) {
    const [t] = useTranslation();
    const { col, error, touched } = props;
    let { register } = props;

    const {
        type = 'text',
        placeholder = '',
        hidden,
        disabled,
        onBlur,
        onChange,
        onClick
    } = col;

    let { min = 0, max = 999999999, step = 1 } = col;

    let localType = type;
    let inputClass = 'input-sm';
    // To set min and max date range for date input type
    let minDate;
    let maxDate;

    if (!register) {
        register = () => null;
    }

    if (type !== InputTypes.CHECKBOX) {
        inputClass = `${inputClass} form-control`;
    }
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
    }

    switch (type) {
        case InputTypes.DATE:
        case InputTypes.DATE_TIME:
        case InputTypes.TIME:
            if (col.min !== null) minDate = dateFromTodayPlus(min);
            if (col.max !== null) maxDate = dateFromTodayPlus(max);
            break;
        case InputTypes.MOBILE_NUMBER:
        case InputTypes.UNIT:
        case InputTypes.NUMBER:
        case InputTypes.INTEGER:
            localType = InputTypes.NUMBER;
            step = Math.ceil(step);
            break;
        case InputTypes.POSITIVE_CURRENCY_VALUE:
        case InputTypes.POSITIVE_DOUBLE_VALUE:
            localType = InputTypes.NUMBER;
            max = 999999999999.99;
            step = 0.01;
            break;
        case InputTypes.CURRENCY_VALUE:
        case InputTypes.DOUBLE_VALUE:
            localType = InputTypes.NUMBER;
            min = -999999999999.99;
            max = 999999999999.99;
            step = 0.01;
            break;
        default:
            // do nothing
            localType = 'search';
            break;
    }

    return (
        <input
            className={inputClass}
            id={col.id}
            type={localType}
            value={col.value}
            onBlur={onBlur}
            min={minDate || min}
            max={maxDate || max}
            step={step}
            hidden={hidden}
            readOnly={disabled}
            placeholder={placeholder && t(placeholder)}
            multiple={col.multiple}
            autoComplete="off"
            {...register(col.id)}
            onChange={onChange}
            onClick={onClick}
        />
    );
}

export default InputElement;
