import ICol from './ICol';
import {ISuggestions, ISuggestionsFunction} from './ISuggestions';

interface IAutoCompleteProps {
    col: ICol;
    suggestions?: ISuggestions[] | ISuggestionsFunction;
    getValues: any;
    setValue?: any;
    register?: any;
    watch?: any;
}

interface IAsyncAutoCompleteProps {
    col: ICol;
    suggestions?: ISuggestions[] | ISuggestionsFunction;
    getValues: any;
    setValue?: any;
    register?: any;
    watch?: any;
}

export type {ISuggestions, IAutoCompleteProps, IAsyncAutoCompleteProps};
