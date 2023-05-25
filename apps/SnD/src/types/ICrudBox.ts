/* eslint-disable no-shadow */
import {ColDef} from 'ag-grid-community';
import {IForm} from './IForm';
import {ISuggestions} from './ISuggestions';
import {ITabs} from './ITabs';

export enum CrudEvents {
    FORM_CLOSE,
    FORM_SUBMIT,
    FORM_RESET,
    FILTER_SUBMIT,
    FILTER_RESET,
    NEW_RECORD,
    NEW_RECORD_SUCCESS,
    EDIT_RECORD_SUCCESS,
    DELETE_RECORD_SUCCESS,
    RESOURCE_LOADED,
    RESOURCE_PAGE_LOADED,
    FETCHING,
    FETCH_ERROR,
    CLEAR_RESOURCES,
    NEXT_PAGE,
    DROPDOWN_LOADED,
    DROPDOWN_FETCHING,
    FORM_FIELDS_CHANGED,
    EDIT,
    DELETE,
    NEW_RECORD_SUCCESS_FROM_TAB,
    NEW_RECORD_FROM_TAB,
    COMPONENTS_RECEIVED,
    EDIT_FROM_TABS,
    LOAD_CHILD_DROPDOWN,
    GRID_REFERENCES_LOADED,
    TAB_SWITCHED,
    TAB_CRUD_ACTION,
    REFRESH_TABS_STATE,
    FORM_ERROR
}
enum CrudActions {
    ADD = 'add',
    ADD_FROM_TAB = 'add_from_tab',
    UPDATE = 'update',
    DELETE = 'delete',
    FETCH = 'fetch'
}
interface ICrudBoxState {
    showGrid: boolean;
    action: CrudActions;
    filterBusy: boolean;
    formBusy: boolean;
    gridBusy: boolean;
    submitHidden: boolean;
    submitDisabled: boolean;
    addHidden: boolean;
    addUrl?: string;
    nextUrl?: string;
    editUrl?: string;
    resourceList: any[];
    resourceName: string;
    resourceId: string;
    nextEnabled?: boolean;
    dropdowns?: Array<{[index: string]: ISuggestions[]}>;
    formDetail?: IForm;
    filterFormDetail?: IForm;
    gridFields: ColDef[];
    currentObject?: any;
    refData?: {
        [key: string]: {
            [key: string]: string;
        };
    };
    tabsState?: Array<{[index: string]: any}>;
    defaultTab?: ITabs;
    tabsComponent?: Array<ITabs>;
    tabsUrl?: string;
    currentTabsComponent?: Array<ITabs>;
    currentTab?: string;
    postSubmit?: any;
    postResourceLoaded?: any;
    filterUrl?: string;
    error?: any;
    isErrorPresent?: boolean;
}

interface IDropdownConfig {
    id: string;
    url?: string;
    getData?: () => ISuggestions[];
    mapper?: (obj: any) => ISuggestions[];
    mapParams?: string[];
}
interface IEventFunction {
    (event: any): void;
}
interface ICrudBox {
    id: string;
    title: string;
    form: IForm;
    filterForm?: IForm;
    filterEnabled: boolean;
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
    postSubmit?: any;
    postResourceLoaded?: any;
    filterUrl?: string;
}

export default ICrudBox;
export type {ICrudBoxState, IDropdownConfig};
