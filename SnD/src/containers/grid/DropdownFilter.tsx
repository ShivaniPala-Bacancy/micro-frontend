import {IFilterComp} from 'ag-grid-community';
import React from 'react';

/* eslint-disable class-methods-use-this,react/no-string-refs,jsx-a11y/label-has-associated-control */
interface IDDFilterState {
    selected: Array<string>;
    textList: Set<string>;
    field: string;
}
class DropdownFilter
    extends React.Component<{}, IDDFilterState>
    implements IFilterComp
{
    valueGetter = undefined;

    constructor(props: any) {
        super(props);
        const uniqueFilterVals: Set<string> = new Set();
        if (props.options) {
            props.options.forEach((option: any) =>
                uniqueFilterVals.add(option.text)
            );
        } else {
            props.api.forEachNode((node: any) =>
                uniqueFilterVals.add(node.data[props.colDef.field])
            );
        }

        const initList: Array<string> = [];
        this.state = {
            textList: uniqueFilterVals,
            selected: initList,
            field: props.colDef.field
        };
        this.valueGetter = props.valueGetter;
        this.filterChangedCallback = props.filterChangedCallback;
        this.filterSelectionChange = this.filterSelectionChange.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    getModel() {
        return null;
    }

    setModel() {
        console.log('setmodel');
    }

    getGui() {
        return new HTMLSelectElement();
    }

    filterChangedCallback = () => {};

    isFilterActive(): boolean {
        const {selected} = this.state;
        return selected && selected.length > 0;
    }

    doesFilterPass(params: any): boolean {
        const {selected, field} = this.state;
        return selected.includes(params.data[field]);
    }

    createFilterButton(text: string, onClick: any) {
        return (
            <button
                type="button"
                ref="resetFilterButton"
                className="ag-standard-button ag-filter-apply-panel-button"
                onClick={onClick}
            >
                {text}
            </button>
        );
    }

    resetFilter() {
        console.log('reset');
    }

    createOption(text: string, id: string, onChange?: any) {
        return (
            <div>
                <input
                    type="checkbox"
                    id={id}
                    className="regular-checkbox"
                    onChange={(event) => {
                        onChange(text, event.target.checked);
                    }}
                />
                <label htmlFor={id} />
                <label>{text}</label>
            </div>
        );
    }

    filterSelectionChange(id: string, checked: boolean) {
        const {selected} = this.state;
        if (checked) {
            this.setState(
                {selected: [...selected, id]},
                this.filterChangedCallback
            );
        } else {
            this.setState(
                {selected: selected.filter((e) => e !== id)},
                this.filterChangedCallback
            );
        }
    }

    createOptions() {
        const options: Array<any> = [];
        const {textList} = this.state;
        textList.forEach((txt) => {
            options.push(
                this.createOption(txt, txt, this.filterSelectionChange)
            );
        });
        return options;
    }

    render() {
        return (
            <div className="ag-filter">
                <div className="ag-filter-wrapper ag-focus-managed">
                    <div className="ag-filter-body-wrapper ag-simple-filter-body-wrapper">
                        <div
                            className="ag-filter-select ag-labeled ag-label-align-left"
                            role="presentation"
                            ref="eOptions1"
                        >
                            <div
                                className="ag-virtual-list-viewport ag-filter-virtual-list-viewport ag-focus-managed"
                                role="listbox"
                            >
                                {this.createOptions()}
                            </div>
                        </div>
                    </div>
                    <div className="ag-filter-apply-panel">
                        {this.createFilterButton('Reset', this.resetFilter)}
                    </div>
                </div>
            </div>
        );
    }
}
export default DropdownFilter;
