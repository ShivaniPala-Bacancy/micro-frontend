import {Subscription} from 'rxjs';
import HttpResponse from '../services/HttpResponse';
import IFilter from '../types/IFilter';

/* eslint-disable class-methods-use-this */
type ActionTypes = 'Add' | 'Update' | 'Delete' | null;
interface ICrudSate<T> {
    action?: ActionTypes;
    /**
     * The record which user is currently working on.
     * In case of update/delete operation this record will be populated by the record  selected by the user from the grid
     * In case of add operation it will be a new record which we will send to backend on click of save button
     */
    currentRecord?: T | null;

    /**
     * List of system parameters to be displayed in the grid
     */
    records?: Array<T>;

    /**
     * Used to show loading spinner while sending requests to backend
     */
    formWaiting?: boolean;

    /**
     * Message to display in toast in case of failure/errors from backend
     */
    errorMessage?: string | null;

    /**
     * Warning message to show in toastr
     */
    warningMessage?: string | null;

    /**
     * Message to display in toast on successfull operation
     */
    successMessage?: string | null;

    /**
     * boolean variable to keep track if we want to show grid or form
     */
    showForm?: boolean;

    /**
     * boolean variable to keep track if we want to show confirmation dialog
     */
    showConfirmation?: boolean;
    confirmationMessage?: string;
    confirmationCallback?: () => void;

    /**
     * Total records to be fetched in request
     */
    pageSize?: number;

    /**
     * Current offset if pagination is enabled
     */
    currentOffset?: number;

    /**
     * True if more records exists, false otherwise
     */
    nextPageAvailable?: boolean;

    /**
     * This field is subscription object for fetching the *records*
     */
    recordsSubscription?: Subscription | null;

    /**
     * This field is used to keep track of filters
     */
    recordFilters?: IFilter[];
}

export default class CrudStateManager<T, U> {
    messagePrefix: string;

    comparator: (param1: T, id: U | undefined) => boolean;

    constructor(
        prefix: string,
        comparatorFn: (param1: T, id: U | undefined) => boolean
    ) {
        this.messagePrefix = prefix;
        this.comparator = comparatorFn;
    }

    addRecord(newRecord: T, records: T[] | undefined): ICrudSate<T> {
        const copyOfRecords = [...(records || [])];
        copyOfRecords.push(newRecord);
        return {
            records: copyOfRecords,
            formWaiting: false,
            errorMessage: null,
            currentRecord: null,
            action: null,
            showForm: false,
            showConfirmation: false,
            successMessage: `${this.messagePrefix}.messages.add.ok`,
            warningMessage: null
        };
    }

    removeRecord(id: U | undefined, records: T[] | undefined): ICrudSate<T> {
        const copyOfRecords = [...(records || [])];
        return {
            records: copyOfRecords.filter((e) => !this.comparator(e, id)),
            formWaiting: false,
            currentRecord: null,
            action: null,
            showForm: false,
            showConfirmation: false,
            successMessage: `${this.messagePrefix}.messages.delete.ok`,
            errorMessage: null,
            warningMessage: null
        };
    }

    /**
     *
     * @param id :Id  of the record which was updated
     * @param updatedRecord :record after updation
     * @param records :records array
     * @returns: new state
     */
    updateRecord(
        id: U | undefined,
        updatedRecord: T,
        records: T[] | undefined,
        dontHideForm?: boolean
    ): ICrudSate<T> {
        // Clone the records array.
        const copyOfRecords = [...(records || [])];
        // Find the updated record and change the content of the record

        copyOfRecords.forEach((r, i) => {
            if (this.comparator(r, id)) {
                copyOfRecords[i] = updatedRecord;
            }
        });
        return {
            records: copyOfRecords,
            formWaiting: false,
            currentRecord: dontHideForm ? updatedRecord : null,
            action: null,
            showForm: dontHideForm,
            showConfirmation: false,
            errorMessage: null,
            warningMessage: null,
            successMessage: `${this.messagePrefix}.messages.update.ok`
        };
    }

    waiting(): ICrudSate<T> {
        return {
            formWaiting: true
        };
    }

    stopWaiting(): ICrudSate<T> {
        return {
            formWaiting: false
        };
    }

    refresh(): ICrudSate<T> {
        return {
            errorMessage: null,
            successMessage: null,
            warningMessage: null,
            showForm: false,
            showConfirmation: false,
            formWaiting: false,
            currentRecord: null,
            action: null,
            records: [],
            currentOffset: 0,
            nextPageAvailable: true,
            recordsSubscription: null
        };
    }

    beforeAction(defaultRecord: T, action: ActionTypes): ICrudSate<T> {
        return {
            formWaiting: action === 'Delete',
            errorMessage: null,
            warningMessage: null,
            successMessage: null,
            showForm: action !== 'Delete',
            currentRecord: defaultRecord,
            action
        };
    }

    /**
     * Converts HttpResponse from backend into user friendly error message
     *
     * @param status
     * @returns
     */
    getErrorMessage(httpResponse: HttpResponse): string {
        const {status, response} = httpResponse;
        if (!status && !response) {
            return 'Service unavailable';
        }
        if (status === 500) {
            const message = response?.details;
            if (message && message.indexOf('Exception') >= 0) {
                return 'Internal server error';
            }
            return message || 'Internal server error';
        }
        /**  TODO 1. check if response is coming in HttpResponse ,for tm forum apis it should be standard format.
         * Fetch the error response and translate it using useTranslation
         * If proper response is not coming from backend then create generic error response for the opration
         * (use  this.action to know the opration)
         */
        return '';
    }

    /**
     * Called if there is error while creating/updating/deleting record in backend
     * It
     * 1. Displays error message using the reason received from backend (if possible otherwise shows a generic failure message)
     * 2. Hides loading/spinner icon
     * @param error : HttpResponse received from backend
     * @returns
     */
    onFailure(error: HttpResponse): ICrudSate<T> {
        return {
            errorMessage: this.getErrorMessage(error),
            formWaiting: false,
            successMessage: null,
            warningMessage: null
        };
    }

    hideForm(): ICrudSate<T> {
        return {
            showForm: false
        };
    }

    showConfirmationDialog(msg: string, callback: () => void): ICrudSate<T> {
        return {
            showConfirmation: true,
            confirmationMessage: msg,
            confirmationCallback: callback
        };
    }

    hideConfirmationDialog(): ICrudSate<T> {
        return {
            showConfirmation: false,
            confirmationMessage: undefined
        };
    }
}

export type {ICrudSate, ActionTypes};
