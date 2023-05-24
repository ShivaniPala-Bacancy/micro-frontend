import React, {useEffect, useState} from 'react';
import {FaRegEdit, FaRegPlusSquare, FaTrashAlt} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';
import '../loader.css';
import './box.css';
import ClooseLite from './closeLite.svg';
import MaximizeLite from './maximizeLite.svg';
import MinimizeDark from './minimizeDark.svg';
import MinimizeLite from './minimizeLite.svg';

interface BoxTool {
    icon: 'add' | 'update' | 'delete';
    onClick?: () => void;
}
interface BoxProps {
    id: string;
    title: string;
    border?: boolean;
    dark?: boolean;
    loading?: boolean;
    closable?: boolean;
    nopadding?: boolean;
    onClose?: () => void;
    minimizable?: boolean;
    size?: 'full' | 'half' | 'quarter' | 'three-fourth';
    tools?: Array<BoxTool>;
    withFooter?: boolean;
    footerLeftContent?: JSX.Element;
    footerCenterContent?: JSX.Element;
    footerRightContent?: JSX.Element;
}

/**
 * Primary UI component for user interaction
 */
const Box: React.FC<BoxProps> = (props) => {
    const {
        dark = false,
        loading = false,
        closable = false,
        minimizable = false,
        nopadding = false,
        size = 'full',
        title = 'Please provide title!',
        tools,
        onClose,
        withFooter = false,
        footerLeftContent,
        footerCenterContent,
        footerRightContent,
        children
    } = props;
    const [t] = useTranslation();
    const [minimized, setMinimized] = useState(false);
    const [toolIcons, setToolIcons] = useState<JSX.Element[] | undefined>([]);

    const createToolIcons = (): Array<JSX.Element> => {
        return (
            tools?.map((tool) => {
                switch (tool.icon) {
                    case 'add':
                        return (
                            <FaRegPlusSquare
                                key="add"
                                size="20px"
                                onClick={tool.onClick}
                            />
                        );
                    case 'update':
                        return (
                            <FaRegEdit
                                key="edit"
                                size="20px"
                                onClick={tool.onClick}
                            />
                        );
                    case 'delete':
                        return (
                            <FaTrashAlt
                                key="delete"
                                size="20px"
                                onClick={tool.onClick}
                            />
                        );
                    default:
                        return <></>;
                }
            }) || []
        );
    };

    useEffect(() => {
        setToolIcons(createToolIcons());
    }, [tools]);

    const mode = dark ? 'box-header-dark' : 'box-header-light';

    const restoreWindow = () => {
        setMinimized(false);
        setToolIcons([...createToolIcons()]);
    };

    const minimizeWindow = () => {
        setMinimized(true);
        setToolIcons([]);
    };

    const closeWindow = () => {
        onClose && onClose();
    };

    const closeIcon = () => {
        return (
            closable &&
            !minimized && (
                <i onClick={closeWindow}>
                    <ClooseLite />
                </i>
            )
        );
    };
    const minMaxIcon = () => {
        if (!minimizable) return <></>;
        if (minimized)
            return (
                <i onClick={restoreWindow}>
                    <MaximizeLite />
                </i>
            );
        return dark ? (
            <i onClick={minimizeWindow}>
                <MinimizeDark />
            </i>
        ) : (
            <i onClick={minimizeWindow}>
                <MinimizeLite />
            </i>
        );
    };

    return (
        <div className="container1">
            <div
                className={[
                    'box',
                    `box--${minimized ? 'minimized' : size}`,
                    `box--${!minimized ? 'maximized' : ''}`,
                    `box--${loading ? 'loading' : ''}`
                ].join(' ')}
            >
                <div className={['box-header', mode].join(' ')}>
                    <div className="box-title">
                        <button type="button">{title && `${t(title)}`}</button>
                    </div>
                    <div className="box-tools">
                        {toolIcons}
                        {minimizable || closable ? (
                            <div className="divider" />
                        ) : (
                            <></>
                        )}
                        {minMaxIcon()}
                        {closeIcon()}
                    </div>
                </div>
                {loading && <div className="loader" />}
                <div
                    className={[
                        'box-body',
                        `box-body--${nopadding ? 'nopadding' : ''}`
                    ].join(' ')}
                >
                    {children}
                </div>
                {withFooter && (
                    <div className={['box-footer', mode].join(' ')}>
                        <div className="box-footer-content box-footer-left">
                            {footerLeftContent}
                        </div>
                        <div className="box-footer-content box-footer-center">
                            {footerCenterContent}
                        </div>
                        <div className="box-footer-content box-footer-right">
                            {footerRightContent}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Box;
