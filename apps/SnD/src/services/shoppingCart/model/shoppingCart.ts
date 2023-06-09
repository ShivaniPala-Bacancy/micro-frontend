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
import {CartItem} from './cartItem';
import {CartPrice} from './cartPrice';
import {ContactMedium} from './contactMedium';
import {RelatedParty} from './relatedParty';
import {TimePeriod} from './timePeriod';

/**
 * Shopping Cart resource is used for the temporarily selection and reservation of product offerings in e-commerce, call center and retail purchase. Shopping cart supports purchase of both physical and digital goods and service (e.g. handset, telecom network service). Shopping Cart contain list of cart items, a reference to customer (partyRole) or contact medium in case customer not exist, and the total items price including promotions
 */
export interface ShoppingCart {
    /**
     * Unique identifier created on provider side (e.g. Order Capture system)
     */
    id?: string;
    /**
     * Hyperlink to access the shopping cart
     */
    href?: string;
    cartItem?: Array<CartItem>;
    /**
     * Total amount of the shopping cart, usually of money, that represents the actual price paid by the Customer for cart (considering only \"Active\" cart items)
     */
    cartTotalPrice?: Array<CartPrice>;
    contactMedium?: Array<ContactMedium>;
    relatedParty?: Array<RelatedParty>;
    /**
     * The period for which the shopping cart is valid (e.g. 90 if no activity or 7 days if cart is empty)
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
     * When sub-classing, this defines the sub-class entity name
     */
    type?: string;
}
