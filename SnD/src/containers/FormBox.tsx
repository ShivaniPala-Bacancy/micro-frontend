import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CrudEvents } from '../types/ICrudBox';
import IFormBox from '../types/IFormBox';
import Box from '../components/Box';
import Form from './form/Form';

const FormBox = (props: IFormBox) => {
    const {
        id,
        title,
        waiting,
        form,
        submitDisabled,
        submitHidden,
        currentObject,
        parentDispatch,
        parentState,
        action,
        isErrorPresent,
        error,
        callBack,
        hideReset,
        hideButtons,
        errorMessage
    } = props;
    const [t] = useTranslation();
    const onValid = (data: any) => {
        callBack(CrudEvents.FORM_SUBMIT, data);
    };
    const onInvalid = (errors: any) => {
        callBack(CrudEvents.FORM_ERROR, errors);
    };
    const onClose = () => {
        callBack(CrudEvents.FORM_CLOSE, null);
    };
    const errMsgElement = <span>{errorMessage}</span>;
    return (
        <Box
            id={`${id}-form-box`}
            title={`${action == 'update' ? 'Update' : ''} ${t(title)}`}
            closable
            loading={waiting}
            onClose={onClose}
            withFooter={errorMessage !== undefined}
            footerLeftContent={errMsgElement}
        >
            <Form
                id={`${id}-form`}
                onValid={onValid}
                onInvalid={onInvalid}
                form={form}
                showButtons={!hideButtons}
                submitDisabled={submitDisabled}
                submitHidden={submitHidden}
                submitButtonText="Save"
                resetButtonText="Reset"
                currentObject={currentObject}
                parentDispatch={parentDispatch}
                parentState={parentState}
                isErrorPresent={isErrorPresent}
                error={error}
                waiting={waiting}
                hideReset={hideReset}
            />
        </Box>
    );
};
export default memo(FormBox);
