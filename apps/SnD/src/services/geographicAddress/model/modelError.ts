/**
 * API Place - GeographicAddress
 * ## TMF API Reference : TMF 673 - Place - Geographic Address Management ### Release : 19.5 - January 2020  The Geographic Address API provides a standardized client interface to an Address management system. It allows looking for worldwide addresses. It can also be used to validate geographic address data, to be sure that it corresponds to a real address.  ### Resources - GeographicAddress - GeographicSubAddress - GeographicAddressValidation - Hub  ### Operations Geographic Address Management API performs the following operations : - Retrieve a geographic address or a collection of geographic addresses - Retrieve a geographic sub-address - Create a geographic address validation - Retrieve, update and delete an existing  geographic address validation - Notify events on these resources
 *
 * OpenAPI spec version: 4.0.1
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
