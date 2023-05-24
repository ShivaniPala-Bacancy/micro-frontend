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
import {Duration} from './duration';
import {ProductPriceValue} from './productPriceValue';
import {Quantity} from './quantity';
import {TimePeriod} from './timePeriod';

/**
 * Is an amount, usually of money, that modifies the price charged for an order item.
 */
export interface POPAlteration {
    /**
     * unique identifier
     */
    id?: string;
    /**
     * Hyperlink reference
     */
    href?: string;
    /**
     * A narrative that explains in detail the semantics of this order item price alteration
     */
    description?: string;
    /**
     * Name given to this price alteration
     */
    name?: string;
    /**
     * A category that describes the price such as recurring, one time and usage.
     */
    priceType: string;
    /**
     * Priority level for applying this alteration among all the defined alterations on the order item price
     */
    priority?: number;
    /**
     * Could be month, week...
     */
    recurringChargePeriod?: string;
    /**
     * The period for which the productOfferingPriceAlteration is applicable
     */
    applicationDuration?: Duration;
    price: ProductPriceValue;
    /**
     * A number and unit representing denominator of an alteration rate. For example, for a data discount rate of $1 per 20 GB usage, the amount of unitOfMeasure will be 20 with units as GB.
     */
    unitOfMeasure?: Quantity;
    /**
     * The period for which this productOfferingPriceAlteration is valid
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
    '@type'?: string;
}
