import React from 'react';
import * as icons from 'react-icons/fa';

/* eslint-disable dot-notation */
const IconRenderer = (props) => {
    const {data, column} = props;
    const {colId} = column;
    const MenuIcon = icons[data[colId]];
    return <MenuIcon />;
};

export default IconRenderer;
