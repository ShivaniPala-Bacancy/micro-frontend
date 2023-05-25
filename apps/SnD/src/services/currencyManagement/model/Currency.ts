/**
 * Currency Entity.
 */
export interface Currency {
    /**
     * Unique identifier of a currency entity.
     */
    id?: string;

    currencyCode?: string;

    exchangeRate?: number;

    dateFrom?: Date;

    dateTo?: Date;

    dateAdded?: string;

    addedBy?: string

    dateUpdated?: string;

    updatedBy?: string;

    currencyName?: string;

}
