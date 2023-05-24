import React, { FC, memo, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Controller } from 'react-hook-form';
import { ISuggestions } from 'src/types/ISuggestions';
import { IFormElementProps } from '../../../types/IFormElementProps';

/* eslint-disable no-unused-vars */
const AsyncAutoComplete: FC<IFormElementProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [multiSelected, setMultiSelected] = useState<any>([]);
    const [optionsList, setOptionsList] = useState<ISuggestions[]>([]);

    const { col, error, touched, control } = props;
    // const { id, options, disabled, onChange, selectedSuggestion } = col;
    const { id, options, disabled, onChange, selectedSuggestion, multiple } = col;

    const isInvalid = error && error.length > 0;
    const isValid = !isInvalid;

    const handleSearch = (query: string) => {
        if (!options || typeof options !== 'function') return;
        setIsLoading(true);
        if (!query || query.length < 2) {
            return;
        }
        options(id, query, (suggestions: Array<ISuggestions>) => {
            if (suggestions)
                if (suggestions.length === 0) {
                    setOptionsList([]);
                    setOptionsList([]);
                    setIsLoading(false);
                } else {
                    const newOptions = suggestions.map((option) => {
                        return {
                            ...option,
                            label: option.text,
                            labelKey: option.value
                        };
                    });
                    setOptionsList(newOptions);
                    setOptionsList(newOptions);
                    setIsLoading(false);
                }
        });
    };
    const filterBy = () => true;

    return (
        <Controller
            name={id}
            control={control}
            render={({ field }) => {
                const dirty = control._getDirty();
                let selected: any = [];
                if (multiple) {
                    if (!dirty && selectedSuggestion) {
                        if (typeof selectedSuggestion !== 'function') {
                            setMultiSelected(selectedSuggestion);
                        }
                    }
                } else {
                    selected = optionsList?.filter(
                        (op) => op.value === field.value
                    );
                    if (
                        !selected ||
                        (selected.length === 0 && selectedSuggestion)
                    ) {
                        if (typeof selectedSuggestion !== 'function') {
                            selected = [selectedSuggestion];
                        }
                    }
                }
                return (
                    <AsyncTypeahead
                        id={id}
                        filterBy={filterBy}
                        isLoading={isLoading}
                        onInputChange={handleSearch}
                        minLength={1}
                        onSearch={handleSearch}
                        options={optionsList}
                        onChange={(e) => {
                            if (multiple) {
                                const options: any = e?.map(
                                    (select) => select.value
                                );
                                const optionString = options.join(',');
                                setMultiSelected(e);
                                onChange && onChange(optionString);
                                field.onChange(optionString);
                            } else {
                                onChange &&
                                    onChange(e && e[0]?.value, e && e[0]);
                                field.onChange(e && e[0]?.value);
                            }
                        }}
                        disabled={disabled}
                        multiple={multiple}
                        isValid={false}
                        isInvalid={isInvalid}
                        defaultSelected={selected || []}
                        selected={multiple ? multiSelected : selected || []}
                        clearButton
                    />
                );
            }}
        />
    );
};
export default memo(AsyncAutoComplete);
