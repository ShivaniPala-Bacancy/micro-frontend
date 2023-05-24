import React, {useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import IBox from '../types/IBox';

const Box = (props: IBox) => {
    const [t] = useTranslation();
    const splitIcon = (icon: any) => icon;

    const {
        icon,
        title,
        titleRight,
        collapsable,
        closable,
        noPadding,
        badge,
        toolIcon,
        customOptions,
        footerClass,
        textCenter,
        padding,
        bodyClassName,
        footer: footerContent,
        header: headerContent,
        children,
        id,
        onClose,
        withoutHeader,
        itemCount,
        onToolIconClick,
        size,
        loading,
        dark = false,
        subTitle,
        toolIcon1,
        onToolIcon1Click,
        toolIcon2,
        onToolIcon2Click
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
        if (onToolIcon1Click) onToolIcon2Click();
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
    const hasFooter = !!footerContent;
    const hasHeaderContent = !!headerContent;
    const hasIcon = !!icon;
    const hasTitle = title !== ' ';
    const hasHeader =
        !withoutHeader &&
        (hasHeaderContent ||
            hasIcon ||
            hasTitle ||
            collapsable ||
            closable ||
            badge ||
            customOptions);

    const bodyClass = [
        'card-body',
        noPadding ? 'no-padding' : '',
        textCenter ? 'text-center' : '',
        padding ? 'pad' : '',
        bodyClassName
    ]
        .filter((p) => p)
        .join(' ');
    const minimized = false;
    const mode = dark ? 'box-header-dark' : 'box-header-light';
    const joinedClassName = ['card', collapsed ? ' collapsed-card' : ''].join(
        ' '
    );

    const renderHeader = () => {
        if (!hasHeader) {
            return '';
        }
        return (
            <div className={['box-header', mode].join(' ')}>
                <div className="box-title" style={{color: '#1ea7fd'}}>
                    <button type="button">{title && `${t(title)}`}</button>
                    {subTitle && (
                        <span
                            style={{
                                display: 'inline-block',
                                marginTop: '8px',
                                // marginLeft: '44vw',
                                color: 'black'
                            }}
                        >
                            <b>({subTitle})</b>
                        </span>
                    )}
                </div>
                {hasHeaderContent && headerContent}
                <div
                    className={`card-tools${
                        titleRight ? ' float-left' : ' float-right'
                    }`}
                >
                    {badge}
                    {collapsable && (
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
                    )}
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
            </div>
        );
    };

    return (
        <div id={id} className={joinedClassName} style={{boxShadow: 'none'}}>
            <div
                className={[
                    'box',
                    `box--${minimized ? 'minimized' : size}`,
                    `box--${!minimized ? 'maximized' : ''}`,
                    `box--${loading ? 'loading' : ''}`
                ].join(' ')}
            >
                {renderHeader()}
                {loading && <div className="loader" />}

                <div className={bodyClass}>{children}</div>
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
        </div>
    );
};

export default Box;
