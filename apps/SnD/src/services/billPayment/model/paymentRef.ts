/**
 * Customer Order Management
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 5.4.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {PaymentDetailRef} from './paymentDetailRef';

export interface PaymentRef {
    /**
     * billing account id against the payment should be recorded. this parameter is non mandatory if the payment object is being passed as part of any purchase order
     */
    accountId?: string;
    /**
     * Flag that defines upfront payment
     */
    upfrontPayment?: PaymentRef.UpfrontPaymentEnum;
    isPaymentCollected?: string;
    /**
     * Actual amount paid by the subscriber.
     */
    amount: string;
    /**
     * total amount paid
     */
    totalAmount: string;
    /**
     * Source collector if any
     */
    collectionSourceType: string;
    /**
     * Source collector user id
     */
    collectionId: string;
    comment: string;
    /**
     * Currency code in which the payment was registered. Eg:USD, INR etc.
     */
    currencyCode: string;
    /**
     * The invoice ID for which the payment should be registered. Multiple comma-separated invoice Id’s can be given if the payment is done for multiple invoices
     */
    invoiceIds?: string;
    /**
     * The invoice amount to be considered for payment adjusting from the total paid amount
     */
    invoiceAmounts?: string;
    /**
     * date at which payment is collected
     */
    collectionDate?: Date;
    /**
     * external transaction_id if any (for card/digital payments)
     */
    transactionId: string;
    paymentDetail: Array<PaymentDetailRef>;
}
export namespace PaymentRef {
    export type UpfrontPaymentEnum = 'true' | 'false';
    export const UpfrontPaymentEnum = {
        True: 'true' as UpfrontPaymentEnum,
        False: 'false' as UpfrontPaymentEnum
    };
}
