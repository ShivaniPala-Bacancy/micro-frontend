import ElementTypes from '../../types/ElementTypes';
import InputTypes from '../../types/InputTypes';
import {ISuggestions} from '../../types/ISuggestions';
import FormField from './FormFieldDefinition';

/**
 * Helps create form field definition
 */
class FormFieldFactory {
    /**
     * Creates a HTML input field of type text
     * @param id : Id of the html input
     * @param name : Label for html input
     * @param key : Used by react
     * @returns Form field definition
     */
    static text(id: string, name: string, key?: string) {
        return new FormField(id, name, key);
    }

    static number(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.NUMBER);
    }

    static double(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.DOUBLE_VALUE);
    }

    static currency(
        id: string,
        name: string,
        key?: string,
        positive?: boolean
    ) {
        return new FormField(id, name, key).setType(
            positive
                ? InputTypes.POSITIVE_CURRENCY_VALUE
                : InputTypes.CURRENCY_VALUE
        );
        // .setAddOn('app.currency', false);
    }

    static date(id: string, name: string, key?: string, withTime?: boolean) {
        return new FormField(id, name, key).setType(
            withTime ? InputTypes.DATE_TIME : InputTypes.DATE
        );
    }

    static time(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.TIME);
    }

    static email(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.EMAIL);
    }

    static integer(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.INTEGER);
    }

    static mob(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.MOBILE_NUMBER);
    }

    static file(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setType(InputTypes.FILE);
    }

    static checkBox(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setElementType(
            ElementTypes.CHECK_BOX
        );
    }

    static phone(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setElementType(ElementTypes.PHONE);
    }

    static gap(id: string, name: string, key?: string) {
        return new FormField(id, name, key).setElementType(ElementTypes.GAP);
    }

    static select(
        id: string,
        name: string,
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]},
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.SELECT)
            .setOptions(options);
    }

    static datePicker(id: string, name: string, options?: any, key?: string) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.DATE_PICKER)
            .setOptions(options);
    }

    static list(
        id: string,
        name: string,
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]},
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.LIST)
            .setOptions(options);
    }

    static multiselect(
        id: string,
        name: string,
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]},
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.MULTI_SELECT)
            .setOptions(options);
    }

    static selectsearch(
        id: string,
        name: string,
        options: ISuggestions[],
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.SELECT_SEARCH)
            .setOptions(options);
    }

    static multiselectsearch(
        id: string,
        name: string,
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]},
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.MULTI_SELECT_SEARCH)
            .setOptions(options);
    }

    static autoComplete(
        id: string,
        name: string,
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]},
        key?: string,
        serverSide?: boolean
    ) {
        return new FormField(id, name, key)
            .setElementType(
                serverSide
                    ? ElementTypes.AOTU_COMPLETE_SERVER_SIDE
                    : ElementTypes.AUTO_COMPLETE_CLIENT_SIDE
            )
            .setOptions(options);
    }

    static asyncAutoComplete(
        id: string,
        name: string,
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]},
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.AOTU_COMPLETE_SERVER_SIDE)
            .setOptions(options);
    }

    static csv(
        id: string,
        name: string,
        headerList: string[],
        csvData?: any,
        key?: string
    ) {
        return new FormField(id, name, key)
            .setElementType(ElementTypes.CSV)
            .setHeaderList(headerList)
            .setCsvData(csvData || [headerList]);
    }

    static iconPicker(id: string, name: string) {
        return new FormField(id, name, id).setElementType(
            ElementTypes.ICON_PICKER
        );
    }

    static textArea(id: string, name: string) {
        return new FormField(id, name, id).setElementType(
            ElementTypes.TEXT_AREA
        );
    }
}

export default FormFieldFactory;
