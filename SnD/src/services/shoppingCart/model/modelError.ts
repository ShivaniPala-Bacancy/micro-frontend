/**
 * Shopping Cart
 * **TMF API Reference : TMF - 663 Shopping Cart**  **Release : 19.0 - June 2019**  The Shoppoing Cart API provides a standardized mechanism for the management of shopping carts. Including creation, update, retrieval, deletion and notification of event.  Shopping Cart entity is used for the temporarily selection and reservation of product offerings in e-commerce and retail purchase.  Shopping cart supports purchase of both tangible and intangible goods and service (e.g. handset, telecom network service). The charge includes the one-off fee such as the fee for handset and the recurring fee such as the fee of a network service.  Shopping Cart contains list of cart items, a reference to party or party role (e.g. customer) or contact medium in case of unknown customer, In addition the calculated total items price including promotions.   Copyright © TM Forum 2019. All Rights Reserved
 *
 * OpenAPI spec version: 4.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Used when an API throws an Error, typically with a HTTP error response-code (3xx, 4xx, 5xx)
 */
export interface ModelError {
    /**
     * Application relevant detail, defined in the API or a common list.
     */
    code: string;
    /**
     * Explanation of the reason for the error which can be shown to a client user.
     */
    reason: string;
    /**
     * More details and corrective actions related to the error which can be shown to a client user.
     */
    message?: string;
    /**
     * HTTP Error code extension
     */
    status?: string;
    /**
     * URI of documentation describing the error.
     */
    referenceError?: string;
    /**
     * When sub-classing, this defines the super-class.
     */
    baseType?: string;
    /**
     * A URI to a JSON-Schema file that defines additional attributes and relationships
     */
    schemaLocation?: string;
    /**
     * When sub-classing, this defines the sub-class entity name.
     */
    type?: string;
}
