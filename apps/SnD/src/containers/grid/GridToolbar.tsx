import {IconProp} from '@fortawesome/fontawesome-svg-core';
import React, {memo} from 'react';
import {Col} from 'react-bootstrap';
import {IGridToolbar} from 'src/types/IGrid';

const GridToolbar = (props: IGridToolbar) => {
    const {id, actions} = props;

    const toolbarButton = (
        icon: IconProp,
        handler?: any,
        enabled: boolean = false,
        text?: string
    ) => {
        return (
            <button
                key={`${id}-grid-${icon}-btn`}
                type="button"
                data-testid={`${id}-grid-${icon}-btn`}
                id={`${id}-grid-${icon}-btn`}
                className="clickable btn btn-default font-weight-bold"
                disabled={!enabled}
                onClick={handler}
            >
                {text ? <i>{text}</i> : <i className={`fas fa-${icon}`} />}
            </button>
        );
    };

    return (
        <Col xs={12} className="text-right" style={{paddingRight: 0}}>
            {actions.map((action) =>
                toolbarButton(
                    action.icon,
                    action.handler,
                    action.enabled,
                    action.text
                )
            )}
        </Col>
    );
};

export default memo(GridToolbar);
