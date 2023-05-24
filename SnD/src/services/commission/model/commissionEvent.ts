/* eslint-disable prettier/prettier */
export interface CommissionEvent {
    id?: number;
    description?: string;
    type?: string;
    status?: string;
    fromDate?: Date;
    toDate?: Date;
    ooredooWallet?: string;
    Start_Date?: Date;
    End_Date?: Date;
    product?: string;
    erpInventoryId?: string;
}
