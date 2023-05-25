import React, { useState } from "react";
import { ColDef } from "ag-grid-community";
import { InventoryDetail } from "../../services/inventory/model/inventoryDetail";
import GridColumnFactory from "../../containers/grid/GridColumnFactory";
import GridComponent from "../../containers/grid/GridComponent";
import StateManager, { InventorySearchState } from "./StateManager";
// import WhatFix from "../../pages/WhatFix.jsx";
import IFilter from "../../types/IFilter";

export interface InventorySearchGrid {
  labelPrefix: string;
  records: InventoryDetail[];
  onEdit: (record: any) => void;
  onDelete: (record: any) => void;
  onView: (record: any) => void;
  onAdd: () => void;
  fetchNextPage: () => void;
  onFilterSubmit?: () => void;
  onClearFilter?: () => void;
  moreData: boolean;
  onFilterChanged?: (filters: IFilter[]) => void;
  totalFilters?: number;
  invType: string;
}
/* eslint-disable  react/jsx-boolean-value */
const GridView: React.FC<InventorySearchGrid> = (props: any) => {
  // WhatFix(
  //   "https://whatfix.com/f3efa6b0-c20f-11ec-b991-000d3a1efee9/embed/embed.nocache.js"
  // );
  const {
    records,
    onEdit,
    onDelete,
    onAdd,
    moreData,
    fetchNextPage,
    onFilterSubmit,
    onClearFilter,
    onView,
    onFilterChanged,
    totalFilters,
    invType,
  } = props;
  const stateManager = StateManager.getInstance();
  const [state] = useState<InventorySearchState>(stateManager.get());

  state.productList?.map((val: any) => {
    records?.map((data: any) => {
      if (val.id == data.productOfferingId) {
        data.productName = val.name;
      }
    });
  });

  state.siteList?.map((val: any) => {
    records?.map((data: any) => {
      if (val.id == data.currentLocation) {
        data.locationName = val.name;
      }
    });
  });

  const gridColumnDefinitions: ColDef[] = [
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.productName`,
      "productName"
    ).build(),
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.skuId`,
      "skuId"
    ).build(),
    GridColumnFactory.default(`Current Location`, "locationName").build(),
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.addDate`,
      "addDate"
    ).build(),
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.inventorySerialNumber`,
      "inventorySerialNumber"
    ).build(),
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.status`,
      "status"
    ).build(),
  ];

  const gridColumnNonSerializeDefinitions: ColDef[] = [
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.productName`,
      "productName"
    ).build(),
    GridColumnFactory.default(
      `${stateManager.messagePrefix}.grid.skuId`,
      "skuId"
    ).build(),
    GridColumnFactory.default(`Current Location`, "locationName").build(),
    GridColumnFactory.default(`Current Stock`, "currentStock").build(),
    GridColumnFactory.default(`Input Stock`, "inputStock").build(),
    GridColumnFactory.default(`Output Stock`, "outputStock").build(),
  ];

  return (
    <div className="col-lg-12">
      <GridComponent
        fetchNextPage={fetchNextPage}
        id="lookupGrid"
        moreDataExists={moreData}
        grid={{
          columnDefs:
            invType == "Serialized"
              ? gridColumnDefinitions
              : gridColumnNonSerializeDefinitions,
          refDataFunctions: {},
          pagination: true,
        }}
        rowData={records}
        addEnabled={false}
        addHandler={onAdd}
        editEnabled={false}
        editHandler={onEdit}
        deleteEnabled={false}
        deleteHandler={onDelete}
        viewHandler={onView}
        viewEnabled={true}
        filterSubmitHandler={onFilterSubmit}
        clearFilterHandler={onClearFilter}
        filterChaneHandler={onFilterChanged}
        totalFilters={totalFilters}
      />
    </div>
  );
};

export default GridView;
