import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { GridApi } from 'ag-grid-community';
import React from 'react';

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
interface HeaderComponentPropType {
    action: string;
    handler: any;
    bulkHandler: any;
    data: any;
    rowIndex: number;
    eGridHeader: any;
    api: GridApi;
}
interface HeaderComponentState { }
export default class GridHeaderComponent extends React.Component<
    HeaderComponentPropType,
    HeaderComponentState
> {
    getFaIcon(iconName: IconProp, iconColor: string) {
        const { handler, bulkHandler, data, eGridHeader, api } = this.props;
        return (
            <span
                className="clickable"
                style={{ color: iconColor }}
                onClick={() => {
                    if (eGridHeader && bulkHandler) {
                        bulkHandler(api && api.getSelectedRows());
                    } else if (!eGridHeader && handler) handler(data);
                }}
            >
                <i className={`fas fa-${iconName}`} />
            </span>
        );
    }

    getIcon() {
        const { action, data } = this.props;
        if (data && data.footer) return <></>;
        switch (action) {
            case 'edit':
                return this.getFaIcon('edit', 'orange');
            case 'delete':
                return this.getFaIcon('trash', 'maroon');
            case 'download':
                return this.getFaIcon('download', '#007bff');
            case 'view':
                return this.getFaIcon('bars', 'blue');
            case 'undo':
                return this.getFaIcon('undo-alt', '#7a7a52');
            case 'accept':
                return this.getFaIcon('check', 'green');
            case 'reject':
                return this.getFaIcon('ban', 'red');
            case 'comment':
                return this.getFaIcon('comment', 'blue');
            case 'plus':
                return this.getFaIcon('plus', 'green');
            case 'minus':
                return this.getFaIcon('minus', 'red');
            case 'arrow-up':
                return this.getFaIcon('arrow-up', 'blue');
            case 'arrow-right':
                return this.getFaIcon('arrow-right', '#7a7a52');
            case 'arrow-left':
                return this.getFaIcon('arrow-left', '#7a7a52');
            case 'arrow-down':
                return this.getFaIcon('arrow-down', 'blue');
            case 'check':
            default:
                return <></>;
        }
    }

    render() {
        return <div>{this.getIcon()}</div>;
    }
}
