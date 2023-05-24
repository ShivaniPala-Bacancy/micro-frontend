import React, {FC} from 'react';
import {Col} from 'react-bootstrap';
import {
    Control,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue
} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import ICol from '../../types/ICol';
import FormElement from './FormElement';

interface IFormColumn {
    col: ICol;
    columnSize: number;
    error: string | undefined;
    orientation:
        | 'stacked' // all three elements will be stacked
        | 'custom' // Label will be at left and input and errors will be stacked at right
        | 'inline'; // all will be inline
    register: UseFormRegister<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    control: Control<FieldValues>;
    parentState?: any;
    parentDispatch?: any;
    childSetStateGetter?: (data: any) => void;
}
const FormColumn: FC<IFormColumn> = (props) => {
    const [t] = useTranslation();
    const {
        col,
        error,
        columnSize,
        orientation,
        register,
        getValues,
        setValue,
        control,
        parentDispatch,
        childSetStateGetter
    } = props;
    const {
        id,
        name,
        required,
        noError,
        noLabel,
        inputSize,
        labelSize,
        errorSize,
        labelClass,
        formGroupClass,
        elementType
    } = col;
    const hasError = error && error.length > 0;
    const feedbackClass = hasError ? 'invalid-feedback' : 'valid-feedback';

    const labelEl = (size?: number, className?: string) => {
        if (noLabel) return <></>;
        if (size) {
            return (
                <Col lg={size} key={`label-${id}`}>
                    <label
                        htmlFor={id}
                        className={`control-label ${className}`}
                    >
                        {`${t(name || id)}${required ? '*' : ''}`}
                    </label>
                </Col>
            );
        }
        return (
            <label
                key={`label-${id}`}
                htmlFor={id}
                className={`control-label ${className}`}
            >
                {`${t(name || id)}${required ? '*' : ''}`}
            </label>
        );
    };

    const inputEl = (size?: number, childErrorEl?: JSX.Element) => {
        const validationClass = `${noError ? '' : 'has-validation'}`;
        if (size) {
            return (
                <Col
                    lg={size}
                    className={`input-group input-sm ${
                        formGroupClass || ''
                    } ${validationClass}`}
                    key={`input-${id}`}
                >
                    <FormElement
                        {...col}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        error={error}
                        control={control}
                        parentState={props.parentState}
                        parentDispatch={parentDispatch}
                        childSetStateGetter={childSetStateGetter}
                    />
                    {childErrorEl}
                </Col>
            );
        }
        return (
            <div
                className={`input-group input-sm ${
                    formGroupClass || ''
                } ${validationClass}`}
                key={`input-${id}`}
            >
                <FormElement
                    {...col}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                    error={error}
                    control={control}
                />
                {childErrorEl}
            </div>
        );
    };
    const errorEl = (size?: number) => {
        if (noError) return <></>;
        if (size) {
            return (
                <Col
                    lg={size}
                    className={`show-validation-error ${feedbackClass}`}
                    key={`error-${id}`}
                >
                    {hasError ? error : ''}
                </Col>
            );
        }
        return (
            <div
                className={`show-validation-error ${feedbackClass}`}
                key={`error-${id}`}
            >
                {hasError ? error : ''}
            </div>
        );
    };
    const column = () => {
        const sizeForCustomOrientation = col.size ? col.size / 2 : undefined;
        switch (orientation) {
            case 'stacked':
                return (
                    <Col lg={columnSize}>
                        {labelEl(undefined, labelClass)}
                        {inputEl(undefined, errorEl())}
                    </Col>
                );
            case 'custom': {
                return (
                    <>
                        {labelEl(
                            labelSize || sizeForCustomOrientation || 6,
                            labelClass
                        )}
                        {inputEl(
                            inputSize || sizeForCustomOrientation || 6,
                            errorEl()
                        )}
                    </>
                );
            }
            case 'inline': {
                return (
                    <>
                        {labelEl(labelSize || 4, labelClass)}
                        {inputEl(inputSize || 4)}
                        {errorEl(errorSize || 4)}
                    </>
                );
            }
        }
        return <></>;
    };
    if (elementType === 'gap') {
        return <div />;
    }

    return <>{column()}</>;
};

export default FormColumn;
