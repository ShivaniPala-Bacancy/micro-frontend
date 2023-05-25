import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu';
import CheckboxTree from './checkboxTree/CheckboxTree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Tooltip from '../../pages/productCatalog/ProductOfferingResource/Tooltip';
import './menuTreeIcon.css';
import { toast } from 'react-toastify';

/* eslint-disable indent,no-else-return */
export default function TreeComponent(props: any) {
    const {
        data,
        selectedMenus,
        onMenuSelect,
        expanded,
        onExpand,
        onClick,
        menuItem1,
        menuItem2,
        menuItem3,
        menuItem4,
        menuItem5,
        menuItem6,
        allRecord
    } = props;

    const [t] = useTranslation();

    const eyeView = (node: any) => {
        return <Tooltip node={node} data={allRecord} />;
    };

    const getMenuItem = (node: any) => {
        let menuItem: any;

        if (node.role == 'category') menuItem = menuItem5;
        else if (node.role == 'categoryRef') menuItem = <></>;
        else if (node.id == 'priceHome') menuItem = menuItem1;
        else if (node.role == 'popRelationship' && !(node.name.includes("Default Tax - POP")) && !(node.name.includes("Default Discount - POP"))) menuItem = menuItem3;
        else if ((node.role == 'offeringPrice') && !(node.name.includes("Default Price - basePrice"))) menuItem = menuItem2;
        else if (node.role == 'constraint') menuItem = menuItem4;
        else if (node.id == 'root') menuItem = menuItem4;
        else if (node.role == 'Parent') menuItem = menuItem2;
        else if (node.role == 'Edit') menuItem = menuItem1;
        else if (node.role == 'Child') menuItem = menuItem3;
        else if (node.role == 'subCategoryRef') menuItem = menuItem6;
        else if (node.role == 'specification') menuItem = menuItem1;
        else if (node.role == 'prodCharValue') menuItem = menuItem6;
        else if (node.role == 'char') menuItem = menuItem5;
        return menuItem;
    };

    const createTreeNode = (node: any) => {
        let menuItem: any;
        if (node.id == 'root1') menuItem = menuItem1;
        else if (node.role == 'catalog') menuItem = menuItem2;
        else if (node.role == 'sub-category') menuItem = menuItem3;
        else if (node.id == 'root2') menuItem = menuItem4;
        else {
            menuItem = getMenuItem(node);
        }

        const { name, id, disabled, children, parentId } = node;
        const nodeData = {
            label: (
                <div className="coupon">
                    <Row>
                        {node.role == 'offeringPrice' && eyeView(node)}
                        <Col>
                            {node.role == 'popRelationship' && (
                                <div className="pop">
                                    <ContextMenuTrigger
                                        id={id}
                                        attributes={parentId}
                                        collect={(props1) => props1}
                                    >
                                        {t(name)}
                                    </ContextMenuTrigger>
                                </div>
                            )}

                            {node.role == 'constraint' && (
                                <div className="constraint">
                                    <ContextMenuTrigger
                                        id={id}
                                        attributes={parentId}
                                        collect={(props1) => props1}
                                    >
                                        {t(name)}
                                    </ContextMenuTrigger>
                                </div>
                            )}

                            {node.role != 'popRelationship' &&
                                node.role != 'constraint' && (
                                    <ContextMenuTrigger
                                        id={id}
                                        attributes={parentId}
                                        collect={(props1) => props1}
                                    >
                                        {t(name)}
                                    </ContextMenuTrigger>
                                )}

                            <ContextMenu id={id} className="menu">
                                {menuItem}
                            </ContextMenu>
                        </Col>
                    </Row>
                </div>
            ),
            value: id || 'rootItem',
            disabled,
            showCheckbox: !disabled,
            children: createChildNodes(children)
        };
        if (
            node.id == 'priceHome' ||
            node.role == 'popRelationship' ||
            node.role == 'offeringPrice' ||
            node.role == 'constraint' ||
            node.id == 'root' ||
            node.role == 'Edit' ||
            node.role == 'Child' ||
            node.role == 'Parent' ||
            node.role == 'prodCharValue' ||
            node.role == 'char' ||
            node.id == 'specificationRoot' ||
            node.id == 'root1' ||
            node.id == 'root2'
        ) {
            nodeData.showCheckbox = false;
        }

        return nodeData;
    };
    const createChildNodes = (children: any) => {
        if (!children || children.length <= 0) return null;
        return children.map((child: any) => createTreeNode(child));
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
