/**
 * API Party
 * ## TMF API Reference : TMF 632 - Party   ### Release : 19.0   The party API provides standardized mechanism for party management such as creation, update, retrieval, deletion and notification of events. Party can be an individual or an organization that has any kind of relation with the enterprise. Party is created to record individual or organization information before the assignment of any role. For example, within the context of a split billing mechanism, Party API allows creation of the individual or organization that will play the role of 3 rd payer for a given offer and, then, allows consultation or update of his information.  ### Resources - Organization - Individual - Hub  Party API performs the following operations : - Retrieve an organization or an individual - Retrieve a collection of organizations or individuals according to given criteria - Create a new organization or a new individual - Update an existing organization or an existing individual - Delete an existing organization or an existing individual - Notify events on organizatin or individual
 *
 * OpenAPI spec version: 4.0.0
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
    attachmentType?: string; // picture
    /**
     * The actual contents of the attachment object, if embedded, encoded as base64
     */
    content?: string; // base64
    /**
     * A narrative text describing the content of the attachment
     */
    description?: string; // id type
    /**
     * Attachment mime type such as extension file for video, picture and document
     */
    mimeType?: string; //
    /**
     * The name of the attachment
     */
    name?: string; // idTYpe+idNo
    /**
     * Uniform Resource Locator, is a web page address (a subset of URI)
     */
    url?: string; // path
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
     * When sub-classing, this defines the sub-class entity name
     */
    type?: string;
    /**
     * The actual type of the target instance when needed for disambiguation.
     */
    referredType?: string; // Attachment
}
