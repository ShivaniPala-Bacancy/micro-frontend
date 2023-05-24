import React, { FC, memo } from 'react';
import { Form } from 'react-bootstrap';
import { IFormElementProps } from '../../../types/IFormElementProps';
import { useTranslation } from 'react-i18next';

/* eslint-disable no-unused-vars */
const SelectElement: FC<IFormElementProps> = (props) => {
    const { col, error, touched } = props;
    let { register } = props;
    if (!register) {
        register = () => {
            return {};
        };
    }
    const { id, options, hidden, disabled, onChange, changeHandler } = col;
    const [t] = useTranslation();

    let inputClass = 'selectpicker form-control';
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
    }
    let optionsList =
        options && typeof options === 'function' ? options(id) : options;
    if (optionsList) {
        optionsList = optionsList.sort((a, b) => {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0;
        });
    }

    const emptyOption = () => {
        return (
            <option key={`${id}-default`} value="" className="small">
                {col.placeholder ? t(col.placeholder) : "Please Select"}
            </option>
        );
    };
    const optionTags = () => {
        if (optionsList) {
            return [
                emptyOption(),
                ...optionsList
                    .filter((opt) => opt)
                    .map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.text}
                        </option>
                    ))
            ];
        }
        return props.defaultOption;
    };
    const fieldRegister = register(id);
    const origOnChange = fieldRegister.onChange;

    fieldRegister.onChange = (e: any) => {
        const res = origOnChange && origOnChange(e);
        try {
            if (onChange) onChange(e);
            if (changeHandler) changeHandler(id, e.target.value);
        } catch (err) {
            // Ignore error
        }
        return res;
    };
    return (
        <Form.Control
            as="select"
            id={id}
            className={inputClass}
            hidden={hidden}
            disabled={disabled}
            {...fieldRegister}
        >
            {optionTags()}
        </Form.Control>
    );
};

export default memo(SelectElement);
