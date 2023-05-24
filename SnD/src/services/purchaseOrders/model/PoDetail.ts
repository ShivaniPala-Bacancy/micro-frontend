import {InventoryMaster} from 'src/services/products/model/InventoryMaster';

interface PoDetail {
    poNo?: number;
    productType?: number;
    stepNumber?: number;
    productQuantity?: number;
    allocatedQuantity?: number;
    approvedQuantity?: number;
    deliveredQuantity?: number;
    remainingQuantity?: number;
    invoiceAmount?: number;
    discountAmount?: number;
    taxAmount?: number;
    unitPrice?: number;
    taxPlanId?: number;
    acceptedQuantity?: number;
    lineNumber?: number;
    warehouseId?: number;
    minQuota?: number;
    maxQuota?: number;
    consumedQuota?: number;
    unitType?: number;
    receivedQuantity?: number;
    wac?: number;
    erpInventoryId?: string;
    productDesc?: string;
    productCategory?: string;
    action?: string;
    remarks?: string;
    warehouseDesc?: string;
    originalItemCode?: string;
    unitTypeDesc?: string;
    commisionFlag?: string;
    areaManagerAction?: string;
    deferredPrice?: string;
    invSubTypeId?: string;
    depositPrice?: string;
    deliveryDate?: Date;
    inventoryMaster?: InventoryMaster;
}

export default PoDetail;
