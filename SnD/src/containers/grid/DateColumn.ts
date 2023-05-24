import {ColDef} from 'ag-grid-community';

interface DateColumnParams {
    headerName: string;
    field: string;
    filterable?: boolean;
    sortable?: boolean;
    sort?: any;
    resizable?: boolean;
}
const DateColumn = (params: DateColumnParams) => {
    const dateComparator = (filterDate: Date, cellValue: string): number => {
        if (cellValue == null) return 0;
        const cellDateValue = new Date(cellValue);
        if (cellDateValue > filterDate) return 1;
        if (cellDateValue < filterDate) return -1;
        return 0;
    };
    const colDef: ColDef = {
        headerName: params.headerName,
        field: params.field,
        sortable: params.sortable,
        sort: params.sort,
        filter: params.filterable ? 'agDateColumnFilter' : false,
        filterParams: params.filterable
            ? {
                  buttons: ['reset', 'apply'],
                  comparator: dateComparator
              }
            : {}
    };
    return colDef;
};
export default DateColumn;
