import Id from './Id';
import {Item} from './Item';

interface WarehouseCountCreate {
    id: Array<Id>;
    items: Array<Item>;
    locatedAt: {
        id?: Array<Id>;
        name?: string;
        desc?: string;
    };
}

export default WarehouseCountCreate;
