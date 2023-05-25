import isEqual from 'lodash/isEqual';
import React from 'react';

import Button from './Button';
import constants from './constants';
import NodeModel from './NodeModel';
import TreeNode from './TreeNode';

const defaultProps = {
    checkModel: constants.CheckModel.LEAF,
    checked: [],
    disabled: false,
    expandDisabled: false,
    expandOnClick: false,
    expanded: [],
    icons: {
        check: <span className="rct-icon rct-icon-check" />,
        uncheck: <span className="rct-icon rct-icon-uncheck" />,
        halfCheck: <span className="rct-icon rct-icon-half-check" />,
        expandClose: <span className="rct-icon rct-icon-expand-close" />,
        expandOpen: <span className="rct-icon rct-icon-expand-open" />,
        expandAll: <span className="rct-icon rct-icon-expand-all" />,
        collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
        parentClose: <span className="rct-icon rct-icon-parent-close" />,
        parentOpen: <span className="rct-icon rct-icon-parent-open" />,
        leaf: <span className="rct-icon rct-icon-leaf" />
    },
    iconsClass: 'fa4',
    id: null,
    lang: {
        collapseAll: 'Collapse all',
        expandAll: 'Expand all',
        toggle: 'Toggle'
    },
    name: undefined,
    nameAsArray: false,
    nativeCheckboxes: false,
    noCascade: false,
    onlyLeafCheckboxes: false,
    optimisticToggle: true,
    showExpandAll: false,
    showNodeIcon: true,
    showNodeTitle: false,
    onCheck: () => {},
    onClick: null,
    onExpand: () => {}
};

class CheckboxTree extends React.Component {
    constructor(props) {
        super(props);

        const model = new NodeModel(props);
        model.flattenNodes(props.nodes);
        model.deserializeLists({
            checked: props.checked,
            expanded: props.expanded
        });

        this.state = {
            id: props.id || `random`,
            model,
            prevProps: props
        };

        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onNodeClick = this.onNodeClick.bind(this);
        this.onExpandAll = this.onExpandAll.bind(this);
        this.onCollapseAll = this.onCollapseAll.bind(this);
    }

    // eslint-disable-next-line react/sort-comp
    static getDerivedStateFromProps(newProps, prevState) {
        const {model, prevProps} = prevState;
        const {disabled, id, nodes} = newProps;
        let newState = {...prevState, prevProps: newProps};

        // Apply new properties to model
        model.setProps(newProps);

        // Since flattening nodes is an expensive task, only update when there is a node change
        if (
            !isEqual(prevProps.nodes, nodes) ||
            prevProps.disabled !== disabled
        ) {
            model.flattenNodes(nodes);
        }

        if (id !== null) {
            newState = {...newState, id};
        }

        model.deserializeLists({
            checked: newProps.checked,
            expanded: newProps.expanded
        });

        return newState;
    }

    onCheck(nodeInfo) {
        const {checkModel, noCascade, onCheck} = this.props;
        let {model} = this.state;
        model = model.clone();
        const node = model.getNode(nodeInfo.value);

        model.toggleChecked(nodeInfo, nodeInfo.checked, checkModel, noCascade);
        onCheck(
            model.serializeList('checked'),
            {...node, ...nodeInfo},
            nodeInfo.checked
        );
    }

    onExpand(nodeInfo) {
        const {onExpand} = this.props;
        let {model} = this.state;
        model = model.clone();
        const node = model.getNode(nodeInfo.value);

        model.toggleNode(nodeInfo.value, 'expanded', nodeInfo.expanded);
        onExpand(model.serializeList('expanded'), {...node, ...nodeInfo});
    }

    onNodeClick(nodeInfo) {
        const {onClick} = this.props;
        const {model} = this.state;
        const node = model.getNode(nodeInfo.value);

        onClick({...node, ...nodeInfo});
    }

    onExpandAll() {
        this.expandAllNodes();
    }

    onCollapseAll() {
        this.expandAllNodes(false);
    }

    expandAllNodes(expand = true) {
        const {onExpand} = this.props;
        let {model} = this.state;
        model = model.clone();
        onExpand(
            model.clone().expandAllNodes(expand).serializeList('expanded')
        );
    }

    determineShallowCheckState(node, noCascade) {
        let {model} = this.state;
        model = model.clone();
        const flatNode = model.getNode(node.value);

        if (flatNode.isLeaf || noCascade) {
            return flatNode.checked ? 1 : 0;
        }

        if (this.isEveryChildChecked(node)) {
            return 1;
        }

        if (this.isSomeChildChecked(node)) {
            return 2;
        }

        return 0;
    }

