import React from 'react';

/* eslint-disable react/no-array-index-key,react/button-has-type,no-underscore-dangle */
const MixedNodeElement = (props: any) => {
    const {nodeData = {}, triggerNodeToggle, foreignObjectProps = {}} = props;
    return (
        <>
            <circle r={20} />
            <foreignObject {...foreignObjectProps}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid black',
                        paddingBottom: '1rem',
                        backgroundColor: 'rgb(248, 248, 255)' // ghostwhite
                    }}
                >
                    <h3>{nodeData.name}</h3>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {nodeData.attributes &&
                            Object.keys(nodeData.attributes).map(
                                (labelKey, i) => (
                                    <li key={`${labelKey}-${i}`}>
                                        {labelKey}:{' '}
                                        {nodeData.attributes[labelKey]}
                                    </li>
                                )
                            )}
                    </ul>
                    {nodeData.children && (
                        <button
                            style={{textAlign: 'center'}}
                            onClick={triggerNodeToggle}
                        >
                            {nodeData.__rd3t.collapsed
                                ? '⬅️ ➡️ Expand'
                                : '➡️ ⬅️ Collapse'}
                        </button>
                    )}
                </div>
            </foreignObject>
        </>
    );
};

export default MixedNodeElement;
