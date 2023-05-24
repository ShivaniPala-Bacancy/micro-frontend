interface InventoryMaster {
    autoRenewalFlag?: string;
    availableDate?: string;
    brandName?: string;
    category?: string;
    colorOptions?: string;
    expiryDate?: string;
    inventorySubType?: string;
    inventoryTypeDescription?: string;
    inventoryTypeId?: number;
    materialName?: string;
    pricePerUnit?: number;
    serialised: string;
    thumbnailImage: string;
    umoValue?: string;
    quantity?: number;
}

interface InventoryListWrapper {
    inventoryMasterList: InventoryMaster[];
}

interface InventoryLink {
    href: string;
}
interface InventoryLinks {
    next?: InventoryLink;
    prev?: InventoryLink;
}
interface InventoryListResponse {
    _embedded: InventoryListWrapper;
    _links: InventoryLinks;
}
export type {InventoryMaster, InventoryListWrapper, InventoryLink};
export default InventoryListResponse;
