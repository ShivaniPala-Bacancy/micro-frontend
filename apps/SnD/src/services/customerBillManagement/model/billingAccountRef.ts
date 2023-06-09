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


/**
 * Reference to the billing account in case of not billed item.
 */
export interface BillingAccountRef { 
    /**
     * Unique-Identifier for this <123>
     */
    id: string;
    /**
     * URL serving as reference for the <xyz> resource
     */
    href?: string;
    /**
     * Name of the Billingaccount
     */
    name?: string;
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
    /**
     * The actual type of the target instance when needed for disambiguation.
     */
    referredType?: string;
}
