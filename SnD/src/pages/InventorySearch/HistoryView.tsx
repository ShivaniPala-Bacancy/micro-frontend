import React, { useState } from "react";
import Box from "../../containers/Box";
import { Col, Modal, Row } from "react-bootstrap";
import { Timeline, TimelineEvent } from "react-event-timeline";
import ProductOrderService from "../../services/productOrder/api/ProductOrderService";
import GridColumnFactory from "../../containers/grid/GridColumnFactory";
import GridComponent from "../../containers/grid/GridComponent";
import { ColDef } from "ag-grid-community";
export interface HistoryProps {
  historyDetails?: any;
  labelPrefix?: string;
  geographicLocations: any;
  onHttpFailure: (data: any) => void;
}

const Icons = {
  Sold: "fa-check",
  "With Distributor": "fa-store",
  "Transffered to Retailer": "fa-exchange-alt",
  Damaged: "fa-trash",
  Blocked: "fa-ban",
};

const HistoryView: React.FC<HistoryProps> = (props) => {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState<any>();
  const { historyDetails, labelPrefix, geographicLocations, onHttpFailure } =
    props;
  const productOrderService = new ProductOrderService();

  const gridColumnDefinitions: ColDef[] = [
    GridColumnFactory.default(`Product`, "product.name")
      .hideFloatingFilter()
      .build(),
    GridColumnFactory.default(`Quantity`, "quantity")
      .hideFloatingFilter()
      .build(),
    GridColumnFactory.amount(`UnitPrice`, "price.dutyFreeAmount.value")
      .hideFloatingFilter()
      .build(),
    GridColumnFactory.amount(`Discount`, "price.percentage")
      .hideFloatingFilter()
      .build(),
    GridColumnFactory.amount(`Total`, "price.taxIncludedAmount.value")
      .hideFloatingFilter()
      .build(),
  ];

  const OrderHistoryModal = () => {
    return (
      <Modal show={show} onHide={setShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <Box
            id="inventorySearchBoxDetails"
            title="Inventory Search Details"
            border
            withoutHeader
            noPadding
            loaded
          >
            <Row>
              <Col sm={6}>
                <label>OrderID:</label>
                <span>{order?.orderId}</span>
              </Col>
              <Col>
                <label>OrderDate:</label>
                <span>{order?.orderDate}</span>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <label>Type:</label>
                <span>{order?.["@type"]}</span>
              </Col>
              <Col>
                <label>Status:</label>
                <span>{order?.state}</span>
              </Col>
            </Row>
            <GridComponent
              fetchNextPage={null}
              id="lookupGrid"
              moreDataExists={false}
              grid={{
                columnDefs: gridColumnDefinitions,
                refDataFunctions: {},
                pagination: true,
              }}
              rowData={order?.productOrderItem || []}
              noPadding
            />
          </Box>
        </Modal.Body>
      </Modal>
    );
  };

  const fetchOrder = (orderId: string) => {
    productOrderService.fetchProductOrderBasedOnOrderId(orderId).subscribe({
      next: (res: any) => {
        let result = res[0];
        if (res && res[0]) {
          const productOrderItem = result?.productOrderItem?.map(
            (item: any) => {
              return {
                ...item,
                price: item?.itemPrice?.[0]?.price,
              };
            }
          );
          setOrder({
            ...result,
            productOrderItem: productOrderItem,
          });
        }
      },
      error: onHttpFailure,
    });
  };

  return (
    <>
      {OrderHistoryModal()}
      {historyDetails?.map((val: any) => {
        return (
          val.actionDate && (
            <>
              <Timeline
                lineStyle={{
                  background: "#999",
                  width: 3,
                }}
                style={{ width: "100%" }}
              >
                <TimelineEvent
                  title=""
                  createdAt=""
                  icon={
                    <i
                      className={
                        Icons[val?.status]
                          ? `fa ${Icons[val?.status]} fa-lg`
                          : "fa fa-tasks fa-lg"
                      }
                    ></i>
                  }
                  style={{
                    boxShadow: "none",
                    width: "100%",
                    margin: "-20px 0px",
                  }}
                  bubbleStyle={{
                    backgroundColor: "#007bff",
                    border: "none",
                    color: "white",
                    marginLeft: "3px",
                    top: "9px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        {val?.remarks} By <b>{val?.actionBy}</b> At{" "}
                        {/* {val.currentLocation} */}
                        {geographicLocations &&
                          geographicLocations?.get(val?.currentLocation)}
                      </span>
                      <span>
                        <b>
                          <i className="fa fa-clock mr-1"></i>{" "}
                        </b>
                        {val?.actionDate}
                      </span>
                    </div>
                    {val?.customerName && (
                      <div>
                        {" "}
                        <span>
                          {<b>Customer:</b>}
                          <span>{val?.customerName}</span>
                        </span>
                      </div>
                    )}
                    {val?.invoiceNo && (
                      <div>
                        {" "}
                        <span>
                          {<b>InvoiceNO:</b>}
                          <span>{val?.invoiceNo}</span>
                        </span>
                      </div>
                    )}
                    {val?.orderId && (
                      <div>
                        Order Id{" : "}
                        <span>
                          <b
                            className={`${
                              val.customerId ? "text-primary clickable" : ""
                            }`}
                            onClick={() => {
                              if (val?.customerId) {
                                setShow(true);
                                fetchOrder(val?.orderId);
                              }
                            }}
                          >
                            {val?.orderId}
                          </b>
                        </span>
                      </div>
                    )}
                  </div>
                </TimelineEvent>
              </Timeline>
            </>
          )
        );
      })}
    </>
  );
};

export default HistoryView;
