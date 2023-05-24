import React, {useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import IBox from '../types/IBox';
import './BoxWithIcons.css';

const Box = (props: IBox) => {
    const [t] = useTranslation();
    const splitIcon = (icon: any) => icon;

    const {
        type,
        icon,
        title,
        titleRight,
        collapsable,
        closable,
        noPadding,
        badge,
        toolIcon,
        toolIcon1,
        toolIcon2,
        toolIcon3,
        toolIcon4,
        toolIcon5,
        customOptions,
        className,
        footerClass,
        solid,
        textCenter,
        padding,
        bodyClassName,
        border,
        style,
        footer: footerContent,
        header: headerContent,
        children,
        id,
        onClose,
        withoutHeader,
        itemCount,
        onToolIconClick,
        onToolIcon1Click,
        onToolIcon2Click,
        onToolIcon3Click,
        onToolIcon4Click,
        onToolIcon5Click
    } = props;

    const initialValue: any = false;
    const collapseReducer = (state: any) => {
        return !state;
    };
    const onToolIconClickFn = () => {
        if (onToolIconClick) onToolIconClick();
    };
    const onToolIcon1ClickFn = () => {
        if (onToolIcon1Click) onToolIcon1Click();
    };
    const onToolIcon2ClickFn = () => {
        if (onToolIcon2Click) onToolIcon2Click();
    };
    const onToolIcon3ClickFn = () => {
        if (onToolIcon3Click) onToolIcon3Click();
    };
    const onToolIcon4ClickFn = () => {
        if (onToolIcon4Click) onToolIcon4Click();
    };
    const onToolIcon5ClickFn = () => {
        if (onToolIcon5Click) onToolIcon5Click();
    };

    const closeReducer = (state: any) => {
        if (onClose) {
            onClose(state.payload);
        }
        return !state;
    };
    const [collapsed, dispatchCollapsed] = useReducer(
        collapseReducer,
        initialValue
    );
    const [, dispatchClosed] = useReducer(closeReducer, initialValue);
    const localToolIcon = splitIcon(toolIcon);
    const localToolIcon1 = splitIcon(toolIcon1);
    const localToolIcon2 = splitIcon(toolIcon2);
    const localToolIcon3 = splitIcon(toolIcon3);
    const localToolIcon4 = splitIcon(toolIcon4);
    const localToolIcon5 = splitIcon(toolIcon5);
    const hasFooter = !!footerContent;
    const hasHeaderContent = !!headerContent;
    const hasIcon = !!icon;
    const hasTitle = title !== ' ';
    const localIcon = hasIcon ? splitIcon(icon) : null;
    const hasHeader =
        !withoutHeader &&
        (hasHeaderContent ||
            hasIcon ||
            hasTitle ||
            collapsable ||
            closable ||
            badge ||
            customOptions);
    const joinedClassName = [
        'card',
        type ? `card-${type}` : '',
        border ? 'card-outline' : '',
        className || '',
        collapsed ? ' collapsed-card' : '',
        solid ? ' card-solid' : ''
    ].join(' ');

    const bodyClass = [
        'card-body',
        noPadding ? 'no-padding' : '',
        textCenter ? 'text-center' : '',
        padding ? 'pad' : '',
        bodyClassName
    ]
        .filter((p) => p)
        .join(' ');
    const headerClass = ['card-header'].filter((p) => p).join(' ');

    const renderheader = () => {
        if (hasHeader) {
            return getHeader();
        }
    };

    const getHeader = () => {
        return (
            <div className={headerClass}>
                <h3 className={`card-title${titleRight ? ' float-right' : ''}`}>
                    {hasIcon && <i className={`fas fa-${localIcon}`} />}
                    {title && ` ${t(title)}`}
                </h3>
                {hasHeaderContent && headerContent}
                {getHeaderIcons()}
            </div>
        );
    };

    const getHeaderIcons = () => {
        return (
            <div
                className={`card-tools${
                    titleRight ? ' float-left' : ' float-right'
                }`}
            >
                {badge}
                {collapsable && getClosable()}
                {customOptions}
                {localToolIcon && (
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-tool clickable"
                            onClick={onToolIconClickFn}
                        >
                            <i
                                className={`fas fa-${localToolIcon} fa-lg text-default`}
                            >
                                {itemCount && itemCount > 0 && (
                                    <span className="badge badge-success navbar-badge">
                                        {itemCount}
                                    </span>
                                )}
                            </i>
                        </button>
                    </div>
                )}
                {localToolIcon1 && (
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-tool clickable"
                            onClick={onToolIcon1ClickFn}
                        >
                            <i
                                className={`fas fa-${localToolIcon1} fa-lg text-default`}
                            >
                                {itemCount && itemCount > 0 && (
                                    <span className="badge badge-success navbar-badge">
                                        {itemCount}
                                    </span>
                                )}
                            </i>
                            <div className="btn-text">Add</div>
                        </button>
                    </div>
                )}
                {localToolIcon2 && (
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-tool clickable"
                            onClick={onToolIcon2ClickFn}
                        >
                            <i
                                className={`fas fa-${localToolIcon2} fa-lg text-default`}
                            >
                                {itemCount && itemCount > 0 && (
                                    <span className="badge badge-success navbar-badge">
                                        {itemCount}
                                    </span>
                                )}
                            </i>
                            <div className="btn-text">Edit</div>
                        </button>
                    </div>
                )}
                {localToolIcon3 && (
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-tool clickable"
                            onClick={onToolIcon3ClickFn}
                        >
                            <i
                                className={`fas fa-${localToolIcon3} fa-lg text-default`}
                            >
                                {itemCount && itemCount > 0 && (
                                    <span className="badge badge-success navbar-badge">
                                        {itemCount}
                                    </span>
                                )}
                            </i>
                            <div className="btn-text">Delete</div>
                        </button>
                    </div>
                )}
                {localToolIcon4 && (
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-tool clickable"
                            onClick={onToolIcon4ClickFn}
                        >
                            <i
                                className={`fas fa-${localToolIcon4} fa-lg text-default`}
                            >
                                {itemCount && itemCount > 0 && (
                                    <span className="badge badge-success navbar-badge">
                                        {itemCount}
                                    </span>
                                )}
                            </i>
                            <div className="btn-text">Mapping</div>
                        </button>
                    </div>
                )}
                {localToolIcon5 && (
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-tool clickable"
                            onClick={onToolIcon5ClickFn}
                        >
                            <i
                                className={`fas fa-${localToolIcon5} fa-lg text-default`}
                            >
                                {itemCount && itemCount > 0 && (
                                    <span className="badge badge-success navbar-badge">
                                        {itemCount}
                                    </span>
                                )}
                            </i>

                            <div className="btn-text">Delete Category</div>
                        </button>
                    </div>
                )}
                {closable && (
                    <button
                        key={`${id}-close-btn`}
                        id={`${id}-close-btn`}
                        type="button"
                        className="btn btn-tool"
                        data-widget="remove"
                        onClick={() => {
                            dispatchClosed();
                        }}
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        );
    };

    const getClosable = () => {
        return (
            <button
                key={`${id}-collapse-btn`}
                id={`${id}-collapse-btn`}
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                onClick={() => {
                    dispatchCollapsed();
                }}
            >
                {collapsed ? (
                    <i className="fas fa-plus" />
                ) : (
                    <i className="fas fa-minus" />
                )}
            </button>
        );
    };

    return (
        <div id={id} className={joinedClassName} style={style}>
            {renderheader()}
            <>
                <div className={bodyClass}>{children}</div>
            </>
            {hasFooter && (
                <div
                    className={`card-footer${
                        footerClass ? ` ${footerClass}` : ''
                    }`}
                >
                    {footerContent}
                </div>
            )}
        </div>
    );
};

export default Box;
