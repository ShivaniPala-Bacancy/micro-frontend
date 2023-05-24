import yup from 'yup';
import ElementTypes from '../../types/ElementTypes';
import ICol from '../../types/ICol';
import InputTypes from '../../types/InputTypes';
import {IFileEventHandler, IInputEventHandler} from '../../types/EventHandlers';
import {ISuggestions} from '../../types/ISuggestions';

class FormField implements ICol {
    id = '';

    name = '';

    key = '';

    type = InputTypes.TEXT;

    id1 = '';

    key1 = '';

    required = false;

    disabled = false;

    minDate = '';

    showMonthYearPicker = false;

    elementType = ElementTypes.TEXT;

    min: number | null = null;

    max: number | null = null;

    range?: string;

    /* this property is used to pair 2 form fields to create a range (min value , max value) */
    siblingKey?: string;

    /* this property is used to pair the field with another field as child. It shold only be used for select elements */
    parentKey?: string;

    frontAddOn = false;

    backAddOn = false;

    addOnIcon: any = null;

    addOnAction?: any;

    addOnLabel: string | undefined = undefined;

    addOnIcon2: any = null;

    addOnAction2?: any;

    addOnLabel2: string | undefined = undefined;

    size = 6;

    labelSize?: number;

    inputSize?: number;

    errorSize?: number;

    dataMapper?: (data?: any) => any;

    options: ISuggestions[] | {(fieldName: string): ISuggestions[]} = [
        {value: -1, text: 'Please select'}
    ];

    pattern: RegExp | undefined = undefined;

    headerList: string[] | undefined;

    suggestionUrl?: string;

    selectedSuggestion?: (() => ISuggestions) | ISuggestions;

    csvData: any;

    noError: boolean = false;

    noLabel: boolean = false;

    placeholder: string = '';

    value?: string = '';

    multiple: boolean = false;

    schema: yup.ObjectSchema<any, any> | undefined;

    onChange: IInputEventHandler | null = null;

    onBlur: IInputEventHandler | null = null;

    onFileChange: IFileEventHandler | undefined;

    addOneIcon?: boolean;

    label1?: string;

    label2?: string;

    isChecked1?: boolean;

    isChecked2?: boolean;

    patternMismatchMessage?: string;

    handleOnCheckbox1Change?: (data?: any) => any;

    handleOnCheckbox2Change?: (data?: any) => any;

    addQuestionData?: () => any;

    constructor(id: string, name: string, key?: string, value?: string) {
        this.id = id;
        this.name = name;
        this.key = key || id;
        this.value = value;
    }

    conditionalSet(condition: boolean, setters: any[]) {
        if (condition) {
            setters.forEach((setter) => {
                switch (setter.method) {
                    case 'required':
                        this.setRequired(setter.value);
                        break;
                    case 'length':
                        this.setLength(setter.min, setter.max);
                        break;
                    case 'disabled':
                        this.setDisabled(setter.value);
                        break;
                    default:
                        // Do nothing
                        break;
                }
            });
        }
        return this;
    }

    setPattern(pattern: RegExp | undefined) {
        this.pattern = pattern;
        return this;
    }

    setPatternMessage(patternMismatchMessage: string | undefined) {
        this.patternMismatchMessage = patternMismatchMessage;
        return this;
    }

    setType(type: InputTypes) {
        this.type = type;
        return this;
    }

    setMultiple(multiple: boolean) {
        this.multiple = multiple;
        return this;
    }

    /**
     * Sets the size of element in the grid.
     * It uses bootstrap grid of 12 columns, so possible values are 1 to 12
     * @param size : Overall size of the element
     * @param labelSize : Label size
     * @param inputSize : Input element size
     * @param errorSize : Error span size
     * @returns
     */
    setSize(
        size: number,
        labelSize?: number,
        inputSize?: number,
        errorSize?: number
    ) {
        this.size = size;
        this.labelSize = labelSize;
        this.inputSize = inputSize;
        this.errorSize = errorSize;
        return this;
    }

    setRequired(required: boolean) {
        this.required = required;
        return this;
    }

    setDisabled(disabled: boolean) {
        this.disabled = disabled;
        return this;
    }

    setShowMonthYearPicker(showMonthYearPicker: boolean) {
        this.showMonthYearPicker = showMonthYearPicker;
        return this;
    }

    setElementType(elType: ElementTypes) {
        this.elementType = elType;
        return this;
    }

