import React, {FC, memo, useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons';
import {ISuggestions} from 'src/types/ISuggestions';
import {IFormElementProps} from '../../../types/IFormElementProps';

/* eslint-disable no-unused-vars */
const MultiSelect: FC<IFormElementProps> = (props) => {
    const {col, error, touched, getValues, setValue} = props;
    const [selectedOptions, setSelectedOptions] = useState<ISuggestions[]>([]);
    const [nonSelectedOptions, setNonSelectedOptions] = useState<
        ISuggestions[]
    >([]);
    let {register} = props;
    if (!register) {
        register = () => {
            return {};
        };
    }
    const {id, options, disabled} = col;

    useEffect(() => {
        filterSelected(getValues(col.id));
        filterNonSelected(getValues(col.id));
    }, [col.options]);

    useEffect(() => {}, [selectedOptions, nonSelectedOptions]);
    let inputClass = 'selectpicker form-control';
    let errorClass = '';
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
        errorClass = 'is-invalid';
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
        errorClass = 'is-valid';
    }
    let optionsList =
        options && typeof options === 'function' ? options(id) : options;
    if (optionsList) {
        optionsList = optionsList.sort((a, b) => {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0;
        });
        optionsList.forEach((opt) => (opt.key = opt.value));
    }

    const emptyOption = () => {
        return (
            <option key={`${id}-default`} value="" className="small">
                Please Select
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

    function filterNonSelected(values?: string[]) {
        if (values) {
            const nonSelected =
                (optionsList &&
                    optionsList.filter(
                        (opt) => values.indexOf(opt.value) < 0
                    )) ||
                [];
            setNonSelectedOptions(nonSelected);
        } else setNonSelectedOptions(optionsList || []);
    }
    function filterSelected(values?: string[]) {
        if (values) {
            const selected =
                (optionsList &&
                    optionsList.filter(
                        (opt) => values.indexOf(opt.value) >= 0
                    )) ||
                [];
            setSelectedOptions(selected);
        } else setSelectedOptions([]);
    }

    function handleClickOnSelected(event: any) {
        const clickedVal = event.target.id;
        const currentValues = props
            .getValues()
            [id].filter((cv: any) => cv !== clickedVal);
        setValue(id, currentValues, {shouldDirty: true});
        filterSelected(currentValues);
        filterNonSelected(currentValues);
    }
    function handleClickOnNonSelected(event: any) {
        const clickedVal = event.target.id;
        const currentValues = getValues()[id];
        currentValues.push(clickedVal);
        setValue(id, currentValues, {shouldDirty: true});
        filterSelected(currentValues);
        filterNonSelected(currentValues);
    }

    function creatOptionVisible(opt: ISuggestions, selected: boolean) {
        return (
            <li
                className={`list-group-item my-list-group ${
                    disabled ? 'disabled' : 'clickable'
                }`}
                id={opt.value}
                value={opt.value}
                key={opt.key}
                data-text={opt.text}
                onClick={
                    selected ? handleClickOnSelected : handleClickOnNonSelected
                }
            >
                {opt.text}
            </li>
        );
    }
    return (
        <>
            <div
                className={`row  multi-select-container multi-select-div ${errorClass}`}
                data-required={col.required}
            >
                <ul className="list-group col-lg-5 multi-select-ul non-selected list-from scrollbar">
                    {nonSelectedOptions.map((opt) =>
                        creatOptionVisible(opt, false)
                    )}
                </ul>
                <div className="icon">
                    <FontAwesomeIcon icon={faExchangeAlt} />
                </div>

                <ul className="list-group col-lg-5 multi-select-ul selected list-to scrollbar">
                    {selectedOptions.map((opt: any) =>
                        creatOptionVisible(opt, true)
                    )}
                </ul>
            </div>
            <Form.Control
                style={{display: 'none'}}
                as="select"
                id={id}
                className={inputClass}
                disabled={disabled}
                {...fieldRegister}
                multiple
            >
                {optionTags()}
            </Form.Control>
        </>
    );
};

export default memo(MultiSelect);
