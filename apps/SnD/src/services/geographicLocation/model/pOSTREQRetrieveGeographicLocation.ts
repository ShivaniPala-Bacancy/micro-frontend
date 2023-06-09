/**
 * API GeographicLocation
 * ## TMF API Reference : TMF 675 - Geographic Location ### Release : 17.5 - January 2018  The geographic location API provides a standardized client interface to a location management system. A Geographic Location is a point, a surface or a volume defined by geographic point(s). These points should be associated with an accuracy and a spatial reference.  ### Resources - GeographicLocation - RetrieveGeographicLocation - RetrieveLocationRelation - Hub  ### Operations Geographic Location API performs the following operations : - Retrieve a geographic location or a collection of geographic locations - Retrieve a retrieve geographic location or a collection of retrieve geographic locations - Create a retrieve geographic location - Retrieve a retrieve location relation or a collection of retrieve location relations - Create a retrieve location relation - Notify events on these resources
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ModelObject} from './modelObject';

/**
 *
 */
export interface POSTREQRetrieveGeographicLocation {
    /**
     *
     */
    requestedAccuracy?: number;
    thing: ModelObject;
}
