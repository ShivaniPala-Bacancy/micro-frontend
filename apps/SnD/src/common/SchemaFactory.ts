import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import ElementTypes from '../types/ElementTypes';
import ICol from '../types/ICol';
import InputTypes from '../types/InputTypes';

const useYup = (cols: ICol[]) => {
    const [t] = useTranslation();
    function genericMessage(messageId: string) {
        return t(messageId);
    }

    function requiredMsg() {
        return t('common.form.validation.required');
    }

    function minMaxMsg(messageId: string, value: string | number) {
        return t(messageId, {
            min: value,
            max: value,
            pattern: value
        });
    }
    function createEmail(col: ICol) {
        const emailRegEx: RegExp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let ret = yup.string().email();
        if (col.required) ret = ret.required(requiredMsg());
        ret = ret.matches(
            emailRegEx,
            genericMessage('common.form.validation.email')
        );
        if (col.required) {
            ret = ret.required(requiredMsg());
        } else {
            ret.nullable();
        }
        return ret;
    }
    function createString(col: ICol) {
        const textRegEx: RegExp = /^[ A-Za-z0-9_@!^.,/&+-?=%£€$(){}\[\]"?:]*$/;
        let ret = yup.string();
        if (col.required) {
            ret = ret.required(requiredMsg());
        } else {
            ret.nullable();
        }
        ret = ret.matches(
            textRegEx,
            genericMessage('common.form.validation.string.text')
        );
        if (col.min)
            ret = ret.min(
                col.min,
                minMaxMsg('common.form.validation.string.min', `${col.min}`)
            );
        if (col.max)
            ret = ret.max(
                col.max,
                minMaxMsg('common.form.validation.string.max', `${col.max}`)
            );
        if (col.pattern) {
            ret = ret.matches(
                col.pattern,
                minMaxMsg(
                    col.patternMismatchMessage ||
                        'common.form.validation.string.pattern',
                    `${col.pattern}`
                )
            );
        }
        return ret;
    }
    function createArray(col: ICol) {
        let ret = yup.array().of(yup.string());
        if (col.required) {
            ret = ret.required(requiredMsg());
            ret = ret.min(1, requiredMsg());
        }
        return ret;
    }
    function createCurrency(col: ICol, positive: boolean) {
        let ret = yup.number().transform((cv, ov) => {
            return ov === '' ? undefined : cv;
        });
        if (positive) ret = ret.positive();
        if (col.required) ret = ret.required(requiredMsg());
        if (col.min)
            ret = ret.min(
                col.min,
                minMaxMsg('common.form.validation.number.min', col.min)
            );
        if (col.max)
            ret = ret.max(
                col.max,
                minMaxMsg('common.form.validation.number.max', col.max)
            );
        return ret;
    }

    function formatYupDate(date: Date) {
        return date
            ? new Date(date).toLocaleDateString()
            : new Date().toLocaleDateString();
    }

    function createDate(col: ICol) {
        const dateMustBeLaterThan = genericMessage(
            'common.form.validation.date.max'
        );
        const dateMustBeEarlierThan = genericMessage(
            'common.form.validation.date.min.add'
        );
        const minDate = new Date();
        const maxDate = new Date();
        let ret = yup
            .date()
            .transform((cv, ov) => {
                return ov === '' ? undefined : cv;
            })
            .label(col.key);
        if (col.required) ret = ret.required(requiredMsg());

        if (col.range && col.siblingKey && col.range === 'end') {
            ret = ret.min(yup.ref(col.siblingKey), `${t(dateMustBeLaterThan)}`);
        } else if (col.min) {
            minDate.setDate(minDate.getDate() + col.min);
            minDate.setHours(0, 0, 0, 0);
            ret = ret.min(minDate, `${t(dateMustBeLaterThan)}`);
        }
        if (col.range && col.siblingKey && col.range === 'start') {
            ret = ret.max(yup.ref(col.siblingKey), `${t(dateMustBeLaterThan)}`);
        } else if (col.max) {
            maxDate.setDate(maxDate.getDate() + col.max);
            maxDate.setHours(0, 0, 0, 0);
            ret = ret.max(maxDate, `${t(dateMustBeEarlierThan)}`);
        }
        if (!col.max) {
            const absoluteMaxDate = new Date(9999, 11, 31);
            ret = ret.max(
                absoluteMaxDate,
                `${t(dateMustBeEarlierThan)} ${formatYupDate(absoluteMaxDate)}`
            );
        }
        return ret;
    }
    function createNumber(col: ICol, positive?: boolean, integer?: boolean) {
        let ret = yup.number().transform((cv, ov) => {
            return ov === '' ? undefined : cv;
        });
        if (positive) ret = ret.positive(genericMessage('validation.positive'));
        if (col.required) ret = ret.required(requiredMsg());
        if (col.min)
            ret = ret.min(
                col.min,
                minMaxMsg('common.form.validation.number.min', col.min)
            );
        if (col.max)
            ret = ret.max(
                col.max,
                minMaxMsg('common.form.validation.number.max', col.max)
            );
        if (integer) ret = ret.integer();
        return ret;
    }
    function createBoolean(col: ICol) {
        let ret = yup.boolean();
        if (col.required) ret = ret.required(requiredMsg());
        return ret;
    }

    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf'
    ];

    function createFile(col: ICol) {
        return yup
            .mixed()
            .test('fileExists', requiredMsg(), (value) => {
                if (value && value.length == 0) return true;
                return col.optional || (value && value.length > 0);
            })
            .test(
                'fileSize',
                genericMessage('validation.file.tooLarge'),
                (value) => {
                    if (value && value.length == 0) return true;
                    return (
                        col.optional ||
                        (value && value.length > 0 && value[0].size <= 10240000)
                    );
                }
            )
            .test(
                'fileType',
                genericMessage(
                    col.validationMessage || 'validation.file.imageOnly'
                ),
                (value) => {
                    const formatsToCheck =
                        col.allowedFormats || SUPPORTED_FORMATS;
                    if (value && value.length == 0) return true;

                    return (
                        col.optional ||
                        (value &&
                            value.length > 0 &&
                            formatsToCheck.includes(value[0].type))
                    );
                }
            );
    }

    const createFORMFIELDFACTORY = (columns: ICol[]) => {
        const FORMFIELDFACTORY: any = {};
        columns.forEach((col) => {
            if (col.dataType) {
                FORMFIELDFACTORY[col.key] = createArray(col);
                return;
            }
            if (col.elementType && col.elementType !== 'text') {
                switch (col.elementType) {
                    case ElementTypes.CHECK_BOX:
                        FORMFIELDFACTORY[col.key] = createBoolean(col);
                        break;
                    case ElementTypes.PHONE:
                    case ElementTypes.DATE_PICKER:
                    case ElementTypes.SELECT:
                        FORMFIELDFACTORY[col.key] = createString(col);
                        break;
                    case ElementTypes.LIST:
                        FORMFIELDFACTORY[col.key] = createArray(col);
                        break;
                    case ElementTypes.AUTO_COMPLETE_CLIENT_SIDE:
                        FORMFIELDFACTORY[col.key] = createString(col);
                        break;
                    case ElementTypes.ICON_PICKER:
                        FORMFIELDFACTORY[col.key] = createString(col);
                        break;
                    case ElementTypes.AOTU_COMPLETE_SERVER_SIDE:
                        FORMFIELDFACTORY[col.key] = createString(col);
                        break;
                    case ElementTypes.TEXT_AREA:
                        FORMFIELDFACTORY[col.key] = createString(col);
                        break;
                    default:
                        FORMFIELDFACTORY[col.key] = createArray(col);
                        break;
                }
            } else {
                switch (col.type) {
                    case InputTypes.EMAIL:
                        FORMFIELDFACTORY[col.key] = createEmail(col);
                        break;
                    case InputTypes.FILE:
                        FORMFIELDFACTORY[col.key] = createFile(col);
                        break;
                    case InputTypes.DATE:
                        FORMFIELDFACTORY[col.key] = createDate(col);
                        break;
                    case InputTypes.NUMBER:
                        FORMFIELDFACTORY[col.key] = createNumber(col, false);
                        break;
                    case InputTypes.DOUBLE_VALUE:
                        FORMFIELDFACTORY[col.key] = createNumber(col, false);
                        break;
                    case InputTypes.POSITIVE_DOUBLE_VALUE:
                        FORMFIELDFACTORY[col.key] = createNumber(col, true);
                        break;
                    case InputTypes.MOBILE_NUMBER:
                        FORMFIELDFACTORY[col.key] = createNumber(
                            col,
                            true,
                            true
                        );
                        break;
                    case InputTypes.INTEGER:
                        FORMFIELDFACTORY[col.key] = createNumber(
                            col,
                            true,
                            true
                        );
                        break;
                    case InputTypes.CURRENCY_VALUE:
                        FORMFIELDFACTORY[col.key] = createCurrency(col, false);
                        break;
                    case InputTypes.POSITIVE_CURRENCY_VALUE:
                        FORMFIELDFACTORY[col.key] = createCurrency(col, true);
                        break;
                    case InputTypes.BOOL:
                        FORMFIELDFACTORY[col.key] = createBoolean(col);
                        break;
                    default:
                        FORMFIELDFACTORY[col.key] = createString(col);
                        break;
                }
            }
        });
        return FORMFIELDFACTORY;
    };

    const finalFORMFIELDFACTORY = createFORMFIELDFACTORY(
        cols.filter((col) => col.key.indexOf('.') < 0)
    );
    const nestedKeyColumns = cols.filter((col) => col.key.indexOf('.') > 0);
    const nestedKeys: any = {};
    nestedKeyColumns.forEach((col) => {
        const [parentKey] = col.key.split('.');
        if (!nestedKeys[parentKey]) {
            nestedKeys[parentKey] = [];
        }
        const colClone = {...col, key: col.key.split('.')[1]};
        nestedKeys[parentKey].push(colClone);
    });
    Object.keys(nestedKeys).forEach((nk) => {
        finalFORMFIELDFACTORY[nk] = yup
            .object()
            .shape(createFORMFIELDFACTORY(nestedKeys[nk]));
    });
    return yup.object().shape(finalFORMFIELDFACTORY);
};

export default useYup;
