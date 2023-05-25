import React, {memo} from 'react';
import {CSVLink} from 'react-csv';
import {useTranslation} from 'react-i18next';
import ElementTypes from '../../types/ElementTypes';
import ICol from '../../types/ICol';
import {IFormElementProps} from '../../types/IFormElementProps';
import InputTypes from '../../types/InputTypes';
import AutoComplete from './formElements/AutoComplete';
import CheckboxElement from './formElements/CheckboxElement';
import CsvElement from './formElements/CsvElement';
import FormElement from './formElements/FormElement';
import InputElement from './formElements/InputElement';
import MultiSelect from './formElements/MultiSelect';
import MultiSelectSearchElement from './formElements/MultiSelectSearchElement';
import SelectElement from './formElements/SelectElement';
import SelectSearchElement from './formElements/SelectSearchElement';
import TextAreaElement from './formElements/TextAreaElement';
import IconComponent from './IconComponent';

import './styles.css';

function element(
    col: ICol,
    register: any,
    setValue: any,
    getValues: any,
    watch?: any,
    currentObject?: any,
    parentDispatch?: any,
    parentState?: any,
    error?: any,
    touched?: boolean
) {
    switch (col.elementType) {
        case ElementTypes.SELECT:
            return (
                <SelectElement
                    register={register}
                    col={col}
                    setValue={setValue}
                    getValues={getValues}
                    error={error}
                    touched={touched}
                    watch={watch}
                    parentDispatch={parentDispatch}
                    parentState={parentState}
                />
            );
        case ElementTypes.SELECT_SEARCH:
            return (
                <SelectSearchElement
                    register={register}
                    col={col}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    currentObject={currentObject}
                    touched={touched}
                />
            );
        case ElementTypes.MULTI_SELECT_SEARCH:
            return (
                <MultiSelectSearchElement
                    register={register}
                    col={col}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    currentObject={currentObject}
                    touched={touched}
                />
            );
        case ElementTypes.MULTI_SELECT:
            return (
                <MultiSelect
                    col={col}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                    watch={watch}
                    currentObject={currentObject}
                    touched={touched}
                />
            );
        case ElementTypes.CHECK_BOX:
            return (
                <CheckboxElement
                    col={col}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                    checked={false}
                    touched={touched}
                />
            );
        case ElementTypes.LIST:
            return <></>;
        case ElementTypes.GAP:
            return <></>;
        case ElementTypes.CSV:
            return (
                <CsvElement
                    col={col}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    error={error}
                    touched={touched}
                />
            );
        case ElementTypes.AOTU_COMPLETE_SERVER_SIDE:
        case ElementTypes.AUTO_COMPLETE_CLIENT_SIDE:
            return (
                <AutoComplete
                    col={col}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                />
            );
        case ElementTypes.TEXT_AREA:
            return (
                <TextAreaElement
                    register={register}
                    col={col}
                    getValues={getValues}
                    setValue={setValue}
                    touched={touched}
                />
            );
        default:
            return (
                <InputElement
                    register={register}
                    col={col}
                    getValues={getValues}
                    setValue={setValue}
                    error={error}
                    touched={touched}
                />
            );
    }
}

function inputGroupAddOnBack(
    col: ICol,
    sampleFileTitle: string,
    getValues: any
) {
    if (col.csvData) {
        return (
            <span
                className="input-group-text clickable"
                title={sampleFileTitle}
            >
                <CSVLink data={col.csvData} filename={col.fileName}>
                    <i className="fas fa-download" />
                </CSVLink>
            </span>
        );
    }
    if (!col.backAddOn) return null;
    if (col.addOnLabel) {
        return (
            <span
                tabIndex={-1}
                className="input-group-addon"
                onClick={col.addOnAction}
                onKeyDown={col.addOnAction}
                role="button"
            >
                <>{col.addOnLabel}</>
            </span>
        );
    }
    const currentValue = getValues()[col.id];
    return (
        <span
            className="input-group-text"
            onClick={col.addOnAction}
            onKeyDown={col.addOnAction}
            role="button"
            tabIndex={-2}
        >
            <IconComponent iconName={currentValue} />
        </span>
    );
}

function FormElementWrapper(props: IFormElementProps) {
    const [t] = useTranslation();
    const {
        col,
        register,
        setValue,
        getValues,
        watch,
        currentObject,
        parentDispatch,
        parentState,
        error,
        columnSize,
        touched,
        horizontal,
        userDefined
    } = props;
    const sampleFileTitle = 'app.sample.file';
    function inputGroupAddOn() {
        if (col.type) {
            switch (col.type) {
                case InputTypes.CURRENCY_VALUE:
                case InputTypes.POSITIVE_CURRENCY_VALUE:
                    return (
                        <span className="input-group-text">
                            {t('app.currency')}
                        </span>
                    );
                case InputTypes.MOBILE_NUMBER:
                    return (
                        <span className="input-group-text">
                            {t('app.country-code')}
                        </span>
                    );
                default: {
                    if (col.frontAddOn) {
                        return (
                            <span className="input-group-text">
                                {col.addOnIcon ? <>{col.addOnIcon}</> : <></>}
                            </span>
                        );
                    }
                    return null;
                }
            }
        }
        return <></>;
    }
    const frontInputGroupAddon = inputGroupAddOn();
    const backInputGroupAddon = inputGroupAddOnBack(
        col,
        sampleFileTitle,
        getValues
    );
    const colLabelClass = `${col.labelClass || ''}`;
    return (
        <FormElement
            columnSize={columnSize}
            horizontal={horizontal}
            colLabelClass={colLabelClass}
            isRequired={col.required}
            colName={col.name}
            colKey={col.key}
            frontInputGroupAddon={frontInputGroupAddon}
            backInputGroupAddon={backInputGroupAddon}
            error={error}
            userDefined={userDefined}
            noLabel={col.noLabel}
            noError={col.noError}
        >
            {element(
                col,
                register,
                setValue,
                getValues,
                watch,
                currentObject,
                parentDispatch,
                parentState,
                error,
                touched
            )}
        </FormElement>
    );
}
export default memo(FormElementWrapper);
