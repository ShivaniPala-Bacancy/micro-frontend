import { CellClassParams, ColDef, ValueFormatterParams } from 'ag-grid-community';

/* eslint-disable prefer-template */
class GridColumnDef {
    colDef: ColDef;

    constructor(headerName: string, field: string) {
        this.colDef = {
            field,
            headerName,
            filter: true,
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200
            },
            floatingFilter: true,
            resizable: true,
            sortable: true,
            editable: false,
            tooltipField: field
        };
    }

    build() {
        return this.colDef;
    }

    pinned(toRight: boolean) {
        this.colDef.pinned = toRight ? 'right' : 'left';
        return this;
    }

    allowFilter(val = true) {
        this.colDef.filter = val;
        return this;
    }

    fixedSize() {
        this.colDef.resizable = false;
        return this;
    }

    sortable(val = true) {
        this.colDef.sortable = val;
        return this;
    }

    sorted(direction: 'asc' | 'desc', index: number) {
        this.colDef.sortable = true;
        this.colDef.initialSort = direction;
        this.colDef.initialSortIndex = index;
        return this;
    }

    editable(val = true, changeHandler?: any, editor?: string) {
        this.colDef.editable = val;
        this.colDef.onCellValueChanged = changeHandler;
        this.colDef.enableCellChangeFlash = true;
        if (editor) this.colDef.cellEditor = editor;
        return this;
    }

    setType(val: string) {
        this.colDef.type = val;
        return this;
    }

    asDate() {
        this.colDef.valueFormatter = GridColumnDef.dateToString;
        this.colDef.filter = 'agDateColumnFilter';
        return this;
    }

    asNumber() {
        this.colDef.type = 'rightAligned';
        this.colDef.filter = 'agNumberColumnFilter';
        return this;
    }

    asAmount() {
        this.colDef.type = 'rightAligned';
        this.colDef.filter = 'agNumberColumnFilter';
        this.colDef.valueFormatter = GridColumnDef.currencyFormatter;
        this.colDef.cellStyle = { color: 'maroon', fontWeight: 'bold' };
        return this;
    }

    asInt() {
        this.colDef.type = 'rightAligned';
        this.colDef.filter = 'agNumberColumnFilter';
        this.colDef.valueFormatter = GridColumnDef.intFormatter;
        this.colDef.cellStyle = { color: 'maroon', fontWeight: 'bold' };
        return this;
    }

    asIcon() {
        this.colDef.filter = false;
        this.colDef.cellRenderer = 'IconRenderer';
        this.colDef.cellStyle = { textAlign: 'center', fontSize: '20px' };
        return this;
    }

    asHyperLink() {
        this.colDef.cellStyle = { color: 'blue', cursor: 'pointer' };
        return this;
    }

    asErrorLink() {
        this.colDef.cellStyle = { color: 'red', cursor: 'pointer' };
        return this;
    }

    fixedClass(className: string) {
        this.colDef.cellClass = className;
        return this;
    }

    dynamicClass(classByCellValue: (value: any) => string) {
        this.colDef.cellClass = (param: CellClassParams) => {
            return classByCellValue(param.value);
        };
    }

    hideFloatingFilter() {
        this.colDef.floatingFilter = false;
        return this;
    }

    dropdownFilter(options?: any) {
        this.colDef.filter = 'DropdownFilter';
        if (options) {
            this.colDef.filterParams = options;
        }
        return this;
    }

    static amountFormatter(param: ValueFormatterParams): string {
        const cellValue = param.data[param.colDef.field || ''];
        if (Number.isNaN(cellValue)) {
            return cellValue;
        }
        return `${GridColumnDef.toNumber(
            param.data[param.colDef.field || ''],
            2
        )}`;
    }

    static currencyFormatter(param: ValueFormatterParams): string {
        const cellValue = param.data[param.colDef.field || ''];
        if (Number.isNaN(cellValue)) {
            return cellValue;
        }
        if (param.colDef.field?.indexOf('.')) {
            const fieldArray = param.colDef.field.split('.');
            if (fieldArray.length == 2) {
                return `${GridColumnDef.toCurrency(
                    param.data[fieldArray[0]][fieldArray[1]],
                    param?.data?.code
                )}`;
            } else if (fieldArray.length == 3) {
                return `${GridColumnDef.toCurrency(
                    param.data[fieldArray[0]][fieldArray[1]][fieldArray[2]],
                    param?.data?.code
                )}`;
            } else if (fieldArray.length == 1) {
                return `${GridColumnDef.toCurrency(
                    param.data[fieldArray[0]],
                    param?.data?.code
                )}`;
            } else {
                return `${GridColumnDef.toCurrency(
                    param.data[fieldArray[0]],
                    param?.data?.code
                )}`;
            }
        } else {
            return `${GridColumnDef.toCurrency(
                param.data[param.colDef.field || ''],
                param?.data?.code
            )}`;
        }
    }

    static intFormatter(param: ValueFormatterParams): string {
        const cellValue = param.data[param.colDef.field || ''];
        if (Number.isNaN(cellValue)) {
            return cellValue;
        }
        return `${GridColumnDef.toNumber(
            param.data[param.colDef.field || ''],
            0
        )}`;
    }

    static toNumber(num: number, decimalPlaces: number) {
        if (num === undefined || num === null || typeof num !== 'number') {
            return '';
        }
        return num
            .toFixed(decimalPlaces)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    static toCurrency(num: number, code?: string) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: code || 'INR'

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        if (num === undefined || num === null || typeof num !== 'number') {
            return '';
        }
        return formatter.format(Number(num));
    }

    static dateToString(param: ValueFormatterParams): string {
        return `${GridColumnDef.formatDateTime(
            param.data[param.colDef.field || '']
        )}`;
    }

    static formatDateTime(date: Date) {
        if (!date) return null;
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        let hours = d.getHours() + '';
        let minutes = d.getMinutes() + '';
        let seconds = d.getSeconds() + '';

        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (seconds.length < 2) seconds = '0' + seconds;
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let dateStr = [year, month, day].join('-');
        dateStr = dateStr + ' ' + hours + ':' + minutes + ':' + seconds;
        if (dateStr === 'NaN-NaN-NaN NaN:NaN:NaN') return null;
        return dateStr;
    }
}
export default GridColumnDef;