    isEveryChildChecked(node) {
        let {model} = this.state;
        model = model.clone();
        return node.children.every(
            (child) => model.getNode(child.value).checkState === 1
        );
    }

    isSomeChildChecked(node) {
        let {model} = this.state;
        model = model.clone();
        return node.children.some(
            (child) => model.getNode(child.value).checkState > 0
        );
    }

    renderTreeNodes(nodes, parent = {}) {
        const {
            expandDisabled,
            expandOnClick,
            icons,
            lang,
            noCascade,
            onClick,
            onlyLeafCheckboxes,
            optimisticToggle,
            showNodeTitle,
            showNodeIcon
        } = this.props;
        const {id, model} = this.state;
        const {icons: defaultIcons} = defaultProps;

        const treeNodes = nodes.map((node) => {
            const key = node.value;
            const flatNode = model.getNode(node.value);
            const children = flatNode.isParent
                ? this.renderTreeNodes(node.children, node)
                : null;

            // Determine the check state after all children check states have been determined
            // This is done during rendering as to avoid an additional loop during the
            // deserialization of the `checked` property
            flatNode.checkState = this.determineShallowCheckState(
                node,
                noCascade
            );

            // Show checkbox only if this is a leaf node or showCheckbox is true
            const showCheckbox = onlyLeafCheckboxes
                ? flatNode.isLeaf
                : flatNode.showCheckbox;

            // Render only if parent is expanded or if there is no root parent
            const parentExpanded = parent.value
                ? model.getNode(parent.value).expanded
                : true;

            if (!parentExpanded) {
                return null;
            }

            return (
                <TreeNode
                    key={key}
                    checked={flatNode.checkState}
                    className={node.className}
                    disabled={flatNode.disabled}
                    expandDisabled={expandDisabled}
                    expandOnClick={expandOnClick}
                    expanded={flatNode.expanded}
                    icon={node.icon}
                    icons={{...defaultIcons, ...icons}}
                    label={node.label}
                    lang={lang}
                    optimisticToggle={optimisticToggle}
                    isLeaf={flatNode.isLeaf}
                    isParent={flatNode.isParent}
                    showCheckbox={showCheckbox}
                    showNodeIcon={showNodeIcon}
                    title={
                        showNodeTitle ? node.title || node.label : node.title
                    }
                    treeId={id}
                    value={node.value}
                    onCheck={this.onCheck}
                    onClick={onClick && this.onNodeClick}
                    onExpand={this.onExpand}
                >
                    {children}
                </TreeNode>
            );
        });

        return <ol>{treeNodes}</ol>;
    }

    renderExpandAll() {
        const {
            // icons: {expandAll, collapseAll},
            lang,
            showExpandAll
        } = this.props;

        if (!showExpandAll) {
            return null;
        }

        const expandAll = 'Expand All';
        const collapseAll = 'Collapse All';
        return (
            <div className="rct-options">
                <Button
                    className="rct-option rct-option-expand-all"
                    title={lang.expandAll}
                    onClick={this.onExpandAll}
                >
                    {expandAll}
                </Button>
                <Button
                    className="rct-option rct-option-collapse-all"
                    title={lang.collapseAll}
                    onClick={this.onCollapseAll}
                >
                    {collapseAll}
                </Button>
            </div>
        );
    }

    renderHiddenInput() {
        const {name, nameAsArray} = this.props;

        if (name === undefined) {
            return null;
        }

        if (nameAsArray) {
            return this.renderArrayHiddenInput();
        }

        return this.renderJoinedHiddenInput();
    }

    renderArrayHiddenInput() {
        const {checked, name: inputName} = this.props;

        return checked.map((value) => {
            const name = `${inputName}[]`;

            return (
                <input key={value} name={name} type="hidden" value={value} />
            );
        });
    }

    renderJoinedHiddenInput() {
        const {checked, name} = this.props;
        const inputValue = checked.join(',');

        return <input name={name} type="hidden" value={inputValue} />;
    }

    render() {
        const {disabled, iconsClass, nodes, nativeCheckboxes} = this.props;
        const {id} = this.state;
        const treeNodes = this.renderTreeNodes(nodes);

        const className = `react-checkbox-tree ${
            disabled ? 'rct-disabled' : ''
        } rct-icons-${iconsClass} ${
            nativeCheckboxes ? 'rct-native-display' : ''
        }`;

        return (
            <div className={className} id={id}>
                {this.renderExpandAll()}
                {this.renderHiddenInput()}
                {treeNodes}
            </div>
        );
    }
}

export default CheckboxTree;
