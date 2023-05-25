import * as React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ISuggestions } from "../../types/ISuggestions";
import LookupDetail from "src/services/master/model/LookupDetail";
import FormFieldFactory from "../../containers/form/FormFieldFactory";
import Box from "../../containers/Box";
import StateManager, { InventorySearchState } from "./StateManager";
import FORM from "../../containers/form/NewForm";
import GridView from "./GridView";
import MasterConfigService from "../../services/master/api/MasterConfigService";
import client from "../../common/AjaxClient";
import GetSearchDetails from "../../services/inventory/api/inventorySearchService";
import { HttpMethods } from "../../types/CommonTypes";
import HttpResponse from "src/services/HttpResponse";
import { ProductOfferingService } from "../../services/productCatalog/api/ProductOfferingService";
import { toast } from "react-toastify";
import GetInventoryTransfer from "../../services/inventory/api/inventoryTransfer";
import IFilter from "../../types/IFilter";
import HistoryView from "./HistoryView";
import GeographicSiteService from "../../services/sites/api/GeographicSiteService";

const InventorySearchController = () => {
  const masterService = new MasterConfigService();
  const searchService = new GetSearchDetails();
  const inventoryTransferService = new GetInventoryTransfer();
  const stateManager = StateManager.getInstance();
  const [state, setState] = useState<InventorySearchState>(stateManager.get());
  const [selectedDetails, setSelectedDetails] = useState<any>("");
  const [historyDetails, setHistoryDetails] = useState<any>([]);
  const [selectedForm, setSelectedForm] = useState<any>("");
  const [prodSpecCharValueUse, setProdSpecCharValueUse] = useState<any>([]);
  const [skuId, setSkuId] = useState<any>([]);
  const userParentId = localStorage.getItem("parentId");
  const roleFromLocalStorage = localStorage.getItem("currentRole");
  const [invType, setInvType] = useState("");
  const [geographicLocations, setGeographicLocations] =
    useState<Map<string, string>>();
  useEffect(() => {
    setState(stateManager.hideInventoryModal(false).get());
    masterService.getLookupDetail("searchStatus").subscribe(onInventoryStatus);
    masterService.getLookupDetail("searchType").subscribe(onInventoryType);
    try {
      masterService.getServiceUrl("PRODUCT_OFFERING").subscribe({
        next: (res: any) => {
          if (res != null) {
            client(
              `${res}/productOffering?type*(?i)Non&type*(?i)Ser`,
              HttpMethods.GET
            )
              .then((res) => {
                setState(stateManager.getAllProduct(res).get());
              })
              .catch(() => {
                console.log("Invalid Response");
              });
          }
        },
        error: onHttpFailure,
      });
      masterService.getServiceUrl("GEOGRAPHIC_SITE").subscribe({
        next: (res: any) => {
          if (res != null) {
            client(`${res}/geographicSite`, HttpMethods.GET)
              .then((res) => {
                setState(stateManager.getAllSite(res).get());
              })
              .catch(() => {
                console.log("Invalid Response");
              });
          }
        },
        error: onHttpFailure,
      });
    } catch (e) {
      console.log("error while fetching realm url", e);
    }
  }, []);

  const onInventoryStatus = (status: any) => {
    setState(stateManager.onInventoryStatusLoad(status).get());
  };

  const onInventoryType = (type: any) => {
    setState(stateManager.onInventoryTypeLoad(type).get());
  };

  const onSearchDetails = (search: any) => {
    let arr: any = [];
    arr = state.inventorySearchStatus;
    search.forEach((searchArray: any) => {
      arr.forEach((arrData: any) => {
        if (searchArray.status == arrData.value) {
          searchArray.status = arrData.text;
        }
      });
    });
    setState(stateManager.onSearchDetailFetch(search).get());
  };

  const productSkuMapping = (data: any, sku: any) => {
    let count = 0;
    let skuMappingId;
    let totalLength = 0;
    if (!prodSpecCharValueUse || prodSpecCharValueUse?.length == 0) {
      let id = sku?.mappings && sku.mappings[0] && sku.mappings[0].skuId;
      skuMappingId = id;
    } else {
      sku.mappings.forEach((mappings: any) => {
        totalLength = mappings.mappingSpecifications.length;
        count = 0;
        mappings.mappingSpecifications.forEach((mapSpec: any) => {
          skuId?.forEach((id: any) => {
            if (id.value == mapSpec.specificationValue) {
              count = count + 1;
            }
          });
        });
        if (count == totalLength) {
          skuMappingId = mappings.skuId;
        }
      });
    }
    if (!data.skuId) {
      data.skuId = skuMappingId;
    }
    for (const key in data) {
      if (data[key] === "" || data[key] === undefined) {
        delete data[key];
      }
      if (
        roleFromLocalStorage != "ROLE_ADMINISTRATOR" &&
        (data["currentLocation"] === "" ||
          data["currentLocation"] === undefined)
      ) {
        if (state?.siteOptions?.length > 1) {
          let newData: any = "";
          let sites = state.siteOptions || [];
          sites.forEach((val: any) => {
            if (newData) {
              newData = newData + "," + val.value;
            } else {
              newData = newData + val.value;
            }
          });
          data["currentLocation"] = newData;
        } else {
          data["currentLocation"] = state.siteOptions.map((val: any) => {
            return val.value;
          });
        }
      }
    }
    setState(stateManager.hideInventoryModal(true).get());

    let filter: any = [];
    let inventorySerialNo: any = [];
    let index = 0,
      i = 0;
    if (invType == "Serialized") {
      if (Object.keys(data).length > 0) {
        if (data.addDate) {
          filter = [
            {
              key: "addDate",
              value: data.addDate,
              operator: "*=",
            },
          ];
          searchService
            .getSearchDetails(
              undefined,
              0,
              state.pageSize,
              "response",
              undefined,
              filter,
              ``
            )
            .subscribe({
              next: onSearchDetails,
              error: onHttpFailure,
            });
        }
        if (data.inventorySerialNumberFrom && data.inventorySerialNumberTo) {
          i = data.inventorySerialNumberFrom;
          while (i <= data.inventorySerialNumberTo) {
            if (index == 0) inventorySerialNo += i;
            else inventorySerialNo += ";" + i;
            index = index + 1;
            i++;
          }
          filter = [
            {
              key: "inventorySerialNumber",
              value: inventorySerialNo,
              operator: "=",
            },
          ];
          const updatedData: any = {};
          Object.keys(data).forEach((current: any) => {
            if (
              current != "inventorySerialNumberTo" ||
              current != "inventorySerialNumberFrom"
            ) {
              updatedData[current] = data[current];
            }
          });
          const currFilter = `${new URLSearchParams(updatedData).toString()}`;
          searchService
            .getSearchDetails(
              undefined,
              0,
              state.pageSize,
              "response",
              undefined,
              filter,
              currFilter
            )
            .subscribe({
              next: onSearchDetails,
              error: onHttpFailure,
            });
        } else if (
          data.inventorySerialNumberFrom ||
          data.inventorySerialNumberTo
        ) {
          filter = [
            {
              key: "inventorySerialNumber",
              value: data.inventorySerialNumberFrom
                ? data.inventorySerialNumberFrom
                : data.inventorySerialNumberTo,
              operator: "=",
            },
          ];
          const updatedData: any = {};
          Object.keys(data).forEach((current: any) => {
            if (
              current != "inventorySerialNumberTo" ||
              current != "inventorySerialNumberFrom"
            ) {
              updatedData[current] = data[current];
            }
          });
          const currFilter = `${new URLSearchParams(updatedData).toString()}`;
          searchService
            .getSearchDetails(
              undefined,
              0,
              state.pageSize,
              "response",
              undefined,
              filter,
              currFilter
            )
            .subscribe({
              next: onSearchDetails,
              error: onHttpFailure,
            });
        } else {
          searchService
            .getSearchDetails(
              undefined,
              0,
              state.pageSize,
              "response",
              undefined,
              state.recordFilters,
              `${new URLSearchParams(data).toString()}`
            )
            .subscribe({
              next: onSearchDetails,
              error: onHttpFailure,
            });
        }
      } else {
        searchService
          .getSearchDetails(
            undefined,
            0,
            state.pageSize,
            "response",
            undefined,
            state.recordFilters,
            ""
          )
          .subscribe({
            next: onSearchDetails,
            error: onHttpFailure,
          });
      }
    }
    if (invType == "Non-Serialized") {
      if (Object.keys(data).length > 0) {
        searchService
          .getNonSerializeSearchDetails(
            undefined,
            0,
            state.pageSize,
            "response",
            undefined,
            state.recordFilters,
            `${new URLSearchParams(data).toString()}`
          )
          .subscribe({
            next: onSearchDetails,
            error: onHttpFailure,
          });
      } else {
        searchService
          .getNonSerializeSearchDetails(
            undefined,
            0,
            state.pageSize,
            "response",
            undefined,
            state.recordFilters,
            ""
          )
          .subscribe({
            next: onSearchDetails,
            error: onHttpFailure,
          });
      }
    }
  };

  const onSubmitSearch = (data: any) => {
    if (
      data.inventorySerialNumberTo &&
      data.inventorySerialNumberFrom > data.inventorySerialNumberTo
    ) {
      toast.error("Please select Valid serial Number");
    } else {
      const productOfferingService = new ProductOfferingService();
      if (data.productOfferingId) {
        productOfferingService
          .retrieveSkuMapping(data.productOfferingId || "")
          .subscribe({
            next: (res: any) => productSkuMapping(data, res),
            error: onHttpFailure,
          });
      } else {
        productSkuMapping(data, {});
      }
    }
  };

  const createSuggestions = (lookupEntries: LookupDetail[]) => {
    return lookupEntries.map((entry) => {
      const suggestion: ISuggestions = {
        text: entry.text,
        value: entry.value,
      };
      return suggestion;
    });
  };
  const convertToLookUpDetails1 = (data: any[], param: any, param1: any) => {
    return data.map((d) => {
      if (d[param] != undefined) {
        const ld: LookupDetail = {
          text: d[param],
          value: d[param1],
          code: undefined,
        };
        return ld;
      }
      const ld: LookupDetail = {
        text: "",
        value: "",
        code: undefined,
      };
      return ld;
    });
  };

  const optionsProductId = (
    _fieldName: string,
    term?: string,
    callback?: (data: Array<ISuggestions>) => void
  ) => {
    let sugg: ISuggestions[] = [];
    try {
      masterService.getServiceUrl("PRODUCT_OFFERING").subscribe({
        next: (res: any) => {
          if (res != null) {
            client(
              `${res}/productOffering?name*=(?i)${term}&type=${invType}`,
              HttpMethods.GET
            )
              .then((res) => {
                sugg = createSuggestions(
                  convertToLookUpDetails1(res, "name", "id")
                );
                callback && callback(sugg);
                return sugg;
              })
              .catch(() => {
                console.log("Invalid Response");
              });
          }
        },
        error: onHttpFailure,
      });
    } catch (e) {
      console.log("error while fetching realm url", e);
    }

    return sugg;
  };

  const locationOptions = (
    _fieldName: string,
    term?: string,
    callback?: (data: Array<ISuggestions>) => void
  ) => {
    let sugg: ISuggestions[] = [];
    try {
      masterService.getServiceUrl("GEOGRAPHIC_SITE").subscribe({
        next: (res: any) => {
          if (res != null) {
            client(`${res}/geographicSite?name*=${term}`, HttpMethods.GET)
              .then((res) => {
                sugg = createSuggestions(
                  convertToLookUpDetails1(res, "name", "id")
                );
                callback && callback(sugg);
                return sugg;
              })
              .catch(() => {
                console.log("Invalid Response");
              });
          }
        },
        error: onHttpFailure,
      });
    } catch (e) {
      console.log("error while fetching realm url", e);
    }
    return sugg;
  };

  let siteOption: any = [];
  useEffect(() => {
    if (userParentId) {
      inventoryTransferService.getGeographicSite(userParentId || "").subscribe({
        next: (resp) => {
          siteOption = resp?.map((p: any) => {
            return {
              value: p?.id,
              text: p?.name,
              parent: p?.["@type"],
            };
          });
          setState(stateManager.onSiteOptionFetch(siteOption).get());
        },
        error: onHttpFailure,
      });
    }
  }, []);

  const setProductOffering = (res: any) => {
    const prodSpecCharValue = res.prodSpecCharValueUse;
    setProdSpecCharValueUse(prodSpecCharValue);
  };

  const onProductOfferingChange = (e: any) => {
    const productOfferingService = new ProductOfferingService();
    if (e != undefined) {
      productOfferingService.retrieveProductOffering(e || "").subscribe({
        next: setProductOffering,
        error: onHttpFailure,
      });
      setState(stateManager.onProductChange(e).get());
    }
  };

  const dropdownsGetter = (
    fieldName: string,
    elementName?: any
  ): ISuggestions[] => {
    let dropDownValue = prodSpecCharValueUse;
    let finalProSpecCharValue: any = [];
    dropDownValue?.forEach((drop: any) => {
      if (drop?.name == elementName) {
        drop?.productSpecCharacteristicValue?.forEach((charValue: any) => {
          let value = {
            text: charValue?.value,
            value: charValue?.value,
            id: drop.description,
          };
          finalProSpecCharValue.push(value);
        });
      }
    });
    return finalProSpecCharValue;
  };

  const onSelectType = (val: any) => {
    setInvType(val);
    setSkuId([]);
    setState(stateManager.onProductChange("").get());
    setProdSpecCharValueUse([]);
  };

  const specificationChanged = (e: any) => {
    const sku = skuId.filter((spec: any) => spec.name != e.target.id);
    sku.push({
      name: e.target.id,
      value: e.target.value,
    });
    setSkuId(sku);
  };

  const getFields = () => {
    let fields = [
      FormFieldFactory.select("type", `Type`, state.inventoryType)
        .setOnChange((e) => onSelectType(e.target.value))
        .setRequired(true)
        .setSize(6, 2, 4),
    ];
    if (invType == "Serialized") {
      fields.push(
        FormFieldFactory.asyncAutoComplete(
          "productOfferingId",
          `${stateManager.messagePrefix}.form.productOfferingId`,
          optionsProductId
        )
          .setSize(6, 2, 4)
          .setOnChange(onProductOfferingChange)
      );
      if (prodSpecCharValueUse) {
        const json = prodSpecCharValueUse;
        if (json && json.length > 0) {
          json.forEach((element: any) => {
            fields.push(
              FormFieldFactory.select(
                element.name,
                element.name,
                dropdownsGetter(element.name, element.name)
              )
                .setSize(6, 2, 4)
                .setOnChange(specificationChanged)
            );
          });
        }
      }
      if (
        roleFromLocalStorage == "ROLE_ADMINISTRATOR" ||
        roleFromLocalStorage == "ROLE_MANAGER"
      ) {
        fields.push(
          FormFieldFactory.asyncAutoComplete(
            "currentLocation",
            `${stateManager.messagePrefix}.form.currentLocation`,
            locationOptions
          ).setSize(6, 2, 4)
        );
      } else {
        fields.push(
          FormFieldFactory.select(
            "currentLocation",
            `${stateManager.messagePrefix}.form.currentLocation`,
            state.siteOptions
          ).setSize(6, 2, 4)
        );
      }
      fields.push(
        FormFieldFactory.number(
          "inventorySerialNumberFrom",
          `${stateManager.messagePrefix}.form.inventorySerialNumberFrom`
        ).setSize(6, 2, 4),
        FormFieldFactory.number(
          "inventorySerialNumberTo",
          `${stateManager.messagePrefix}.form.inventorySerialNumberTo`
        ).setSize(6, 2, 4),

        FormFieldFactory.select(
          "status",
          `${stateManager.messagePrefix}.form.status`,
          state.inventorySearchStatus
        ).setSize(6, 2, 4),
        FormFieldFactory.text(
          "poNumber",
          `${stateManager.messagePrefix}.form.poNo`
        ).setSize(6, 2, 4),
        FormFieldFactory.date(
          "addDate",
          `${stateManager.messagePrefix}.form.poNoDate`
        ).setSize(6, 2, 4),
        FormFieldFactory.text(
          "skuId",
          `${stateManager.messagePrefix}.form.skuId`
        ).setSize(6, 2, 4)
      );
    }
    if (invType == "Non-Serialized") {
      fields.push(
        FormFieldFactory.asyncAutoComplete(
          "productOfferingId",
          `${stateManager.messagePrefix}.form.productOfferingId`,
          optionsProductId
        )
          .setSize(6, 2, 4)
          .setOnChange(onProductOfferingChange)
      );
      if (prodSpecCharValueUse) {
        const json = prodSpecCharValueUse;
        if (json && json.length > 0) {
          json.forEach((element: any) => {
            fields.push(
              FormFieldFactory.select(
                element.name,
                element.name,
                dropdownsGetter(element.name, element.name)
              )
                .setSize(6, 2, 4)
                .setOnChange(specificationChanged)
            );
          });
        }
      }
      if (
        roleFromLocalStorage == "ROLE_ADMINISTRATOR" ||
        roleFromLocalStorage == "ROLE_MANAGER"
      ) {
        fields.push(
          FormFieldFactory.asyncAutoComplete(
            "currentLocation",
            `${stateManager.messagePrefix}.form.currentLocation`,
            locationOptions
          ).setSize(6, 2, 4)
        );
      } else {
        fields.push(
          FormFieldFactory.select(
            "currentLocation",
            `${stateManager.messagePrefix}.form.currentLocation`,
            state.siteOptions
          ).setSize(6, 2, 4)
        );
      }
      fields.push(
        FormFieldFactory.text(
          "skuId",
          `${stateManager.messagePrefix}.form.skuId`
        ).setSize(6, 2, 4)
      );
    }

    fields = [...fields];
    return fields;
  };
  const onFilterSubmit = () => {
    fetchNextPage();
  };

  const onClearFilter = () => {
    setState(stateManager.setFilters([]).get());
    setState(stateManager.refresh().get());
  };

  const onFilterChanged = (filters: IFilter[]) => {
    const tempState = stateManager.setFilters(filters).get();
    setState(tempState);
  };
  const fetchNextPage = () => {
    for (const key in selectedForm) {
      if (selectedForm[key] === "" || selectedForm[key] === undefined) {
        delete selectedForm[key];
      }
    }
    setState(stateManager.hideInventoryModal(true).get());
    if (Object.keys(selectedForm).length > 0) {
      searchService
        .getSearchDetails(
          undefined,
          state.currentOffset,
          state.pageSize,
          "response",
          undefined,
          state.recordFilters,
          `${new URLSearchParams(selectedForm).toString()}`
        )
        .subscribe({
          next: onSearchDetails,
          error: onHttpFailure,
        });
    } else {
      searchService
        .getSearchDetails(
          undefined,
          state.currentOffset,
          state.pageSize,
          "response",
          undefined,
          state.recordFilters,
          ""
        )
        .subscribe({
          next: onSearchDetails,
          error: onHttpFailure,
        });
    }
  };

  const loadGeographicSite = async (details: any) => {
    const geographicSite = new GeographicSiteService();
    const site = await geographicSite
      .retrieveGeographicSite(details.currentLocation)
      .toPromise();
    return site.name;
  };

  const OnViewHistory = (val: any) => {
    searchService.getInventoryHistory(val?.inventorySkuOfferId).subscribe({
      next: (res: any) => {
        setHistoryDetails(res);
        let locations: any = new Map<string, string>();
        res?.forEach(async (details: any) => {
          const response = await loadGeographicSite(details);
          locations.set(details.currentLocation, response);
          setTimeout(() => {
            setGeographicLocations(locations);
          }, 500);
        });
        setSelectedDetails(val);
        setState(stateManager.hideTimeline(true).get());
      },
      error: onHttpFailure,
    });
  };

  const onHttpFailure = (response: HttpResponse) => {
    setState(stateManager.onFailure(response).get());
  };

  const renderGridAndDetails = () => {
    if (state.showInventory && !state.showTimeline) {
      return (
        <GridView
          fetchNextPage={fetchNextPage}
          moreData={state.nextPageAvailable || false}
          labelPrefix={stateManager.messagePrefix}
          records={state.searchData}
          onEdit={() => {}}
          onDelete={() => {}}
          onFilterSubmit={onFilterSubmit}
          onClearFilter={onClearFilter}
          onAdd={() => {}}
          onView={(valid: any) => {
            OnViewHistory(valid);
          }}
          onFilterChanged={onFilterChanged}
          totalFilters={state.recordFilters?.length}
          invType={invType}
        />
      );
    } else {
      return (
        <>
          <span>
            <button
              type="button"
              style={{
                background: "transperent",
                border: "none",
                marginRight: "5px",
                borderRadius: "100%",
                marginBottom: "10px",
              }}
              onClick={() => {
                setState(stateManager.hideTimeline(false).get());
              }}
            >
              <i className="fas fa-arrow-left" />
            </button>
            <b>Back to Inventory</b>
          </span>
          <div className="d-flex justify-content-between mt-2 mb-3">
            <h6>
              <b>Serial :</b>{" "}
              {selectedDetails && selectedDetails?.inventorySerialNumber}
            </h6>
            <h6>
              <b>Product :</b> {selectedDetails && selectedDetails?.productName}
            </h6>
            <h6>
              <b>Location :</b>{" "}
              {selectedDetails && selectedDetails?.locationName}
            </h6>
          </div>
          <HistoryView
            historyDetails={historyDetails}
            geographicLocations={geographicLocations}
            onHttpFailure={onHttpFailure}
          />
        </>
      );
    }
  };

  return (
    <Box
      id="inventorySearchBox"
      title="Inventory Search"
      border
      noPadding
      loaded
      closable={state.showInventory && !state.showTimeline}
      onClose={() => {
        setState(stateManager.hideInventoryModal(false).get());
        setSkuId([]);
        setProdSpecCharValueUse([]);
        setState(stateManager.onClearSearchDetail().get());
        setInvType("");
      }}
    >
      <div className="container-fluid">
        {!state.showInventory && !state.showTimeline ? (
          <Row>
            <Col sm={11}>
              <FORM
                id="searchForm"
                fields={getFields()}
                type="semi-stacked"
                numberOfColumns={2}
                waiting={false}
                submitButtonText="Search"
                onInvalid={(err) => {
                  console.log(err);
                }}
                onValid={(valid: any) => {
                  onSubmitSearch(valid);
                  setSelectedForm(valid);
                }}
              />
            </Col>
          </Row>
        ) : (
          renderGridAndDetails()
        )}
      </div>
    </Box>
  );
};

export default InventorySearchController;
