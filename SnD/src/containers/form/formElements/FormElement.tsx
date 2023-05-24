import React from 'react';
import {useTranslation} from 'react-i18next';

const FormElement = (props: any) => {
    const {
        columnSize,
        colLabelClass,
        isRequired,
        colName,
        colKey,
        frontInputGroupAddon,
        backInputGroupAddon,
        children,
        horizontal,
        userDefined = false,
        error,
        noLabel,
        noError
    } = props;
    const [t] = useTranslation();
    const hasError = error && error.length > 0;
    const showLabel = !noLabel;
    const showError = !noError;
    const feedbackClass = hasError ? 'invalid-feedback' : 'valid-feedback';
    let localColumnSize = columnSize;
    if (horizontal) {
        localColumnSize = 12;
    } else if (userDefined) {
        localColumnSize = columnSize;
    } else if (localColumnSize && localColumnSize > 4) {
        localColumnSize = 4;
    }
    if (horizontal) {
        return (
            <>
                {showLabel && (
                    <label className={`${colLabelClass} col`} htmlFor={colKey}>
                        {`${t(colName)} ${isRequired ? '*' : ''}`}
                    </label>
                )}
                <div
                    className={`input-group ${
                        showError ? 'has-validation' : ''
                    } col`}
                >
                    {frontInputGroupAddon}
                    {children}
                    {backInputGroupAddon}
                </div>
                {showError && (
                    <div
                        className={`show-validation-error col ${feedbackClass}`}
                    >
                        {hasError ? error : ''}
                    </div>
                )}
            </>
        );
    }

    const renderFormElement = () => {
        return (
            <div className={`col-lg-${localColumnSize}`}>
                {showLabel && (
                    <label className={colLabelClass} htmlFor={colKey}>
                        {`${t(colName)} ${isRequired ? '*' : ''}`}
                    </label>
                )}
                <div
                    className={`input-group ${
                        showError ? 'has-validation' : ''
                    } `}
                >
                    {frontInputGroupAddon}
                    {children}
                    {backInputGroupAddon}
                    {showError && (
                        <div
                            className={`show-validation-error ${feedbackClass}`}
                        >
                            {hasError ? error : ''}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return <>{renderFormElement()}</>;
};
export default FormElement;
