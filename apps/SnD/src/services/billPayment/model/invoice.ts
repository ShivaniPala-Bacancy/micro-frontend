/**
 * CRM System API
 * CRM System API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: test@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Invoice details
 */
export interface InvoiceDetails {
    /**
     * request success or error specific code
     */
    code?: string;
    /**
     * Provides more information for when there was an error
     */
    data?: Array<Invoice>;
}

export interface Invoice {
    pendingInvoiceAmount?: string;
    billDate?: string;
    billId?: string;
    billCycleId?: string;
}