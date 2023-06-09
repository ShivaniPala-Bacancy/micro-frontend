/**
 * Trouble Ticket
 * This is Swagger UI environment generated for the TMF Trouble Ticket specification
 *
 * OpenAPI spec version: 2.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Related Entity reference. Reference to an arbitrary entity from a context entity.
 */
export interface RelatedEntityRef {
    /**
     * Unique identifier of the related entity
     */
    id?: string;
    /**
     * Hyperlink, a reference to the related entity (e.g. customerBill, productOrder, etc.)
     */
    href?: string;
    /**
     * The name of the related entity if applicable (e.g. name of the customer, name of the bill, name of the product etc...)
     */
    name?: string;
    /**
     * The role of the related entity in the context of the contained resource (e.g. disputedBill, damagedDevice
     */
    role?: string;
    /**
     * A string. Indicates the type (class) of related entity. For example, Product Order Customer Bill, Payment, etc.
     */
    referredType?: string;
}
