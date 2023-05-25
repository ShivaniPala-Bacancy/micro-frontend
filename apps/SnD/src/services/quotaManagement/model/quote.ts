import {TimePeriod} from './timePeriod';

export interface Quote {
    /**
     * Unique identifier of the organization
     */
    id?: string;
    /**
     * Hyperlink to access the organization
     */
    href?: string;
    validFor: TimePeriod;
    inventoryType: string;
    dealerName?: string;
    inventory?: string;
    paymentMethod: string;
    status: string;
    dealer?: string;
    minQuota: number;
    maxQuota: number;
    dealerCode: string;
    skuId?: string;
}
