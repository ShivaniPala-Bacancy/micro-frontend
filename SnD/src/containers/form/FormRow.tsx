import React, {FC, useMemo} from 'react';
import {Row} from 'react-bootstrap';
import {
    Control,
    FieldErrors,
    FieldNamesMarkedBoolean,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from 'react-hook-form';
import ICol from '../../types/ICol';
import FormColumn from './FormColumn';

interface IFromRow {
    columns: ICol[];
    fixedColumnSize: number;
    errors: FieldErrors;
    register: UseFormRegister<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    control: Control<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    dirtyFields: FieldNamesMarkedBoolean<FieldValues>;
    isSubmitted: boolean;
    formType: 'stacked' | 'inline' | 'horizontal' | 'semi-stacked' | 'custom';
    parentState?: any;
    parentDispatch?: any;
    childSetStateGetter?: (data: any) => void;
}
const FormRow: FC<IFromRow> = (props) => {
    const {
        columns,
        errors,
        register,
        getValues,
        setValue,
        control,
        fixedColumnSize,
        formType,
        parentDispatch,
        childSetStateGetter
    } = props;
    const createColumn = (col: ICol): JSX.Element => {
        let colError: any = '';
        if (errors && errors[col.id]) {
            colError = errors[col.id]?.message;
        }
        let orientation: 'stacked' | 'inline' | 'custom' = 'inline';
        let {size} = col;
        switch (formType) {
            case 'stacked':
            case 'custom':
                orientation = 'stacked';
                size = size || 12; // Stacked form can have only 1 column
                break;
            case 'inline':
            case 'semi-stacked':
                orientation = 'custom';
                size = size || fixedColumnSize;
                break;
            case 'horizontal':
                size = size || fixedColumnSize;
                break;
        }
        return (
            <FormColumn
                col={col}
                error={colError}
                orientation={orientation}
                columnSize={size}
                register={register}
                getValues={getValues}
                setValue={setValue}
                control={control}
                key={`formColumn-${col.id}`}
                parentState={props.parentState}
                parentDispatch={parentDispatch}
                childSetStateGetter={childSetStateGetter}
            />
        );
    };

    const columnComponents = useMemo(() => {
        return columns.map(createColumn);
    }, [columns, errors]);

    return formType === 'inline' ? (
        <>{columnComponents}</>
    ) : (
        <Row key={`row-${columns[0].id}`}>{columnComponents}</Row>
    );
};

export default FormRow;
