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
import {GeographicAddress} from './geographicAddress';
import {TaskStateType} from './taskStateType';

/**
 * This resource is used to manage address validation request and response
 */
export interface GeographicAddressValidation {
    /**
     * Unique identifier of the Address Validation
     */
    id?: string;
    /**
     * An URI used to access to the address validation resource
     */
    href?: string;
    /**
     * Indicator provided by the requester to specify if alternate addresses must be provided in case of partial or fail result.
     */
    provideAlternative?: boolean;
    /**
     * Date when the address validation is performed
     */
    validationDate?: Date;
    /**
     * Result of the address validation (success, partial, fails)
     */
    validationResult?: string;
    alternateGeographicAddress?: Array<GeographicAddress>;
    state?: TaskStateType;
    /**
     * the address as submitted to validation
     */
    submittedGeographicAddress?: GeographicAddress;
    /**
     * the correct form of the validated address in case of validation success
     */
    validGeographicAddress?: GeographicAddress;
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