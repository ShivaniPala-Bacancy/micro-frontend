import PoDetail from './PoDetail';

interface PurchaseOrder {
    poNo?: number;
    parentPurchaseOrder?: number;
    statusId?: number;
    statusName?: string;
    totalInvoiceAmount?: number;
    totalDiscountAmount?: number;
    totalTaxAmount?: number;
    raisedBy?: string;
    approvedBy?: string;
    grnId?: number;
    allocatedBy?: string;
    sourceWarehouseId?: number;
    raisedByUser?: string;
    approvedInvoiceAmount?: number;
    approvedTaxAmount?: number;
    erpSoNo?: string;
    remarks?: string;
    locationId?: string;
    deliveryPerson?: string;
    idType?: string;
    deliveryPersonId?: string;
    paymentMode?: string;
    transactionRef?: string;
    deliveryMode?: number;
    shopUserId?: string;
    vat?: number;
    excise?: number;
    invoiceNo?: string;
    receiptNo?: string;
    internalOrder?: string;
    deliveryAddress?: number;
    erpApiHeaderId?: string;
    orderTypeId?: number;
    giDoc?: string;
    poSubStatus?: number;
    discDefId?: number;
    salesChannelId?: number;
    offerDiscount?: number;
    statusDescription?: string;
    subStatusDescription?: string;
    sourceWarehouseDesc?: string;
    userId?: string;
    raisedByUserName?: string;
    refPoNo?: string;
    dept?: string;
    airwayBill?: string;
    deliveryNote?: string;
    comments?: string;
    raisedByDealerId?: string;
    poOrderTypeCode?: string;
    poOrderTypeDesc?: string;
    allocatedDate?: Date;
    acceptDate?: Date;
    dueDate?: Date;
    approvedDate?: Date;
    giDate?: Date;
    poDate?: Date;
    poDetails?: PoDetail[];
}

interface PurchaseOrderListWrapper {
    inventoryMasterList: PurchaseOrder[];
}

interface PurchaseOrderLink {
    href: string;
}
interface PurchaseOrderLinks {
    next?: PurchaseOrderLink;
    prev?: PurchaseOrderLink;
}
interface PurchaseOrderListResponse {
    _embedded: PurchaseOrderListWrapper;
    _links: PurchaseOrderLinks;
}

export type {
    PurchaseOrderListResponse,
    PurchaseOrderLink,
    PurchaseOrderLinks,
    PurchaseOrderListWrapper
};
export default PurchaseOrder;
