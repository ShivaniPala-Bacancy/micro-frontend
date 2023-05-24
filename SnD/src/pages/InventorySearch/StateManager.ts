import HttpResponse from 'src/services/HttpResponse';
import { InventoryDetail } from 'src/services/inventory/model/inventoryDetail';
import CrudStateManager, { ICrudSate } from '../CrudStateManager';
import LookupDetail from '../../services/master/model/LookupDetail';
import { ISuggestions } from '../../types/ISuggestions';
import IFilter from '../../types/IFilter';

interface InventorySearchState extends ICrudSate<any> {
    submit?: boolean;
    value?: any;
    search?: any;
    showInventory: boolean;
    inventorySearchStatus: ISuggestions[];
    inventoryType: ISuggestions[];
    searchData?: any;
    productList?: any;
    siteList?: any;
    showTimeline: boolean;
    product?: any;
    siteOptions: any;
}

class StateManager {
    static instance: StateManager;

    messagePrefix: string = 'pages.inventory.search';

    curdStateManager: CrudStateManager<InventoryDetail, string>;

    state: InventorySearchState;

    static comparator(
        inventory: InventoryDetail,
        productOfferingId: string | undefined
    ) {
        return inventory.productOfferingId === productOfferingId;
    }

    constructor() {
        this.curdStateManager = new CrudStateManager(
            this.messagePrefix,
            StateManager.comparator
        );
        this.state = {
            showInventory: false,
            showTimeline: false,
            inventorySearchStatus: [],
            inventoryType: [],
            pageSize: 10,
            currentOffset: 0,
            nextPageAvailable: true,
            recordFilters: [],
            siteOptions: []
        };
    }

    /* ****************Static methods ***************** */

    static getInstance(): StateManager {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new StateManager();
        return this.instance;
    }

    /* ****************** methods ************************ */
    get(): InventorySearchState {
        return this.state;
    }

    /**
     * Resets currentObject, formWaiting, searchTerm and action
     */
    refresh() {
        this.state.recordsSubscription &&
            this.state.recordsSubscription.unsubscribe();
        const newState = this.curdStateManager.refresh();
        this.state = {
            ...this.state,
            ...newState
        };
        return this;
    }

    setFilters(filters: IFilter[]) {
        this.state = {
            ...this.state,
            recordFilters: filters,
            currentOffset: 0
        };
        return this;
    }

    onAdd(value: boolean): StateManager {
        this.state = {
            ...this.state,
            currentRecord: {},
            submit: value,
            action: 'Add'
        };
        return this;
    }

    hideInventoryModal(value: boolean): StateManager {
        this.state = {
            ...this.state,
            currentRecord: {},
            showInventory: value,
            submit: value,
            action: 'Add'
        };
        return this;
    }

    hideTimeline(value: boolean): StateManager {
        this.state = {
            ...this.state,
            showTimeline: value
        };
        return this;
    }

    onSearchDetailFetch(value: any): StateManager {
        const nextOffset =
            (this.state.currentOffset || 0) + (this.state.pageSize || 0);
        const records =
            this.state.currentOffset === 0
                ? value
                : [...value, ...(this.state.searchData || [])];
        this.state = {
            ...this.state,
            searchData: records,
            formWaiting: false,
            currentRecord: undefined,
            currentOffset: nextOffset,
            nextPageAvailable: value.length >= (this.state.pageSize || 1)
        };
        return this;
    }

    onClearSearchDetail(): StateManager {
        this.state = {
            ...this.state,
            searchData: [],
            formWaiting: false,
            currentRecord: undefined
        };
        return this;
    }

    onRecordsLoad(value: any): StateManager {
        const nextOffset =
            (this.state.currentOffset || 0) + (this.state.pageSize || 0);
        const records =
            this.state.currentOffset === 0
                ? value
                : [...value, ...(this.state.records || [])];
        this.state = {
            ...this.state,
            records: records,
            formWaiting: false,
            currentRecord: undefined,
            currentOffset: nextOffset,
            nextPageAvailable: value.length >= (this.state.pageSize || 1)
        };
        return this;
    }

    onValueChange(value: any): StateManager {
        this.state = {
            ...this.state,
            value
        };
        return this;
    }

    onSearchChange(value: any): StateManager {
        this.state = {
            ...this.state,
            search: value
        };
        return this;
    }

    getAllProduct(value: any): StateManager {
        this.state = {
            ...this.state,
            productList: value
        };
        return this;
    }

    getAllSite(value: any): StateManager {
        this.state = {
            ...this.state,
            siteList: value
        };
        return this;
    }

    onInventoryStatusLoad(lookupEntries: LookupDetail[]): StateManager {
        const inventorySearchStatus = lookupEntries.map((entry) => {
            const suggestion: ISuggestions = {
                text: entry.text,
                value: entry.value,
                parent: entry.parent
            };
            return suggestion;
        });
        this.state = {
            ...this.state,
            inventorySearchStatus
        };
        return this;
    }

    onInventoryTypeLoad(lookupEntries: LookupDetail[]): StateManager {
        const inventoryType = lookupEntries.map((entry) => {
            const suggestion: ISuggestions = {
                text: entry.text,
                value: entry.value,
                parent: entry.parent
            };
            return suggestion;
        });
        this.state = {
            ...this.state,
            inventoryType
        };
        return this;
    }

    onProductChange(value: any): StateManager {
        this.state = {
            ...this.state,
            product: value
        };
        return this;
    }

    onSiteOptionFetch(value: any): StateManager {
        this.state = {
            ...this.state,
            siteOptions: value
        };
        return this;
    }

    /**
     * Called after record is deleted in backend.
     * It
     * 1. Removes the deleted record from the list of records
     * 2. Hides loading/spinner icon
     * 3. Displays success message in toast
     *
     * @returns
     */
    onDelete(): StateManager {
        const newState = this.curdStateManager.removeRecord(
            this.state.currentRecord?.id,
            this.state.records
        );
        this.state = {
            ...this.state,
            ...newState
        };
        return this;
    }

    /**
     * Called after record is updated in backend.
     * It
     * 1. Replaces the updated record in the list
     * 2. Hides loading/spinner icon
     * 3. Displays success message in toast
     *
     * @param record: Updated record (received from backend)
     * @returns
     */
    onUpdate(record: InventoryDetail): StateManager {
        const newState = this.curdStateManager.updateRecord(
            this.state.currentRecord?.id,
            record,
            this.state.records
        );

        this.state = {
            ...this.state,
            ...newState,
            currentRecord: record,
            action: 'Update'
        };
        return this;
    }

    beforeUpdate(record: InventoryDetail): StateManager {
        /**
         * Fix date values to show in html5 date fields
         */

        const newState = this.curdStateManager.beforeAction(record, 'Update');
        this.state = {
            ...this.state,
            ...newState
        };
        return this;
    }

    /**
     * Called if there is error while creating/updating/deleting record in backend
     * It
     * 1. Displays error message using the reason received from backend (if possible otherwise shows a generic failure message)
     * 2. Hides loading/spinner icon
     * @param error : HttpResponse received from backend
     * @returns
     */

    onFailure(error: HttpResponse): StateManager {
        this.state = {
            ...this.state,
            ...this.curdStateManager.onFailure(error)
        };
        return this;
    }
}

export type { InventorySearchState };
export default StateManager;
