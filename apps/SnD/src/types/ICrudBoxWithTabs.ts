import {ColDef} from 'ag-grid-community';
import {IForm} from './IForm';
import {IDropdownConfig} from './ICrudBox';
import {ITabs} from './ITabs';

interface IEventFunction {
    (event: any): void;
}

interface ICrudBoxWithTabs {
    id: string;
    title: string;
    defaultActiveTab: string;
    form?: IForm;
    filterForm?: IForm;
    filterEnabled?: boolean;
    gridFields: ColDef[];
    resourceUrl: string;
    resourceId: string;
    resourceName: string;
    dropDowns?: IDropdownConfig[];
    header?: any;
    children?: any;
    border?: boolean;
    solid?: boolean;
    options?: any;
    icon?: string;
    collapsable?: boolean;
    closable?: boolean;
    titleRight?: boolean;
    noPadding?: boolean;
    type?: string;
    badge?: string;
    toolIcon?: string;
    customOptions?: any;
    className?: string;
    footerClass?: string;
    textCenter?: boolean;
    padding?: true;
    bodyClassName?: string;
    style?: any;
    footer?: any;
    onGridClose?: IEventFunction;
    onFormClose?: IEventFunction;
    preSubmit?: any;
    defaultComponent: ITabs;
    tabsUrl: string;
    gridReferenceData?: IDropdownConfig[];
    currentTabs: Array<ITabs>;
    filterUrl?: string;
}

export default ICrudBoxWithTabs;
