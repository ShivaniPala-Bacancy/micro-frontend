import React, {FC, useState} from 'react';
import {IFormElementProps} from '../../../types/IFormElementProps';

const CheckboxElement: FC<IFormElementProps> = (props: IFormElementProps) => {
    const [checkboxLabel] = useState('');
    const {col, error, touched} = props;
    let {register} = props;
    const {hidden, disabled, onChange} = col;
    let inputClass = 'input-sm form-control';
    if (!register) {
        register = () => null;
    }
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
    }

    const fieldRegister = register(col.id);
    const origOnChange = fieldRegister.onChange;

    fieldRegister.onChange = (e: any) => {
        const res = origOnChange(e);
        try {
            if (onChange) onChange(e);
        } catch (err) {
            // Ignore error
        }
        return res;
    };
    return (
        <div
            className="custom-control custom-switch"
            style={{cursor: 'pointer'}}
        >
            <input
                id={col.id}
                type="checkbox"
                name={col.id}
                style={{cursor: 'pointer'}}
                className={`custom-control-input ${inputClass}`}
                hidden={hidden}
                readOnly={disabled}
                {...fieldRegister}
            />
            <label
                className="custom-control-label"
                htmlFor={col.id}
                style={{cursor: 'pointer'}}
            >
                {checkboxLabel}
            </label>
        </div>
    );
};

export default CheckboxElement;
