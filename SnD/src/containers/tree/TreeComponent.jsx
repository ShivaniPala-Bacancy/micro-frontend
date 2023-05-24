import React from 'react';
import {useTranslation} from 'react-i18next';
import CheckboxTree from './checkboxTree/CheckboxTree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

export default function TreeComponent(props) {
    const {data, selectedMenus, onMenuSelect, expanded, onExpand, onClick} =
        props;
    const [t] = useTranslation();
    const createTreeNode = (node) => {
        const {name, id, disabled, children, icon} = node;
        const nodeData = {
            label: t(name),
            value: id || 'rootItem',
            disabled,
            showCheckbox: !disabled,
            children: createChildNodes(children)
        };
        if (nodeData.value === 'rootItem') {
            nodeData.showCheckbox = false;
        }
        if (icon) {
            nodeData.icon = icon;
        }
        return nodeData;
    };
    const createChildNodes = (children) => {
        if (!children || children.length <= 0) return null;
        return children.map((child) => createTreeNode(child));
    };
    const renderTree = () => {
        if (!data) return <></>;
        return (
            <CheckboxTree
                checked={selectedMenus}
                onCheck={onMenuSelect}
                expanded={expanded}
                onExpand={onExpand}
                optimisticToggle={false}
                noCascade
                iconsClass="fa5"
                nodes={[createTreeNode(data)]}
                onClick={onClick}
            />
        );
    };

    return renderTree();
}
