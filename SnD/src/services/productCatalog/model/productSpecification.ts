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
import {AttachmentRefOrValue} from './attachmentRefOrValue';
import {BundledProductSpecification} from './bundledProductSpecification';
import {ProductSpecificationCharacteristic} from './productSpecificationCharacteristic';
import {ProductSpecificationRelationship} from './productSpecificationRelationship';
import {RelatedParty} from './relatedParty';
import {ResourceSpecificationRef} from './resourceSpecificationRef';
import {ServiceSpecificationRef} from './serviceSpecificationRef';
import {TargetProductSchema} from './targetProductSchema';
import {TimePeriod} from './timePeriod';

/**
 * Is a detailed description of a tangible or intangible object made available externally in the form of a ProductOffering to customers or other parties playing a party role.
 */
export interface ProductSpecification {
    /**
     * Unique identifier of the product specification
     */
    id?: string;
    /**
     * Reference of the product specification
     */
    href?: string;
    /**
     * The manufacturer or trademark of the specification
     */
    brand?: string;
    /**
     * A narrative that explains in detail what the product specification is
     */
    description?: string;
    /**
     * isBundle determines whether a productSpecification represents a single productSpecification (false), or a bundle of productSpecification (true).
     */
    isBundle?: boolean;
    /**
     * Date and time of the last update
     */
    lastUpdate?: Date;
    /**
     * Used to indicate the current lifecycle status
     */
    lifecycleStatus?: string;
    /**
     * Name of the product specification
     */
    name?: string;
    /**
     * An identification number assigned to uniquely identity the specification
     */
    productNumber?: string;
    /**
     * Product specification version
     */
    version?: string;
    /**
     * Complements the description of an element (for instance a product) through video, pictures...
     */
    attachment?: Array<AttachmentRefOrValue>;
    /**
     * A type of ProductSpecification that belongs to a grouping of ProductSpecifications made available to the market. It inherits of all attributes of ProductSpecification.
     */
    bundledProductSpecification?: Array<BundledProductSpecification>;
    /**
     * A characteristic quality or distinctive feature of a ProductSpecification.  The characteristic can be take on a discrete value, such as color, can take on a range of values, (for example, sensitivity of 100-240 mV), or can be derived from a formula (for example, usage time (hrs) = 30 - talk time *3). Certain characteristics, such as color, may be configured during the ordering or some other process.
     */
    productSpecCharacteristic?: Array<ProductSpecificationCharacteristic>;
    /**
     * A migration, substitution, dependency or exclusivity relationship between/among product specifications.
     */
    productSpecificationRelationship?: Array<ProductSpecificationRelationship>;
    /**
     * A related party defines party or party role linked to a specific entity.
     */
    relatedParty?: Array<RelatedParty>;
    /**
     * The ResourceSpecification is required to realize a ProductSpecification.
     */
    resourceSpecification?: Array<ResourceSpecificationRef>;
    /**
     * ServiceSpecification(s) required to realize a ProductSpecification.
     */
    serviceSpecification?: Array<ServiceSpecificationRef>;
    /**
     * A target product schema reference. The reference object to the schema and type of target product which is described by product specification.
     */
    targetProductSchema?: TargetProductSchema;
    /**
     * The period for which the product specification is valid
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