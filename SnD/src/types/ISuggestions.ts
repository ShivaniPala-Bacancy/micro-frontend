interface ISuggestions {
    text: any;
    value: any;
    parent?: string;
    other?: any;
    disable?: boolean;
    label?: string;
    labelKey?: string;
    key?: string;
    sourceType?: string;
    targetType?: string;
}
interface ISuggestionsFunction {
    (
        key: string,
        term?: string,
        callBack?: (data: Array<ISuggestions>) => void
    ): Array<ISuggestions>;
}

export type { ISuggestions, ISuggestionsFunction };
