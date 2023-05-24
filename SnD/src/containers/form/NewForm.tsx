import React, { FC, memo, useCallback, useMemo, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { INewFormProps } from 'src/types/IForm';
import useYup from '../../common/SchemaFactory';
import { arrayToChunks } from '../../common/Util';
import Button from '../../components/button/Button';
import FormRow from './FormRow';

/* eslint-disable  no-param-reassign, no-shadow,indent, object-shorthand,no-undef-init */

const FORM: FC<INewFormProps> = (props) => {
    const [t] = useTranslation();
    const {
        id,
        type = 'stacked',
        fields,
        numberOfColumns = 1,
        defaultValues,
        btnLeft,
        showButtons = true,
        submitButtonText = 'containers.form.submitBtnText',
        resetButtonText = 'containers.form.resetBtnText',
        submitDisabled = false,
        submitHidden = false,
        resetHidden = false,
        children,
        waiting = false,
        formClassName,
        onValid,
        onInvalid,
        parentDispatch,
        getResetForm,
        nameButton,
        customButton,
        singleFieldDefault,
        onChange
    } = props;
    const useYupValidationResolver = (validationSchema: any) =>
        useCallback(
            async (data) => {
                try {
                    const values = await validationSchema.validate(data, {
                        abortEarly: false
                    });
                    return {
                        values,
                        errors: {}
                    };
                } catch (errors: any) {
                    return {
                        values: {},
                        errors: errors.inner.reduce(
                            (allErrors: any, currentError: any) => ({
                                ...allErrors,
                                [currentError.path]: {
                                    type: currentError.type ?? 'validation',
                                    message: currentError.message
                                }
                            }),
                            {}
                        )
                    };
                }
            },
            [validationSchema]
        );
    const schema = useYup(fields);
    const resolver = useYupValidationResolver(schema);

    useEffect(() => {
        if (singleFieldDefault && singleFieldDefault?.key) {
            setValue(singleFieldDefault?.key, singleFieldDefault?.value);
        }
    }, [singleFieldDefault]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors, dirtyFields, isSubmitted },
        clearErrors
    } = useForm<any>({
        resolver,
        defaultValues: defaultValues || {},
        shouldFocusError: true
    });

    let localFormClass = '';
    let isInline = false;
    switch (type) {
        case 'inline':
            localFormClass = `form-inline ${formClassName}`;
            isInline = true;
            break;
        case 'semi-stacked':
        case 'horizontal':
        case 'stacked':
        default:
            localFormClass = `${formClassName}`;
            break;
    }
    let childStateSetter: any = undefined;
    const childSetStateGetter = (func: any) => {
        childStateSetter = func;
    };

    const resetForm = () => {
        clearErrors();
        reset(
            {},
            {
                keepErrors: true, // errors will not be reset
                keepDirty: true,
                keepSubmitCount: false,
                keepTouched: false,
                keepIsValid: false
            }
        );
        if (childStateSetter) {
            childStateSetter('Delete');
        }
    };

    const handleOnValid = () => {
        const promise: Promise<boolean> = onValid(getValues(), dirtyFields);
        if (promise) {
            promise.then((resetFlag) => {
                if (resetFlag) resetForm();
            });
        }
    };
    const handleOnInvalid = (data: any) => {
        if (onInvalid) onInvalid(data);
    };
    const submitButton = () => {
        if (!showButtons || submitHidden) return <></>;
        return (
            <Button
                type="submit"
                icon=""
                theme="success"
                isLoading={waiting}
                disabled={waiting || submitDisabled}
            >
                {nameButton || t(`${submitButtonText}`)}
            </Button>
        );
    };

    const resetButton = () => {
        if (!showButtons || resetHidden) return <></>;
        return (
            <Button
                type="reset"
                icon=""
                theme="default"
                onClick={resetForm}
                isLoading={waiting}
                disabled={waiting}
            >
                {t(`${resetButtonText}`)}
            </Button>
        );
    };

    const rows = useMemo(() => {
        return arrayToChunks(fields, type === 'stacked' ? 1 : numberOfColumns);
    }, [fields, numberOfColumns, errors]);

    const fieldRows = useMemo(() => {
        return rows.map((columns) => (
            <FormRow
                key={`${id}-row-${columns[0].id}`}
                fixedColumnSize={12 / rows.length}
                columns={columns}
                errors={errors}
                control={control}
                dirtyFields={dirtyFields}
                register={register}
                getValues={getValues}
                setValue={setValue}
                formType={type}
                watch={watch}
                isSubmitted={isSubmitted}
                parentState={props.parentState}
                parentDispatch={parentDispatch}
                childSetStateGetter={childSetStateGetter}
            />
        ));
    }, [fields, numberOfColumns, errors]);

    const submitCustomButton = () => {
        return (
            <>
                <Button
                    type="submit"
                    icon="plus"
                    isLoading={waiting}
                    disabled={waiting}
                    style={{
                        width: '100%',
                        height: '80%',
                        fontWeight: 'bold',
                        color: '#525252',
                        background: '#ced4da',
                        padding: '6px 12px',
                        borderColor: '#C5C5C5'
                    }}
                >
                    <i className="fa fa-plus" />
                </Button>
            </>
        );
    };
    const formButtons = useMemo(() => {
        if (!showButtons) return <></>;
        if (isInline) {
            if (customButton) {
                return (
                    <Row key="row-buttons" className="">
                        {submitCustomButton()}
                    </Row>
                );
            }
            return (
                <>
                    {submitButton()}
                    {resetButton()}
                </>
            );
        }
        if (btnLeft) {
            return (
                <Row key="row-buttons" className="justify-content-start mt-2">
                    {submitButton()}
                    {resetButton()}
                </Row>
            );
        }

        return (
            <Row key="row-buttons" className="justify-content-center mt-2">
                {submitButton()}
                {resetButton()}
            </Row>
        );
    }, [showButtons, isInline, resetHidden, submitDisabled]);
    const formContent = useMemo(() => {
        if (getResetForm) {
            getResetForm(resetForm);
        }
        if (isInline) {
            return (
                <Row key="form-single-row">
                    {fieldRows}
                    {formButtons}
                    {children}
                </Row>
            );
        }

        return (
            <>
                {fieldRows}
                {formButtons}
                {children}
            </>
        );
    }, [fields, numberOfColumns, errors]);

    return (
        <form
            id={id}
            className={localFormClass}
            autoComplete="off"
            onSubmit={handleSubmit(handleOnValid, handleOnInvalid)}
            onChange={onChange}
        >
            <div className="container-fluid">{formContent}</div>
        </form>
    );
};

export default memo(FORM);
