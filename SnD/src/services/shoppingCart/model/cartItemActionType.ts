/**
 * Shopping Cart
 * **TMF API Reference : TMF - 663 Shopping Cart**  **Release : 19.0 - June 2019**  The Shoppoing Cart API provides a standardized mechanism for the management of shopping carts. Including creation, update, retrieval, deletion and notification of event.  Shopping Cart entity is used for the temporarily selection and reservation of product offerings in e-commerce and retail purchase.  Shopping cart supports purchase of both tangible and intangible goods and service (e.g. handset, telecom network service). The charge includes the one-off fee such as the fee for handset and the recurring fee such as the fee of a network service.  Shopping Cart contains list of cart items, a reference to party or party role (e.g. customer) or contact medium in case of unknown customer, In addition the calculated total items price including promotions.   Copyright © TM Forum 2019. All Rights Reserved
 *
 * OpenAPI spec version: 4.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * action to be performed on the product
 */
/* eslint-disable prettier/prettier */
export type CartItemActionType = 'add' | 'modify' | 'delete' | 'noChange';

export const CartItemActionType = {
    Add: 'add' as CartItemActionType,
    Modify: 'modify' as CartItemActionType,
    Delete: 'delete' as CartItemActionType,
    NoChange: 'noChange' as CartItemActionType
};
