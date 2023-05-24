import {SubmitErrorHandler, SubmitHandler} from 'react-hook-form/dist/types';
import {IMouseEventHandler} from './EventHandlers';
import ICol from './ICol';

interface IForm {
    fields: Array<ICol>;
    numberOfColumns?: 1 | 2 | 3 | 4;
    defaultValues?: any;
    currentObject?: any;
    horizontal?: boolean;
    userDefined?: boolean;
}

interface IFormProps {
    id: string;
    form: IForm;
    showButtons?: boolean;
    submitDisabled?: boolean;
    submitHidden?: boolean;
    submitButtonText?: string;
    resetButtonText?: string;
    children?: any;
    currentObject?: any;
    parentDispatch?: any;
    onValid: SubmitHandler<any>;
    resetHandler?: IMouseEventHandler;
    onInvalid?: SubmitErrorHandler<any>;
    parentState?: any;
    error?: any;
    isErrorPresent?: boolean;
    waiting?: boolean;
    hideReset?: boolean;
    formClassName?: string;
    showAdd?: boolean;
}

interface INewFormProps {
    id: string;
    type: 'stacked' | 'inline' | 'horizontal' | 'semi-stacked' | 'custom';
    fields: Array<ICol>;
    numberOfColumns?: 1 | 2 | 3 | 4 | 6; // Only applicable for horizontal and custom types
    defaultValues?: any; // To set initial values
    currentObject?: any; // To reset values of the form from outside
    showButtons?: boolean; // Will render submit and reset buttons if true
    submitButtonText?: string; // Custom text for submit button. default is Submit
    resetButtonText?: string; // Custom text for reset button, default is Reset
    submitDisabled?: boolean; // Will set submit button disabled
    submitHidden?: boolean; // Will hide submit button, reset button may still be visible
    resetHidden?: boolean;
    children?: any; // Form fields
    error?: any; // List of validation errors
    isErrorPresent?: boolean;
    waiting?: boolean; // If true than Submit and reset buttons will be disabled and will show spinner
    formClassName?: string;
    onValid: SubmitHandler<any> | ((data: any, dirty: any) => void); // Will be called on form submit and validation successful.
    onInvalid?: SubmitErrorHandler<any>; // Will be called on form submit and validation failure.
    showAdd?: boolean;
    useReset?: boolean;
    nameButton?: string;
    parentState?: any;
    parentDispatch?: (data: any) => void;
    childSetStateGetter?: (data: any) => void;
    resetImage?: (data: any) => void;
    getResetForm?: (data: any) => void;
    customButton?: boolean;
    singleFieldDefault?: any;
    onChange?: any;
    btnLeft?: boolean;
}

export type {IForm, IFormProps, INewFormProps};
