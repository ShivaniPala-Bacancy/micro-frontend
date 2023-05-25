import Id from './Id';
import ItemPrice from './ItemPrice';

export interface Price {
    id?: Array<Id>;
    items?: Array<ItemPrice>;
    discount?: number;
    tax?: number;
    totalPrice?: number;
    subTotal?: any;
}
