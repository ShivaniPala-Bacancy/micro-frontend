import StockLevel from './StockLevel ';

export interface Item {
    id?: string;
    name?: string;
    desc?: string;
    stockLevel?: StockLevel;
}
