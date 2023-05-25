import React from 'react';
import ICol from 'src/types/ICol';
import FormField from './FormFieldDefinition';
import FormElementWrapper from './FormElementWrapper';

const TEXT = (props: any) => {
    const {id, name} = props;
    const colDef: ICol = new FormField(id, name);
    return <FormElementWrapper col={colDef} />;
};

const TEXT_REQUIRED = (props: any) => {
    const {id, name} = props;
    const colDef: ICol = new FormField(id, name).setRequired(true);
    return <FormElementWrapper col={colDef} />;
};

const TEXT_DISABLED = (props: any) => {
    const {id, name} = props;
    const colDef: ICol = new FormField(id, name).setDisabled(true);
    return <FormElementWrapper col={colDef} />;
};

export {TEXT, TEXT_REQUIRED, TEXT_DISABLED};
