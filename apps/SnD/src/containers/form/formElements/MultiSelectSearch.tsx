import React, {memo} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import {IFormElementProps} from '../../../types/IFormElementProps';
/* eslint-disable prefer-template,prefer-const,indent,no-param-reassign */
function MultiSelectSearch(props: IFormElementProps) {
    const {col} = props;

    const options = [
        {text: 'Location', value: '2'},
        {text: 'Address', value: '1'}
    ];

    function getLabel(data: any) {
        const selectObject = options?.find((option) => option.value === data);
        if (selectObject) {
            return selectObject.text;
        }
        return '';
    }

    const onSelect = (selectedList: any) => {
        const newData = selectedList.map((d: any) => `${d.value}`);
        props.setValue(col.id, newData);
        getSelected();
    };
    function getSelected() {
        let currentSelection: Array<any> = [];
        if (
            !props.getValues()[col.id] &&
            props.currentObject &&
            props.currentObject[col.id]
        ) {
            currentSelection = props.currentObject[col.id].map((obj: any) => {
                return {
                    value: obj,
                    label: getLabel(obj)
                };
            });
        } else if (props.getValues()[col.id]) {
            currentSelection = props.getValues()[col.id].map((obj: any) => {
                return {
                    value: obj,
                    label: getLabel(obj)
                };
            });
        }
        return currentSelection;
    }

    const createMultiSelectSearch = () => {
        const curretValue = getSelected();
        return (
            <Multiselect
                options={col.options} // Options to display in the dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={() => {}} // Function will trigger on remove event
                displayValue="text" // Property name to display in the dropdown options
                selectedValues={curretValue}
            />
        );
    };

    return <>{createMultiSelectSearch()}</>;
}

export default memo(MultiSelectSearch);
