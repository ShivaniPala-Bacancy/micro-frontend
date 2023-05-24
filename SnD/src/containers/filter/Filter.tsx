/* eslint-disable no-unused-vars,eqeqeq,no-lonely-if,no-unused-vars,no-use-before-define,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {isDate} from 'util';
import IFilter, {IFilterOperator} from '../../types/IFilter';
import IFilterTypes from '../../types/IFilterTypes';
import {ISuggestions} from '../../types/ISuggestions';
import FormFieldFactory from '../form/FormFieldFactory';
import FORM from '../form/NewForm';
import './styles.css';

interface IDataTypeToOperatorMapping {
    str: IFilterOperator[];
    dat: IFilterOperator[];
    num: IFilterOperator[];
}

const MAPPINGS: IDataTypeToOperatorMapping = {
    str: ['*=', '==', 'in'],
    dat: ['==', '<', '<=', '>', '>=', 'in'],
    num: ['==', '<', '<=', '>', '>=', 'in']
};

const getInputField = (fdt: string) => {
    switch (fdt) {
        case 'date':
            return FormFieldFactory.date('value', '', 'value')
                .hideLabel()
                .hideError()
                .setRequired(true);
        case 'number':
            return FormFieldFactory.number('value', '', 'value')
                .hideLabel()
                .hideError()
                .setRequired(true)
                .setLength(0, 999999999999999);
        case 'string':
            return FormFieldFactory.text('value', '', 'value')
                .hideLabel()
                .hideError()
                .setRequired(true)
                .setLength(5, 100);
        default:
            return FormFieldFactory.gap('gap1', '');
    }
};

const Filter = (props: any) => {
    const [t] = useTranslation();
    const {filterObject, rootPath, onFilterSet} = props;
    const [filterTypes, setFilterTypes] = useState<IFilterTypes[]>([]);
    const [allowedOperators, setOperators] = useState<IFilterOperator[]>([]);
    const [dataType, setDataType] = useState<string>('string');
    const [selectedFilters, setSelectedFilters] = useState<IFilter[]>([]);
    const [defaultObject, setDefaultObject] = useState({
        key: '',
        operator: '',
        value: ''
    });

    const getOperatorOptions = (): ISuggestions[] => {
        return allowedOperators.map((op) => {
            return {
                text: op,
                value: op
            };
        });
    };

    const getFilterFieldOptions = () => {
        return filterTypes.map((ft) => {
            return {
                text: t(ft.path),
                value: ft.path
            };
        });
    };
    useEffect(() => {
        setFilterTypes(traverse(filterObject, rootPath || 'root'));
    }, []);

    function traverse(obj: any, path?: string): IFilterTypes[] {
        let typeArray: IFilterTypes[] = [];
        Object.entries(obj).forEach((entry) => {
            const [key, value] = entry;
            const valueDataType = typeof value;
            if (valueDataType == 'object') {
                if (Array.isArray(value)) {
                    typeArray = typeArray.concat(
                        traverse(value[0], `${path}.${key}`)
                    );
                } else {
                    if (isDate(value)) {
                        typeArray.push({
                            type: 'date',
                            path: `${path}.${key}`
                        });
                    } else {
                        typeArray = typeArray.concat(
                            traverse(value, `${path}.${key}`)
                        );
                    }
                }
            } else {
                typeArray.push({
                    type: valueDataType,
                    path: `${path}.${key}`
                });
            }
        });
        return typeArray;
    }

    useEffect(() => {
        onFilterSet(selectedFilters);
    }, [selectedFilters]);

    const filterSelectionChanged = (e: any) => {
        const matchedFilterType = filterTypes.find(
            (ft) => ft.path === e.target.value
        );
        if (!matchedFilterType) {
            return;
        }
        setDataType(matchedFilterType.type);
        switch (matchedFilterType.type) {
            case 'string':
                setOperators(MAPPINGS.str);
                break;
            case 'date':
                setOperators(MAPPINGS.dat);
                break;
            case 'number':
                setOperators(MAPPINGS.num);
                break;
            default:
                setOperators(MAPPINGS.str);
                break;
        }
    };

    const fields = [
        FormFieldFactory.select('fieldSelector', '', getFilterFieldOptions)
            .setOnChange(filterSelectionChanged)
            .setRequired(true)
            .hideLabel()
            .hideError()
            .setAddOn('Filter', false)
            .setSize(4, 0, 4, 0),
        FormFieldFactory.select('operator', '', getOperatorOptions)
            .hideLabel()
            .hideError()
            .setRequired(true)
            .setSize(2, 0, 2, 0),
        getInputField(dataType)
    ];

    const onFormValid = (data: any) => {
        setSelectedFilters([
            ...selectedFilters,
            {...data, id: selectedFilters.length, key: data.fieldSelector}
        ]);
        setDefaultObject({key: '', operator: '', value: ''});
        return Promise.resolve(true);
    };

    const removeFilter = (filterId: number | undefined) => {
        if (filterId !== undefined) {
            const newFilterList = [...selectedFilters].filter(
                (f) => f.id !== filterId
            );
            setSelectedFilters(newFilterList);
        }
    };
    const renderSelectedFilter = (filter: IFilter) => {
        return (
            <span
                className="list-group-item list-group-item-action flex-column align-items-start"
                key={filter.id}
                id={`${filter.id}`}
            >
                <i
                    className="fas fa-trash text-danger clickable"
                    onClick={() => removeFilter(filter.id)}
                />
                <small className="ml-2">{t(filter.key)}</small>
                <small className="ml-2">{filter.operator}</small>
                <small className="ml-2">{filter.value}</small>
            </span>
        );
    };
    const renderSelectedFilters = () => {
        return (
            <div className="list-group col-6">
                {selectedFilters.map(renderSelectedFilter)}
            </div>
        );
    };

    return (
        <>
            <div className="col-12 mb-2">
                <FORM
                    id="filter-form"
                    fields={fields}
                    type="inline"
                    showButtons={false}
                    onValid={onFormValid}
                    defaultValues={defaultObject}
                />
            </div>
            <div className="col-12">{renderSelectedFilters()}</div>
        </>
    );
};

export default Filter;
