import {NodeShape, IconsShape, LanguageShape} from './nodeShape';

interface ICheckboxTree {
    nodes: Array<NodeShape>;
    checkModel: string;
    checked: Array<any>;
    disabled?: boolean;
    expandDisabled: boolean;
    expandOnClick: boolean;
    expanded: Array<string> | Array<number>;
    icons: IconsShape;
    iconsClass?: string;
    id?: string;
    lang: LanguageShape;
    name?: string;
    nameAsArray?: boolean;
    nativeCheckboxes?: boolean;
    noCascade?: boolean;
    onlyLeafCheckboxes?: boolean;
    optimisticToggle: boolean;
    showExpandAll?: boolean;
    showNodeIcon: boolean;
    showNodeTitle?: boolean;
    onCheck: (obj: any, obj2?: any) => any | void;
    onClick: (obj: any, obj2?: any) => any | void;
    onExpand: (obj: any, obj2?: any) => any | void;
}

export type {ICheckboxTree};
