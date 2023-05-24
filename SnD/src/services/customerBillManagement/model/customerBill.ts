/**
 * API CustomerBill
 * ## TMF API Reference: TMF 678 - Customer bill Management  ### Release: 19.5 - December 2019  The Customer Bill Management API allows to find and retrieve one or several customer bills (also called invoices) produced for a customer. A customer bill is an electronic or paper document produced at the end of the billing process. The customer bill gathers and displays different items (applied customer billing rates generated during the rating and billing processes) to be charged to a customer. It represents a total amount due for all the products during the billing period and all significant information like dates, bill reference... This API provides also operations to find and retrieve the details of applied customer billing rates presented on a customer bill.  Finally, this API allows to request in real-time a customer bill creation and to manage this request.  ### Resources  - customerBill - appliedCustomerBillingRate - customerBillOnDemand - billingCycle  ### Operations Customer Bill Management API performs the following operations : - Retrieve a customer bill or a collection of customer bills depending on filter criteria. - Partial update of  a customer bill (for administration purposes). -  Retrieve an applied customer billing rate or a collection of applied customer billing rates depending on filter criteria. -  Create a customer bill on demand request, retrieve one or a collection of  customer bill on demand request(s) depending on filter criteria.  - Manage notification of events on customer bill and customer bill on demand.  Copyright © TM Forum 2018. All Rights Reserved.
 *
 * OpenAPI spec version: 4.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AppliedPayment } from './appliedPayment';
import { AttachmentRefOrValue } from './attachmentRefOrValue';
import { BillingAccountRef } from './billingAccountRef';
import { FinancialAccountRef } from './financialAccountRef';
import { Money } from './money';
import { PaymentMethodRef } from './paymentMethodRef';
import { RelatedPartyRef } from './relatedPartyRef';
import { StateValue } from './stateValue';
import { TaxItem } from './taxItem';
import { TimePeriod } from './timePeriod';


/**
 * The billing account receives all charges (recurring, one time and usage) of the offers and products assigned to it during order process. Periodically according to billing cycle specifications attached to the billing account or as a result of an event, a customer bill (aka invoice) is produced. This customer bill concerns different related parties which play a role on it : for example, a customer bill is produced by an operator, is sent to a bill receiver and has to be paid by a payer. A payment method could be assigned to the customer bill to build the call of payment. Lettering process enables to assign automatically or manually incoming amount from payments to customer bills (payment items). A tax item is created for each tax rate used in the customer bill. The financial account represents a financial entity which records all customer’s accounting events : payment amount are recorded as credit and invoices amount are recorded as debit. It gives the customer overall balance (account balance). The customer bill is linked to one or more documents that can be downloaded via a provided url.
 */
export interface CustomerBill { 
    /**
     * Unique identifier of he bill
     */
    id?: string;
    /**
     * Bill unique reference
     */
    href?: string;
    /**
     * Bill date
     */
    billDate?: Date;
    /**
     * Bill reference known by the customer or the party and displayed on the bill. Could be different from the id
     */
    billNo?: string;
    /**
     * Category of the bill produced : normal, duplicate, interim, last, trial customer or credit note for example
     */
    category?: string;
    /**
     * Date of bill last update
     */
    lastUpdate?: Date;
    /**
     * ). Approximate date of  the next bill production given for information (only used for onCycle bill)
     */
    nextBillDate?: Date;
    /**
     * Date at which the amount due should have been paid
     */
    paymentDueDate?: Date;
    /**
     * onCycle (a bill can be created as a result of a cycle run) or offCycle (a bill can be created as a result of other events such as customer request or account close)
     */
    runType?: string;
    amountDue?: Money;
    appliedPayment?: Array<AppliedPayment>;
    billDocument?: Array<AttachmentRefOrValue>;
    billingAccount?: BillingAccountRef;
    billingPeriod?: TimePeriod;
    financialAccount?: FinancialAccountRef;
    paymentMethod?: PaymentMethodRef;
    relatedParty?: Array<RelatedPartyRef>;
    remainingAmount?: Money;
    state?: StateValue;
    taxExcludedAmount?: Money;
    taxIncludedAmount?: Money;
    taxItem?: Array<TaxItem>;
    /**
     * When sub-classing, this defines the super-class
     */
    baseType?: string;
    /**
     * A URI to a JSON-Schema file that defines additional attributes and relationships
     */
    schemaLocation?: string;
    /**
     * When sub-classing, this defines the sub-class entity name
     */
    type?: string;
}
