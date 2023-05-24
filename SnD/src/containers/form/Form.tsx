import React, {useEffect, memo, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {IFormProps} from '../../types/IForm';
import ICol from '../../types/ICol';
import FormElementWrapper from './FormElementWrapper';
import useYup from '../../common/SchemaFactory';
import Button from '../../components/button/Button';

const Form = (props: IFormProps) => {
    const [t] = useTranslation();
    const {
        currentObject,
        showButtons,
        hideReset,
        id,
        children,
        form,
        submitButtonText,
        resetButtonText,
        onValid,
        onInvalid,
        waiting,
        formClassName
    } = props;
    const {horizontal, userDefined} = form;
    const columns = form.numberOfColumns || 2;
    const [isFormLoading] = useState(waiting);
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
                        errors: errors?.inner?.reduce(
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
    const resolver = useYupValidationResolver(useYup(form.fields));
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        control,
        formState: {errors, dirtyFields, isSubmitted},
        clearErrors
    } = useForm<any>({
        resolver,
        defaultValues: form.defaultValues || {},
        shouldFocusError: true
    });
    useEffect(() => {
        reset(currentObject);
    }, [currentObject]);
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
    };

    // eslint-disable-next-line no-undef
    const createColumn = (col: ICol): JSX.Element => {
        let colError = null;
        if (errors && errors[col.id]) {
            colError = errors[col.id]?.message;
        }
        return (
            <FormElementWrapper
                key={col.key}
                col={col}
                key1={col.key1}
                register={register}
                setValue={setValue}
                control={control}
                getValues={getValues}
                watch={watch}
                currentObject={props.form.currentObject ?? getValues()}
                parentDispatch={props.parentDispatch}
                parentState={props.parentState}
                isErrorPresent={props.isErrorPresent}
                error={colError}
                columnSize={col.size || 12 / columns}
                touched={dirtyFields[col.id] && isSubmitted}
                horizontal={horizontal}
                userDefined={userDefined}
            />
        );
    };

    const fields = [];
    for (let i = 0; i < form.fields.length; i += columns) {
        const sliced = form.fields.slice(i, i + columns);
        fields.push(
            <Row key={`rowNum-${i}`} className="mt-2">
                {sliced.map(createColumn)}
            </Row>
        );
    }
    if (showButtons) {
        fields.push(
            <Row key="rowNum-99" className="justify-content-center mt-2">
                <Button
                    type="submit"
                    icon=""
                    theme="success"
                    isLoading={isFormLoading}
                    disabled={isFormLoading}
                >
                    {t(`${submitButtonText}`)}
                </Button>
                {!hideReset ? (
                    <Button
                        type="reset"
                        icon=""
                        theme="default"
                        onClick={resetForm}
                        isLoading={isFormLoading}
                        disabled={isFormLoading}
                    >
                        {t(`${resetButtonText}`)}
                    </Button>
                ) : (
                    <></>
                )}
            </Row>
        );
    }
    const handleOnValid = (data: any, event: any) => {
        onValid(getValues(), event);
    };
    const handleOnInvalid = (data: any) => {
        if (onInvalid) onInvalid(data);
    };
    return (
        <form
            id={id}
            className={formClassName}
            autoComplete="off"
            onSubmit={handleSubmit(handleOnValid, handleOnInvalid)}
        >
            <div className="container-fluid">
                {fields}
                {children}
            </div>
        </form>
    );
};

export default memo(Form);
