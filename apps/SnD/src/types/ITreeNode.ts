import {LanguageShape, IconsShape} from './nodeShape';

interface ITreeNode {
    checked: number;
    disabled: boolean;
    expandDisabled: boolean;
    expanded: boolean;
    icons: IconsShape;
    isLeaf: boolean;
    isParent: boolean;
    label: any;
    lang: LanguageShape;
    optimisticToggle: boolean;
    showNodeIcon: boolean;
    treeId: string;
    value: string | number;
    onCheck: (obj: any) => any | void;
    onExpand: (obj: any) => any;
    children: any;
    className: string;
    expandOnClick: boolean;
    icon: any;
    showCheckbox: boolean;
    title: string;
    onClick: (obj: any) => any | void;
}

export type {ITreeNode};
