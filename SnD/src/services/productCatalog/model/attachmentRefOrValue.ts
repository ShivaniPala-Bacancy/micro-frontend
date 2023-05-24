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
import {Quantity} from './quantity';
import {TimePeriod} from './timePeriod';

/**
 * An attachment by value or by reference. An attachment complements the description of an element, for example through a document, a video, a picture.
 */
export interface AttachmentRefOrValue {
    /**
     * Unique identifier for this particular attachment
     */
    id?: string;
    /**
     * URI for this Attachment
     */
    href?: string;
    /**
     * Attachment type such as video, picture
     */
    attachmentType?: string;
    /**
     * The actual contents of the attachment object, if embedded, encoded as base64
     */
    content?: string;
    /**
     * A narrative text describing the content of the attachment
     */
    description?: string;
    /**
     * Attachment mime type such as extension file for video, picture and document
     */
    mimeType?: string;
    /**
     * The name of the attachment
     */
    name?: string;
    /**
     * Uniform Resource Locator, is a web page address (a subset of URI)
     */
    url?: string;
    /**
     * The size of the attachment.
     */
    size?: Quantity;
    /**
     * The period of time for which the attachment is valid
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
    /**
     * The actual type of the target instance when needed for disambiguation.
     */
    referredType?: string;
}
