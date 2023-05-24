import React from 'react';
import * as icons from 'react-icons/fa';

const IconComponent = (props) => {
    const {iconName} = props;
    const Icon = icons[iconName];
    return Icon ? <Icon /> : <></>;
};

export default IconComponent;
