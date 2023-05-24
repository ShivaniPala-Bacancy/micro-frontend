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
import {TimePeriod} from './timePeriod';

/**
 * Keeps track of other names, for example the old name of a woman before marriage or an artist name.
 */
export interface OtherNameIndividual {
    /**
     * e.g. Baron, Graf, Earl,…
     */
    aristocraticTitle?: string;
    /**
     * Contains the non-chosen or inherited name. Also known as last name in the Western context
     */
    familyName?: string;
    /**
     * Family name prefix
     */
    familyNamePrefix?: string;
    /**
     * . A fully formatted name in one string with all of its pieces in their proper place and all of the necessary punctuation. Useful for specific contexts (Chinese, Japanese, Korean,…)
     */
    formattedName?: string;
    /**
     * Full name flatten (first, middle, and last names)
     */
    fullName?: string;
    /**
     * e.g. Sr, Jr…
     */
    generation?: string;
    /**
     * First name
     */
    givenName?: string;
    /**
     * Legal name or birth name (name one has for official purposes)
     */
    legalName?: string;
    /**
     * Middle name or initial
     */
    middleName?: string;
    /**
     * Contains the chosen name by which the person prefers to be addressed. Note: This name may be a name other than a given name, such as a nickname
     */
    preferredGivenName?: string;
    /**
     * Use for titles (aristrocatic, social, ...): Pr, Dr, Sir,....
     */
    title?: string;
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
}