import {ColDef} from 'ag-grid-community';

interface CurrencyColumnParams {
    headerName: string;
    field: string;
    filterable?: boolean;
    sortable?: boolean;
    sort?: any;
    resizable?: boolean;
}
const formatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'INR'
});

const CurrencyColumn = (params: CurrencyColumnParams) => {
    const colDef: ColDef = {
        headerName: params.headerName,
        field: params.field,
        sortable: params.sortable,
        sort: params.sort,
        filter: params.filterable ? 'agNumberColumnFilter' : false,
        filterParams: params.filterable ? {buttons: ['reset', 'apply']} : {},
        valueFormatter: ({value}) => {
            return formatter.format(value);
        }
    };
    return colDef;
};
export default CurrencyColumn;
