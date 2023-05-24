import React, {memo} from 'react';
import Select from 'react-select';
import {IFormElementProps} from '../../../types/IFormElementProps';
import {ISuggestions, ISuggestionsFunction} from '../../../types/ISuggestions';

function MultiSelectSearchElement(props: IFormElementProps) {
    const {col, register} = props;
    let optionsList =
        col.options && typeof col.options === 'function'
            ? col.options(col.key)
            : col.options;

    function getLabel(data: any) {
        const selectObject = optionsList?.find(
            (option) => option.value === data
        );
        if (selectObject) {
            return selectObject.text;
        }
        return '';
    }

    function getSelected() {
        let currentSelection: Array<any> = [];
        if (
            !props.getValues()[col.key] &&
            props.currentObject &&
            props.currentObject[col.key]
        ) {
            currentSelection = props.currentObject[col.key].map((obj: any) => {
                return {
                    value: obj,
                    label: getLabel(obj)
                };
            });
        } else if (props.getValues()[col.key]) {
            currentSelection = props.getValues()[col.key].map((obj: any) => {
                return {
                    value: obj,
                    label: getLabel(obj)
                };
            });
        }
        return currentSelection;
    }
    getSelected();
    if (optionsList && typeof optionsList !== 'function') {
        optionsList = optionsList.sort((a, b) => {
            if (a.text > b.text) return 1;
            if (a.text < b.text) return -1;
            return 0;
        });
    }

    const onSelection = (data: any) => {
        const newData = data.map((d: any) => `${d.value}`);
        props.setValue(col.key, newData);
        getSelected();
    };

    const createOptions = () => {
        if (optionsList && typeof optionsList !== 'function') {
            return optionsList.map((option) => {
                return {
                    label: option.text,
                    value: option.value
                    // mapId: option.
                };
            });
        }
        return [];
    };
    function createHiddenOptions(
        options: Array<ISuggestions> | ISuggestionsFunction
    ) {
        return (
            typeof options !== 'function' &&
            options.map((opt) => <option value={opt.value}>{opt.text}</option>)
        );
    }
    function getCurrentValues() {
        return props.getValues()[col.key];
    }

    const createHiddenSelect = () => {
        return (
            <select
                multiple
                defaultValue={getCurrentValues()}
                name={col.key}
                id={col.key}
                ref={register}
                style={{display: 'none'}}
            >
                {optionsList && createHiddenOptions(optionsList)}
            </select>
        );
    };

    const menuStyles = {
        menu: (styles: any) => ({...styles, position: 'relative'})
    };

    const createMultiSelectSearch = () => {
        const curretValue = getSelected();
        return (
            <Select
                options={createOptions()}
                className="select-search-zindex"
                style={{position: 'relative!'}}
                multiple
                name={col.key}
                closeMenuOnSelect={false}
                menuIsOpen
                value={curretValue}
                search
                styles={menuStyles}
                isMulti
                placeholder="Select products.."
                onChange={onSelection}
            />
        );
    };

    return (
        <>
            {createHiddenSelect()}
            {createMultiSelectSearch()}
        </>
    );
}

export default memo(MultiSelectSearchElement);
