import {Subscription} from 'rxjs';
import LookupDetail from '../services/master/model/LookupDetail';
import MasterConfigService from '../services/master/api/MasterConfigService';
import {ISuggestions} from '../types/ISuggestions';
/**
 * DropdownType represents an object where key is the name of dropdown which we need to fetch
 * and value is a callback function which will be called on succesfull fetch of dropdown,
 * Fetched data will be passed as argument of this callback function
 */
class DropdownHandler {
    masterService = new MasterConfigService();

    subscriptions: {[key: string]: Subscription} = {};

    lookupData: {[key: string]: ISuggestions[]} = {};

    dropdowns: Array<{key: string; fields: Array<string>}>;

    reverseMappings: {[key: string]: string} = {};

    constructor(dropdowns: Array<{key: string; fields: Array<string>}>) {
        this.dropdowns = dropdowns;
        this.init();
    }

    init() {
        this.dropdowns.forEach((dropdown) => {
            dropdown.fields.forEach((field) => {
                this.reverseMappings[field] = dropdown.key;
            });
            const subscription = this.masterService
                .getLookupDetail(dropdown.key)
                .subscribe((lookup: LookupDetail[]) => {
                    this.lookupData[dropdown.key] = lookup.map((entry) => {
                        return {
                            text: entry.text,
                            value: entry.value,
                            parent: entry.parent
                        };
                    });
                });
            this.subscriptions[dropdown.key] = subscription;
        });
    }

    dropdownsGetter(fieldName: string, parentValue?: any): ISuggestions[] {
        const dropdownId = this.reverseMappings[fieldName];
        if (!dropdownId || !this.lookupData[dropdownId]) return [];
        if (!parentValue) return this.lookupData[dropdownId];

        return this.lookupData[dropdownId].filter(
            (entry) => entry.parent === parentValue
        );
    }

    destroy() {
        Object.keys(this.subscriptions).forEach((sub) => {
            this.subscriptions[sub].unsubscribe();
        });
    }
}

export default DropdownHandler;
