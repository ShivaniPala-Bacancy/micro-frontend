import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CSVLink} from 'react-csv';
import Loader from 'react-loader';
import CSVReader, {IFileInfo} from './CsvReader';
import {IFormElementProps} from '../../../types/IFormElementProps';

export default function CsvElement(props: IFormElementProps) {
    const [t] = useTranslation();
    const MAX_ALLOWED_RECORDS = 10000;
    const {col, error, touched} = props;
    const [emptyMessage] = useState(t('csv.file.empty'));
    const [sizeMessage] = useState(t('csv.file.max.limit.reached'));
    const [headerMessage] = useState(t('csv.header.mismatch'));
    const [dataErrorMessage] = useState(t('csv.data.validation.error'));
    const [errorFileReady, setErrorFileReady] = useState(false);
    const [errorRecords, setErrorRecords] = useState([{}]);
    const [blocking, setBlocking] = useState(false);
    let inputClass = 'form-control input-sm';
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
    }
    /**
     * Validation against potential malicious characters
     * @param record
     * @returns : true if found malicious characters , false otherwise
     */
    const validateForExcel = (record: any) => {
        const regEx = new RegExp("^[@,-,+,=,']");
        const errorRecords1: any = {};
        Object.keys(record)
            .filter((key) => record[key] && regEx.test(record[key]))
            .forEach((key) => {
                errorRecords1[`${key}-error`] =
                    'following characters are not allowed in at the start of cell value. @,-,+,= ';
            });
        return errorRecords1;
    };
    /**
     * To make sure there are no undefined or null value in record
     * @param record
     * @returns : updated record
     */
    const fixNullKeys = (record: any): any => {
        const newRecord = record;
        Object.keys(newRecord)
            .filter((key) => key === null || key === 'null')
            .forEach((key) => {
                newRecord[key] = '';
            });
        return newRecord;
    };

    /**
     * Checks for keys containing -error
     * @param record
     * @returns : true if error found, false otherwise
     */
    const hasErrors = (record: any): boolean => {
        return (
            typeof Object.keys(record).find(
                (key) => key.indexOf('-error') > 0
            ) !== 'undefined'
        );
    };

    /**
     * Validate the record against yup schema.
     * @param record
     * @returns copy of original record, with validation errors if present
     */
    const validateAgainstSchema = (record: any): any => {
        const newRecord = record;
        try {
            if (col.schema)
                col.schema.validateSync(record, {abortEarly: false});
        } catch (e: any) {
            e.inner.forEach((err: any) => {
                const errHeader = `${err.path}-error`;
                newRecord[errHeader] = err.message;
            });
        }
        return newRecord;
    };

    /**
     * Checks if data is empty,
     * @param data : List of records read from csv file
     * @param fileinfo
     * @returns true if emtpy false otherwise
     */
    const isFileEmpty = (data: any[], fileinfo: IFileInfo): boolean => {
        if (!data || data.length <= 0) {
            if (col.onFileChange) {
                col.onFileChange(data, fileinfo, [
                    {type: 'file', description: emptyMessage}
                ]);
            }
            const fileField: any = document.getElementById(col.key);
            fileField.value = '';
            fileField.files = null;
            setBlocking(false);
            return true;
        }
        return false;
    };

    /**
     * Checks for number of records in csv file.
     * For performance reason we should limit the number of records per file and raise error if there are more records than allowed
     * @param data
     * @param fileinfo
     * @returns
     */
    const hasMorethanAllwedRecords = (
        data: any[],
        fileinfo: IFileInfo
    ): boolean => {
        if (data.length > (col.maxRecords || MAX_ALLOWED_RECORDS)) {
            if (col.onFileChange) {
                col.onFileChange(data, fileinfo, [
                    {
                        type: 'size',
                        description: `${sizeMessage} ${col.maxRecords || 10000}`
                    }
                ]);
            }
            const fileField: any = document.getElementById(col.key);
            fileField.value = '';
            fileField.files = null;
            setBlocking(false);
            return true;
        }
        return false;
    };

    /**
     * Checks for file data sanity by ensuring that the number of columns in the csv file are as expected
     * and if the column headers are same as defined by this form element configuration
     * @param data
     * @param fileinfo
     * @returns
     */
    const headerMismatch = (data: any[], fileinfo: IFileInfo): boolean => {
        const csvObjectKeys = Object.keys(data[0]);
        const totalHeaderFieldsInFile = csvObjectKeys.length;
        if (
            col.headerList &&
            totalHeaderFieldsInFile !== col.headerList.length
        ) {
            if (col.onFileChange) {
                col.onFileChange(data, fileinfo, [
                    {type: 'header', description: headerMessage}
                ]);
            }
            const fileField: any = document.getElementById(col.key);
            fileField.value = '';
            fileField.files = null;
            setBlocking(false);
            return true;
        }
        const missingHeader =
            col.headerList &&
            col.headerList.find((header) => {
                return !csvObjectKeys.includes(header);
            });
        if (missingHeader) {
            if (col.onFileChange) {
                col.onFileChange(data, fileinfo, [
                    {type: 'header', description: headerMessage}
                ]);
            }
            const fileField: any = document.getElementById(col.key);
            fileField.value = '';
            fileField.files = null;
            setBlocking(false);
            return true;
        }
        return false;
    };

    const hasInvalidRecords = (data: any[], fileinfo: IFileInfo): boolean => {
        const errorRecordsTemp = data
            .map(fixNullKeys)
            .map(validateAgainstSchema)
            .map((record) => {
                const newRecord = record;
                const validationErrors = validateForExcel(record);
                Object.keys(validationErrors).forEach((key) => {
                    newRecord[key] = validationErrors[key];
                });
                return newRecord;
            })
            .filter(hasErrors);
        if (errorRecordsTemp && errorRecordsTemp.length > 0) {
            setErrorRecords(errorRecordsTemp);
            setErrorFileReady(true);
            if (col.onFileChange) {
                col.onFileChange(data, fileinfo, [
                    {type: 'header', description: dataErrorMessage}
                ]);
            }
            const fileField: any = document.getElementById(col.key);
            fileField.value = '';
            fileField.files = null;
            setBlocking(false);
            return true;
        }
        return false;
    };

    const fileChangeHandler = (data: any[], fileinfo: IFileInfo) => {
        setErrorFileReady(false);
        setErrorRecords([]);
        if (!col.onFileChange) {
            setBlocking(false);
            return;
        }
        if (isFileEmpty(data, fileinfo)) return;
        if (hasMorethanAllwedRecords(data, fileinfo)) return;
        if (headerMismatch(data, fileinfo)) return;
        if (hasInvalidRecords(data, fileinfo)) return;
        const fileField: any = document.getElementById(col.key);
        col.onFileChange(
            data,
            {
                fileName: fileField.value.replace('C:\\fakepath\\', ''),
                fileData: fileField.files && fileField.files[0]
            },
            null
        );
        setBlocking(false);
    };
    const fileChangeHandlerWrapper = (data: any[], fileinfo: IFileInfo) => {
        setBlocking(true);
        setTimeout(() => fileChangeHandler(data, fileinfo), 1000);
    };

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.replace(/\W/g, '_')
    };
    const renderLoader = () => {
        return <Loader scale={0.5} loaded={!blocking} />;
    };
    return (
        <>
            <CSVReader
                inputId={col.key}
                parserOptions={papaparseOptions}
                onFileLoaded={fileChangeHandlerWrapper}
                cssInputClass={inputClass}
                disabled={col.disabled}
                key={col.key}
            />
            {renderLoader()}
            {errorFileReady ? (
                <span className="input-group-addon">
                    <CSVLink
                        data={errorRecords}
                        filename="errors.csv"
                        className="btn btn-danger btn-xs"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon="exclamation-triangle" />
                    </CSVLink>
                </span>
            ) : (
                <></>
            )}
        </>
    );
}
