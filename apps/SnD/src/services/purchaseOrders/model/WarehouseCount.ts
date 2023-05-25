import Id from './Id';
import {Item} from './Item';

interface WarehouseCount {
    items: Array<Item>;
    locatedAt: {
        id: Array<Id>;
        name: string;
    };
    code: string;
    message: string;
}

export default WarehouseCount;