    setOptions(
        options: ISuggestions[] | {(fieldName: string): ISuggestions[]}
    ) {
        this.options = options;
        return this;
    }

    setAddOn(label: string, back?: boolean) {
        if (back) {
            this.backAddOn = true;
        } else {
            this.frontAddOn = true;
        }
        this.addOnLabel = label;
        return this;
    }

    setAddOnCheckbox1(
        label1: string,
        back?: boolean,
        checkbox1?: any,
        handleOnChange?: any
    ) {
        if (back) {
            this.backAddOn = true;
        } else {
            this.frontAddOn = true;
        }
        this.label1 = label1;
        this.handleOnCheckbox1Change = handleOnChange;
        this.isChecked1 = checkbox1;
        return this;
    }

    setAddOnCheckbox2(
        label2: string,
        back?: boolean,
        checkbox2?: any,
        handleOnChange?: any,
        questionData?: any // added this question,
    ) {
        if (back) {
            this.backAddOn = true;
        } else {
            this.frontAddOn = true;
        }
        this.label2 = label2;
        this.handleOnCheckbox2Change = handleOnChange;
        this.isChecked2 = checkbox2;
        this.addQuestionData = questionData; // added this question
        return this;
    }

    setAddOnIcon(icon?: any, back?: boolean, action?: any, oneIcon?: boolean) {
        if (back) {
            this.backAddOn = true;
        } else {
            this.frontAddOn = true;
        }
        this.addOnIcon = icon;
        this.addOnAction = action;
        this.addOneIcon = oneIcon;
        return this;
    }

    setSecondAddOnIcon(icon?: any, back?: boolean, action?: any) {
        if (back) {
            this.backAddOn = true;
        } else {
            this.frontAddOn = true;
        }
        this.addOnIcon2 = icon;
        this.addOnAction2 = action;
        return this;
    }

    setLength(min: number | null, max: number | null) {
        if (min !== null) {
            this.min = min;
        }
        if (max !== null) {
            this.max = max;
        }
        return this;
    }

    setMinDate(min: any) {
        if (min) {
            this.minDate = min;
        }
        return this;
    }

    /**
     * It is used to pair 2 date elements to capture a date range
     * e.g. Start date can not be greater than EndDate date and vice versa
     * @param pairedWith : Id of the other element of the range
     * @param startOrEnd : provide "start" if it is the start of range , or provide "end" if it is the end of range
     * @returns
     */
    pairWith(pairedWith: string, startOrEnd: 'start' | 'end') {
        const pairWithField =
            pairedWith.indexOf('.') > 0 ? pairedWith.split('.')[1] : pairedWith;
        this.range = startOrEnd;
        this.siblingKey = pairWithField;
        return this;
    }

    setParent(parent: string) {
        this.parentKey = parent;
        return this;
    }

    setOnChange(handlerMethod: IInputEventHandler) {
        this.onChange = handlerMethod;
        return this;
    }

    setSuggestionUrl(url: string) {
        this.suggestionUrl = url;
        return this;
    }

    setDataMapper(mapper: (data?: any) => any) {
        this.dataMapper = mapper;
        return this;
    }

    setOnBlur(handlerMethod: IInputEventHandler) {
        this.onBlur = handlerMethod;
        return this;
    }

    setHeaderList(headerList: string[]) {
        this.headerList = headerList;
        return this;
    }

    setCsvData(csvData: any) {
        this.csvData = csvData;
        return this;
    }

    setOnFileChange(onFileChange: IFileEventHandler) {
        this.onFileChange = onFileChange;
        return this;
    }

    setCsvSchema(schema: yup.ObjectSchema<any, any>) {
        this.schema = schema;
        return this;
    }

    hideLabel(placeHolder?: string) {
        this.placeholder = placeHolder || this.placeholder || this.name;
        this.noLabel = true;
        return this;
    }

    setPlaceHolder(placeHolder?: string) {
        this.placeholder = placeHolder || this.placeholder || this.name;
        return this;
    }

    setValue(value?: string) {
        this.value = value || this.value || this.name;
        return this;
    }

    hideError() {
        this.noError = true;
        return this;
    }

    setSelectedSuggestion(
        selectedSuggestion: (() => ISuggestions) | ISuggestions | undefined
    ) {
        this.selectedSuggestion = selectedSuggestion;
        return this;
    }
}

export default FormField;
