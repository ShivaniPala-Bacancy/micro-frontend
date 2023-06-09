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
import {GeographicSite} from './geographicSite';

/**
 * The event data structure
 */
export interface GeographicSiteDeleteEventPayload {
    /**
     * The involved resource data for the event
     */
    geographicSite?: GeographicSite;
}
