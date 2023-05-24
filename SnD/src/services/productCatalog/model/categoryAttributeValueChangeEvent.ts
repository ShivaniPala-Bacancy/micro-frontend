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
import {CategoryAttributeValueChangeEventPayload} from './categoryAttributeValueChangeEventPayload';

/**
 * The notification data structure
 */
export interface CategoryAttributeValueChangeEvent {
    /**
     * The identifier of the notification.
     */
    eventId?: string;
    /**
     * Time of the event occurrence.
     */
    eventTime?: Date;
    /**
     * The type of the notification.
     */
    eventType?: string;
    /**
     * The correlation id for this event.
     */
    correlationId?: string;
    /**
     * The domain of the event.
     */
    domain?: string;
    /**
     * The title of the event.
     */
    title?: string;
    /**
     * An explnatory of the event.
     */
    description?: string;
    /**
     * A priority.
     */
    priority?: string;
    /**
     * The time the event occured.
     */
    timeOcurred?: Date;
    /**
     * The path identifying the object field concerned by this notification.
     */
    fieldPath?: string;
    /**
     * The event payload linked to the involved resource object
     */
    event?: CategoryAttributeValueChangeEventPayload;
}
