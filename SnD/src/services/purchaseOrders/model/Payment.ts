export default interface Payment {
    id?: string;
    account: {
        id?: string;
        name?: string;
        ['@referredType']?: string;
    };
    paymentDate: Date;
    amount: {
        unit?: string;
        value?: string;
    };
    statusDate: Date;
    name?: string;
    payer: {
        id: string;
        name?: string;
        role?: string;
        ['@type']?: string;
    };
    paymentMethod?: {
        nam?: string;
    };
    paymentItem?: PaymentItem[];
    ['@type']?: string;
    description?: string;
    correlatorId?: string;
    status?: string;
}

interface PaymentItem {
    amount?: Price;
    taxAmount?: Price;
    totalAmount?: Price;
    item?: {
        id: string;
        name: string;
    };
}

interface Price {
    unit?: string;
    value?: string;
}
