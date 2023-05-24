export default interface IFilter {
    id?: number;
    key: string;
    value?: string | null;
    values?: string[];
    operator: IFilterOperator;
}

export type IFilterOperator =
    | '=='
    | 'eq'
    | '>'
    | '>='
    | '<'
    | '<='
    | '='
    | '*='
    | 'in';
