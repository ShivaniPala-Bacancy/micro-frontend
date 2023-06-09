/**
 * Account Management
 * This is Swagger UI environment generated for the TMF Account Management specification
 *
 * OpenAPI spec version: 2.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * A base / value business entity used to represent money
 */
export interface Money {
    /**
     * Currency (ISO4217 norm uses 3 letters to define the currency)
     */
    unit?: string;
    /**
     * A positive floating point number
     */
    value?: number;
}
