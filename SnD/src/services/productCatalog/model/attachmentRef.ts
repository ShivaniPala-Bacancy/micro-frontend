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

/**
 * Attachment reference. An attachment complements the description of an element (for instance a product) through video, pictures
 */
export interface AttachmentRef {
    /**
     * Unique-Identifier for this attachment
     */
    id: string;
    /**
     * URL serving as reference for the attachment resource
     */
    href?: string;
    /**
     * A narrative text describing the content of the attachment
     */
    description?: string;
    /**
     * Name of the related entity.
     */
    name?: string;
    /**
     * Link to the attachment media/content
     */
    url?: string;
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
    /**
     * The actual type of the target instance when needed for disambiguation.
     */
    referredType?: string;
}