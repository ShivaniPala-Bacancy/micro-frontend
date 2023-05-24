import React, {memo} from 'react';
import Select from 'react-select';
import {IFormElementProps} from '../../../types/IFormElementProps';

const SelectSearchElement = (props: IFormElementProps) => {
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
        let currentSelection;
        if (!props.getValues()[col.key] && props.currentObject) {
            currentSelection = {
                value: props.currentObject[col.key],
                label: getLabel(props.currentObject[col.key])
            };
        } else {
            currentSelection = {
                value: props.getValues()[col.key],
                label: getLabel(props.getValues()[col.key])
            };
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

    const createOptions = () => {
        if (optionsList && typeof optionsList !== 'function') {
            const options = optionsList.map((op) => {
                return {
                    label: op.text,
                    value: op.value
                };
            });
            return options;
        }
        return [];
    };

    const onSelection = (data: any) => {
        props.setValue(col.key, data.value);
        getSelected();
    };
    const menuStyles = {
        menu: (styles: any) => ({...styles, position: 'relative'})
    };

    const createSelectSearch = () => {
        const currentValue = getSelected();
        return (
            <>
                <input
                    style={{display: 'none'}}
                    type="text"
                    name={col.key}
                    ref={register}
                />

                <Select
                    name={col.key}
                    id={col.id}
                    styles={menuStyles}
                    value={currentValue}
                    options={createOptions()}
                    onChange={onSelection}
                    placeholder="Select City"
                    ref={register}
                    isSearchable
                />
            </>
        );
    };

    return <>{createSelectSearch()}</>;
};

export default memo(SelectSearchElement);
