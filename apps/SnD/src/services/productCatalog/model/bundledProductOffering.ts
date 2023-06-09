/**
 * Product Catalog Management
 * ## TMF API Reference: TMF620 - Product Catalog Management  ### Release : 20.5 - March 2021  Product Catalog API is one of Catalog Management API Family. Product Catalog API goal is to provide a catalog of products.   ### Operations Product Catalog API performs the following operations on the resources : - Retrieve an entity or a collection of entities depending on filter criteria - Partial update of an entity (including updating rules) - Create an entity (including default values and creation rules) - Delete an entity - Manage notification of events
 *
 * OpenAPI spec version: 4.1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {BundledProductOfferingOption} from './bundledProductOfferingOption';

/**
 * A type of ProductOffering that belongs to a grouping of ProductOfferings made available to the market. It inherits of all attributes of ProductOffering.
 */
export interface BundledProductOffering {
    /**
     * Unique identifier of the BundledProductOffering
     */
    id?: string;
    /**
     * Unique reference of the BundledProductOffering
     */
    href?: string;
    /**
     * Used to indicate the current lifecycle status
     */
    lifecycleStatus?: string;
    /**
     * Name of the BundledProductOffering
     */
    name?: string;
    /**
     * A set of numbers that specifies the lower and upper limits for a ProductOffering that can be procured as part of the related BundledProductOffering. Values can range from 0 to unbounded.
     */
    bundledProductOfferingOption?: BundledProductOfferingOption;
    /**
     * When sub-classing, this defines the super-class
     */
    baseType?: string;
    /**
     * A URI to a JSON-Schema file that defines additional attributes and relationships
     */
    schemaLocation?: string;
    /**
     * When sub-classing, this defines the sub-class Extensible name
     */
    '@type'?: string;
}
