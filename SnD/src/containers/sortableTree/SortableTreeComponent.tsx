import React from 'react';
import Tree from 'react-d3-tree';

export interface SortableTreeComponentProps {}

const SortableTreeComponent: React.FC<SortableTreeComponentProps> = () => {
    const orgChart = {
        name: 'CEO',
        children: [
            {
                name: 'Manager',
                attributes: {
                    department: 'Production'
                },
                children: [
                    {
                        name: 'Foreman',
                        attributes: {
                            department: 'Fabrication'
                        },
                        children: [
                            {
                                name: 'Worker'
                            }
                        ]
                    },
                    {
                        name: 'Foreman',
                        attributes: {
                            department: 'Assembly'
                        },
                        children: [
                            {
                                name: 'Worker'
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="treeWrapper" style={{width: '100%', height: '500px'}}>
            <Tree
                data={orgChart}
                orientation="vertical"
                zoomable={false}
                zoom={0.85}
                depthFactor={150}
                initialDepth={3}
                nodeSize={{x: 300, y: 300}}
                renderCustomNodeElement={(data: any) => {
                    return (
                        <>
                            <circle
                                r={10}
                                fill="baige"
                                onClick={data.toggleNode}
                            />
                            <foreignObject
                                width="250"
                                height="250"
                                onClick={data.toggleNode}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: 'rgb(248, 248, 255)',
                                        marginLeft: '10px'
                                    }}
                                >
                                    <div className="info-box mb-3">
                                        <span className="info-box-icon bg-info elevation-1">
                                            <i className="fas fa-thumbs-up" />
                                        </span>

                                        <div className="info-box-content">
                                            <span className="info-box-text">
                                                Likes
                                            </span>
                                            <span className="info-box-number">
                                                41,410
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </foreignObject>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default SortableTreeComponent;
