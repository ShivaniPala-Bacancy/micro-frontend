import React from 'react';
import { IFormElementProps } from '../../../types/IFormElementProps';
import { useTranslation } from 'react-i18next';

/* eslint-disable jsx-a11y/no-autofocus */
export default function TextAreaElement(props: IFormElementProps) {
    const { col, register } = props;
    const inputClass = 'form-control input-sm';
    const { placeholder } = col;
    const { hidden } = col;
    const { disabled } = col;
    const [t] = useTranslation();
    const rows = col.rows || 3;
    const cols = col.cols || 50;
    const onBlur = (event: any) => {
        if (col.onBlur) {
            col.onBlur(event);
        }
    };
    if (col.autoFocus) {
        return (
            <textarea
                className={inputClass}
                id={col.id}
                value={col.value}
                onBlur={onBlur}
                hidden={hidden}
                rows={rows}
                cols={cols}
                readOnly={disabled}
                placeholder={placeholder && t(placeholder)}
                multiple={col.multiple}
                autoComplete="off"
                {...register(col.id)}
                onChange={col.onChange}
                onClick={col.onClick}
                autoFocus
            />
        );
    }
    return (
        <textarea
            className={inputClass}
            id={col.id}
            value={col.value}
            onBlur={onBlur}
            hidden={hidden}
            rows={rows}
            cols={cols}
            readOnly={disabled}
            placeholder={placeholder && t(placeholder)}
            multiple={col.multiple}
            autoComplete="off"
            {...register(col.id)}
            onChange={col.onChange}
            onClick={col.onClick}
        />
    );
}
