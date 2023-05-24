import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ColDef, CsvExportParams } from 'ag-grid-community';
import IFilter from './IFilter';

interface IGridToolbarAction {
    enabled: boolean;
    icon: IconProp;
    handler: any | undefined;
    text?: string;
}
interface IGridToolbar {
    id: string;
    actions: IGridToolbarAction[];
}
type ObjectWithStringKeyAndValues = { [key: string]: string };
type RefDataFn = () => ObjectWithStringKeyAndValues;
interface IGrid {
    columnDefs: ColDef[];
    refDataFunctions: {
        [key: string]: RefDataFn;
    };
    exportParam?: CsvExportParams;
    pagination?: boolean;
    pageSize?: number;
}

interface IGridProps {
    id: string;
    grid: IGrid;
    rowData: object[];
    fetchNextPage: any;
    moreDataExists: boolean;
    editEnabled?: boolean;
    editHandler?: any;
    deleteEnabled?: boolean;
    deleteHandler?: any;
    downloadEnabled?: boolean;
    downloadHandler?: any;
    viewEnabled?: boolean;
    viewHandler?: any;
    plusEnabled?: boolean;
    plusHandler?: any;
    acceptEnabled?: boolean;
    acceptHandler?: any;
    rejectEnabled?: boolean;
    rejectHandler?: any;
    removeEnabled?: boolean;
    removeHandler?: any;
    undoEnabled?: boolean;
    iconEnabled?: boolean;
    undoHandler?: any;
    iconHandler?: any;
    icon?: any;
    topEnabled?: boolean;
    topHandler?: any;
    bottomEnabled?: boolean;
    bottomHandler?: any;
    addEnabled?: boolean;
    addHandler?: (obj?: any) => any | void;
    bulkDeleteHandler?: any;
    bulkUndoHandler?: any;
    bulkAcceptHandler?: any;
    bulkRejectHandler?: any;
    bottomPinnedRowData?: any[];
    rowClassRules?: any;
    checkboxSelectionEnabled?: any;
    checkboxSelectionHandler?: any;
    filterEnabled?: boolean;
    filterHandler?: boolean;
    getGridApi?: (obj?: any) => any | void;
    getColor?: (obj?: any) => any | void;
    commentEnabled?: boolean;
    commentHandler?: any;
    approveHandler?: any;
    approveEnabled?: boolean;
    cancelHandler?: any;
    cancelEnabled?: boolean;
    onRowSelected?: any;
    filterChaneHandler?: (filters: IFilter[]) => void;
    filterSubmitHandler?: () => void;
    clearFilterHandler?: () => void;
    updateRowData?: any;
    onCellClicked?: any;
    totalFilters?: number;
    showColor?: boolean;
    singleSelection?: boolean;
    noPadding?: boolean;
    overlay?: boolean;
}

export type { IGrid, IGridProps, IGridToolbar, IGridToolbarAction };
