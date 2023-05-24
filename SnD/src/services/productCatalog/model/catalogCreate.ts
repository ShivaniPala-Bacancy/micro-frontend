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
import {CategoryRef} from './categoryRef';
import {RelatedParty} from './relatedParty';
import {TimePeriod} from './timePeriod';

/**
 * A collection of Product Offerings, intended for a specific DistributionChannel, enhanced with additional information such as SLA parameters, invoicing and shipping details Skipped properties: id,href
 */
export interface CatalogCreate {
    /**
     * Indicates if the catalog is a product, service or resource catalog
     */
    catalogType?: string;
    /**
     * Description of this catalog
     */
    description?: string;
    /**
     * Date and time of the last update
     */
    lastUpdate?: Date;
    /**
     * Used to indicate the current lifecycle status
     */
    lifecycleStatus?: string;
    /**
     * Name of the catalog
     */
    name: string;
    /**
     * Catalog version
     */
    version?: string;
    /**
     * List of root categories contained in this catalog
     */
    category?: Array<CategoryRef>;
    /**
     * List of parties involved in this catalog
     */
    relatedParty?: Array<RelatedParty>;
    /**
     * The period for which the catalog is valid
     */
    validFor?: TimePeriod;
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
    type?: string;
}
