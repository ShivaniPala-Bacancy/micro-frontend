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
import {Characteristic} from './characteristic';
import {ContactMedium} from './contactMedium';
import {ExternalReference} from './externalReference';
import {OrganizationChildRelationship} from './organizationChildRelationship';
import {OrganizationIdentification} from './organizationIdentification';
import {OrganizationParentRelationship} from './organizationParentRelationship';
import {OrganizationStateType} from './organizationStateType';
import {OtherNameOrganization} from './otherNameOrganization';
import {PartyCreditProfile} from './partyCreditProfile';
import {RelatedParty} from './relatedParty';
import {TaxExemptionCertificate} from './taxExemptionCertificate';
import {TimePeriod} from './timePeriod';

/**
 * Organization represents a group of people identified by shared interests or purpose. Examples include business, department and enterprise. Because of the complex nature of many businesses, both organizations and organization units are represented by the same data. Skipped properties: id,href
 */
export interface OrganizationUpdate {
    /**
     * If value is true, the organization is the head office
     */
    isHeadOffice?: boolean;
    /**
     * If value is true, the organization is a legal entity known by a national referential.
     */
    isLegalEntity?: boolean;
    /**
     * Organization name (department name for example)
     */
    name?: string;
    /**
     * Type of the name : Co, Inc, Ltd,…
     */
    nameType?: string;
    /**
     * Type of Organization (company, department...)
     */
    organizationType?: string;
    /**
     * Name that the organization (unit) trades under
     */
    tradingName?: string;
    contactMedium?: Array<ContactMedium>;
    creditRating?: Array<PartyCreditProfile>;
    existsDuring?: TimePeriod;
    externalReference?: Array<ExternalReference>;
    organizationChildRelationship?: Array<OrganizationChildRelationship>;
    organizationIdentification?: Array<OrganizationIdentification>;
    organizationParentRelationship?: OrganizationParentRelationship;
    otherName?: Array<OtherNameOrganization>;
    partyCharacteristic?: Array<Characteristic>;
    relatedParty?: Array<RelatedParty>;
    /**
     * Status of the organization
     */
    status?: OrganizationStateType;
    taxExemptionCertificate?: Array<TaxExemptionCertificate>;
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
