import ICol from './ICol';

interface IFormElementProps {
    col: ICol;
    getValues?: any;
    setValue?: any;
    register?: any;
    watch?: any;
    key1?: string;
    defaultOption?: any;
    checked?: boolean;
    control?: any;
    errors?: any;
    currentObject?: any;
    parentDispatch?: any;
    parentState?: any;
    isErrorPresent?: boolean;
    error?: any;
    columnSize?: number;
    touched?: boolean;
    horizontal?: boolean;
    userDefined?: boolean;
    parentValue?: any;
    childSetStateGetter?: (data: any) => void;
}

export type {IFormElementProps};
