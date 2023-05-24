import {ColDef, CsvExportParams, GridOptions} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {IGridProps, IGridToolbarAction} from '../../types/IGrid';
import DropdownFilter from './DropdownFilter';
import IconRenderer from './IconRenderer';
import ColFactory from './GridColumnFactory';
import GridToolbar from './GridToolbar';
import NumberCellEditory from './NumberCellEditor';
import './style.css';

/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */
let gridApi: any = null;
let gridColumnApi: any = null;
const GRID_THEME = 'ag-theme-balham';
const GRID_STYLE = {width: '100%', height: 'auto'};
const GRID_STYLE_NOPADDING = {width: '100%'};
const GRID_CSV_PARAMS: CsvExportParams = {
    columnSeparator: ',',
    fileName: 'download'
};
const GridComponent = (props: IGridProps) => {
    const [t] = useTranslation();
    const {
        id,
        grid,
        rowData,
        iconEnabled,
        iconHandler,
        icon,
        fetchNextPage,
        moreDataExists,
        editEnabled,
        onRowSelected,
        editHandler,
        deleteEnabled,
        deleteHandler,
        plusEnabled,
        plusHandler,
        downloadEnabled,
        downloadHandler,
        viewEnabled,
        viewHandler,
        removeEnabled,
        removeHandler,
        acceptEnabled,
        acceptHandler,
        rejectEnabled,
        rejectHandler,
        undoEnabled,
        undoHandler,
        topEnabled,
        topHandler,
        bottomEnabled,
        bottomHandler,
        addEnabled,
        addHandler,
        bulkDeleteHandler,
        bulkUndoHandler,
        bulkAcceptHandler,
        bulkRejectHandler,
        bottomPinnedRowData,
        rowClassRules,
        checkboxSelectionEnabled,
        checkboxSelectionHandler,
        commentEnabled,
        commentHandler,
        filterEnabled,
        filterHandler,
        approveHandler,
        approveEnabled,
        cancelEnabled,
        cancelHandler,
        onCellClicked,
        filterChaneHandler,
        filterSubmitHandler,
        clearFilterHandler,
        totalFilters,
        showColor,
        singleSelection,
        updateRowData,
        noPadding = false,
        overlay
    } = props;
    useEffect(() => {
        if (overlay == true) {
            onBtShowLoading();
        } else if (overlay == false) {
            onBtHide();
        }
        if (gridApi) gridApi.refreshCells();
        if (gridApi && updateRowData) {
            updateRowData(gridApi);
        }
    }, [rowData]);
    if (gridApi && bottomPinnedRowData) {
        gridApi.setPinnedBottomRowData(bottomPinnedRowData);
    }

    const getColdefsFromProps = () => {
        return [...grid.columnDefs].map((col: ColDef) => {
            const newCol = {...col};
            newCol.headerName = t(newCol.headerName || '');
            const refDataFunction = grid.refDataFunctions[newCol.field || ''];
            if (refDataFunction) {
                newCol.refData = refDataFunction();
            }
            return newCol;
        });
    };

    const getColDefs = () => {
        const colDefs = getColdefsFromProps();

        if (editEnabled) colDefs.push(ColFactory.action(editHandler, 'edit'));
        if (deleteEnabled)
            colDefs.push(
                ColFactory.action(deleteHandler, 'delete', bulkDeleteHandler)
            );
        if (plusEnabled) colDefs.push(ColFactory.action(plusHandler, 'plus'));
        if (removeEnabled)
            colDefs.push(ColFactory.action(removeHandler, 'minus'));
        if (topEnabled) colDefs.push(ColFactory.action(topHandler, 'arrow-up'));
        if (bottomEnabled)
            colDefs.push(ColFactory.action(bottomHandler, 'arrow-down'));
        if (iconEnabled) colDefs.push(ColFactory.action(iconHandler, icon));
        if (viewEnabled) colDefs.push(ColFactory.action(viewHandler, 'view'));
        if (commentEnabled)
            colDefs.push(ColFactory.action(commentHandler, 'comment'));
        if (undoEnabled)
            colDefs.push(
                ColFactory.action(undoHandler, 'undo', bulkUndoHandler)
            );
        if (acceptEnabled)
            colDefs.push(
                ColFactory.action(acceptHandler, 'accept', bulkAcceptHandler)
            );
        if (rejectEnabled)
            colDefs.push(
                ColFactory.action(rejectHandler, 'reject', bulkRejectHandler)
            );
        if (downloadEnabled)
            colDefs.push(ColFactory.action(downloadHandler, 'download'));

        if (checkboxSelectionEnabled) {
            const tick: ColDef = ColFactory.action(
                checkboxSelectionHandler,
                'select'
            );
            tick.checkboxSelection = true;
            tick.headerCheckboxSelection = true;
            colDefs.push(tick);
        }
        return colDefs;
    };

    const onBtShowLoading = () => {
        gridApi?.showLoadingOverlay();
    };

    const onBtHide = () => {
        gridApi?.hideOverlay();
    };

    const downloadCsv = () => {
        gridApi.exportDataAsCsv({
            columnKeys: grid.columnDefs.map((c) => c.field),
            processCellCallback: (param: any) => {
                const {colDef} = param.column;
                if (param.column.colDef.refData) {
                    return typeof colDef.refData === 'function'
                        ? colDef.refData()[param.value]
                        : colDef.refData[param.value];
                }
                return param.value;
            }
        });
    };

    const getToolbarActions = () => {
        const toolbarActions: IGridToolbarAction[] = [
            {handler: downloadCsv, enabled: true, icon: 'file-csv'}
        ];

        const clearFilters = () => {
            gridApi.setFilterModel(null);
            clearFilterHandler && clearFilterHandler();
        };

        if (clearFilterHandler) {
            toolbarActions.push({
                handler: clearFilters,
                enabled: totalFilters !== undefined && totalFilters > 0,
                icon: '500px',
                text: 'Clear Filters'
            });
        }
        if (filterSubmitHandler) {
            toolbarActions.push({
                handler: filterSubmitHandler,
                enabled: true,
                icon: 'search'
            });
        }

        if (fetchNextPage) {
            toolbarActions.push({
                handler: fetchNextPage,
                enabled: moreDataExists,
                icon: 'arrow-right'
            });
        }
        if (addEnabled && addHandler) {
            toolbarActions.push({
                handler: addHandler,
                enabled: true,
                icon: 'plus'
            });
        }
        if (approveEnabled && approveHandler) {
            toolbarActions.push({
                handler: approveHandler,
                enabled: true,
                icon: 'check'
            });
        }
        if (cancelEnabled && cancelHandler) {
            toolbarActions.push({
                handler: cancelHandler,
                enabled: true,
                icon: 'times'
            });
        }

        if (filterEnabled && filterHandler) {
            toolbarActions.push({
                handler: filterHandler,
                enabled: true,
                icon: 'filter'
            });
        }
        return toolbarActions;
    };

    const onGridReady = (params: any) => {
        gridApi = params.api;
        gridApi.sizeColumnsToFit();
        gridColumnApi = params.columnApi;
        if (bottomPinnedRowData) {
            gridApi.setPinnedBottomRowData(bottomPinnedRowData);
        }
    };

    const onSelectionChanged = (params: any) => {
        gridApi = params.api;
        if (props.getGridApi) {
            props.getGridApi(gridApi);
        }
    };

    const gridOptions: GridOptions = {
        domLayout: 'autoHeight',
        accentedSort: true,
        animateRows: true,
        defaultCsvExportParams: grid.exportParam || GRID_CSV_PARAMS,
        multiSortKey: 'ctrl',
        pagination: grid.pagination,
        paginationPageSize: grid.pageSize || 10,
        scrollbarWidth: 1,
        rowClassRules: rowClassRules || undefined,
        getRowStyle: (params: any) => {
            if (showColor && params.data.parentOptionId === '') {
                return {background: '#ADD8E6'};
            }
            if (params.data?.level == 'medium') {
                return {background: 'rgb(247 247 45 / 30%)'};
            }
            if (params.data?.level == 'low') {
                return {background: 'rgb(255 0 0 / 30%)'};
            }
            if (params.data?.level == 'high') {
                return {background: 'rgb(39 228 39 / 30%)'};
            }
        },
        onFilterChanged: (data: any) => {
            const filterData = data.api.filterManager?.activeColumnFilters.map(
                (aaf: any) => {
                    return {
                        filterColId:
                            (aaf.textFilterParams &&
                                aaf.textFilterParams.column.colId) ||
                            aaf.providedFilterParams.column.colId,
                        filter: aaf.appliedModel
                    };
                }
            );
            console.log('filte data', filterData);
            if (filterChaneHandler && filterData && filterData.length > 0) {
                const filters = filterData.map((f: any) => {
                    return {
                        key: f.filterColId,
                        value: f.filter.filter,
                        operator: 'eq'
                    };
                });
                filterChaneHandler(filters);
            }
        },
        defaultColDef: {
            sortable: true,
            filter: false,
            editable: false
        },
        rowSelection: singleSelection ? 'single' : 'multiple'
    };

    const overlayLoadingTemplate =
        '<span class="ag-overlay-loading-center">Please wait while your records are loading</span>';

    return (
        <>
            <GridToolbar id={id} actions={getToolbarActions()} />
            <Row>
                <Col xs={12}>
                    <div
                        className={GRID_THEME}
                        style={noPadding ? GRID_STYLE_NOPADDING : GRID_STYLE}
                    >
                        <AgGridReact
                            key={id}
                            gridOptions={gridOptions}
                            columnDefs={getColDefs()}
                            rowData={rowData}
                            frameworkComponents={{
                                DropdownFilter,
                                IconRenderer,
                                NumberCellEditory
                            }}
                            onRowSelected={onRowSelected}
                            onCellClicked={onCellClicked}
                            onGridReady={onGridReady}
                            onSelectionChanged={onSelectionChanged}
                            overlayLoadingTemplate={overlayLoadingTemplate}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default GridComponent;
