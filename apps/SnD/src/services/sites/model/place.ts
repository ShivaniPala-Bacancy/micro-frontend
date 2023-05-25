/**
 * Geographic Site
 * ## TMF API Reference : TMF 674 - Place - Geographic Site Management  ### Release : 19.5 - November 2019  This API covers the operations to manage (create, read, delete) sites that can be associated to a customer, an account, a service delivery or other entities. It defines a Site as a convenience class that allows to easily refer to places important to other entities, where a geographic place is the entity that can answer the question “where?”, allowing to determine where things are in relation to the earth's surface, and can be represented either in a textual structured way (geographic address) or as a geometry referred to a spatial reference system (geographic location).  ### Resources - GeographicSite - Hub  ### Operations Geographic Site API performs the following operations : - Retrieve a geographic site or a collection of geographic sites - Create a new site - Update a geographic site - Delete a geographic site - Notify events on geographic site  Copyright © TM Forum 2019. All Rights Reserved
 *
 * OpenAPI spec version: 4.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Place reference. Place defines the places where the products are sold or delivered.
 */
export interface Place {
    /**
     * Unique identifier of the place
     */
    id?: string;
    /**
     * Unique reference of the place
     */
    href?: string;
    /**
     * A user-friendly name for the place, such as [Paris Store], [London Store], [Main Home]
     */
    name?: string;
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