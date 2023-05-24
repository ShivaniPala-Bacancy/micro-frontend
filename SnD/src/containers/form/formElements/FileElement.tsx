import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import {SystemParam} from 'src/services/master/model/SystemParam';
import client from '../../../common/AjaxClient';
import {HttpMethods} from '../../../types/CommonTypes';
import {IFormElementProps} from '../../../types/IFormElementProps';
import MasterConfigService from '../../../services/master/api/MasterConfigService';

/* eslint-disable no-param-reassign,dot-notation,prefer-template,no-shadow,import/prefer-default-export,prefer-promise-reject-errors */

function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

const FileElement: FC<IFormElementProps> = (props) => {
    const masterService = new MasterConfigService();
    const [fileData, setFileData] = useState<any>(null);
    const [file, setFile] = useState<any>();
    const [src, setSrc] = useState('');
    const [action, setAction] = useState<
        undefined | 'Add' | 'Delete' | 'Display' | 'Download' | 'DownloadReady'
    >(undefined);

    const [currentState, setCurrentState] = useState({
        isOpen: false
    });

    const handleShowDialog = () => {
        setCurrentState({isOpen: !currentState.isOpen});
    };

    const {col, error, touched, childSetStateGetter} = props;
    let {register} = props;
    if (!register) {
        register = () => null;
    }
    const {hidden, disabled} = col;

    let inputClass = 'input-sm form-control';
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
    }
    const [t] = useTranslation();
    const fieldRegister = register(col.id);
    const origOnChange = fieldRegister.onChange;

    fieldRegister.onChange = (e: any) => {
        if (col.onChange) {
            col.onChange(e);
        }
        const res = origOnChange(e);
        try {
            if (props.parentState) {
                const file = e.target.files[0];
                if (file['type'].split('/')[0] === 'image') {
                    if (props.parentState.idType.length > 2) {
                        const file = e.target.files[0];
                        setFile(file);
                        setAction('Add');
                    } else {
                        toast.error(t('Please select Id Type first..'));
                    }
                } else {
                    toast.error('Only image files are allowed..');
                }
            }
        } catch (err) {
            // Ignore error
            setFile('');
        }
        return res;
    };

    useEffect(() => {
        if (action == 'Add') {
            masterService
                .searchSystemParams('MINIO_URL')
                .subscribe((res: any) => {
                    if (res != null) {
                        const param: SystemParam | undefined = res.find(
                            (item: any) =>
                                item != null &&
                                item.id.mdlParameterId === 'MINIO_URL'
                        );
                        uploadFile(param);
                    }
                });
        } else if (action == 'Delete') {
            masterService
                .searchSystemParams('MINIO_URL')
                .subscribe((res: any) => {
                    if (res != null) {
                        const param: SystemParam | undefined = res.find(
                            (item: any) =>
                                item != null &&
                                item.id.mdlParameterId === 'MINIO_URL'
                        );
                        deleteFile(param);
                    }
                });
        } else if (action == 'Download') {
            downloadFile();
        }
    }, [action, file]);

    const uploadFile = (param?: SystemParam) => {
        const state = props.parentState;
        const formData = new FormData();
        const newfile = new File([file], state.idType, {type: file?.type});
        formData.append('file', newfile);
        if (param != null) {
            client(
                `${param.mdlParameterValue}/upload/${state.bucketName}/${state.uuid}`,
                HttpMethods.POST,
                formData
            )
                .then((res) => {
                    if (props.parentDispatch) {
                        props.parentDispatch(res.path);
                    }
                    setSrc(URL.createObjectURL(file));
                    setAction('Display');
                    setFileData(URL.createObjectURL(file));
                    setFile({...newfile, name: file?.name});
                })
                .catch((e) => {
                    console.log('error', e);
                    setSrc('');
                    setFile('');
                    setAction(undefined);
                });
        }
    };

    const deleteFile = (param?: SystemParam) => {
        const state = props.parentState;
        if (param != null) {
            client(
                `${param.mdlParameterValue}/delete/${state.bucketName}/${state.uuid}/${state.idType}`,
                HttpMethods.DELETE
            )
                .then(() => {
                    if (props.parentDispatch) {
                        props.parentDispatch('');
                    }
                    setFile('');
                    setSrc('');
                    setAction(undefined);
                })
                .catch(() => {
                    console.log('Invalid response');
                    setSrc('');
                    setAction(undefined);
                    setFile('');
                });
        }
    };

    const downloadFile = () => {
        const state = props.parentState;
        const temp = state.url.split('/');
        if (temp && temp.length > 1) {
            masterService
                .searchSystemParams('MINIO_URL')
                .subscribe((res: any) => {
                    if (res != null) {
                        const param: SystemParam | undefined = res.find(
                            (item: any) =>
                                item != null &&
                                item.id.mdlParameterId === 'MINIO_URL'
                        );
                        if (param != null) {
                            client(
                                `${param.mdlParameterValue}/download/${state.bucketName}/${state.uuid}/${state.idType}`,
                                HttpMethods.GET,
                                undefined,
                                false
                            )
                                .then((res) => {
                                    setSrc(
                                        'data:image/png;base64,' + res?.image
                                    );
                                    setFileData(res);
                                    setAction('DownloadReady');
                                })
                                .catch((e) => {
                                    console.log('Invalid response ', e);
                                    setSrc('');
                                    setAction(undefined);
                                });
                        }
                    }
                });
        }
    };

    function downloadBase64File(contentBase64: any, fileName: any) {
        const linkSource = `data:application/json;base64,${contentBase64}`;
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        downloadLink.href = linkSource;
        downloadLink.target = '_self';
        downloadLink.download = fileName;
        downloadLink.click();
    }

    useEffect(() => {
        if (props?.parentState?.url?.length > 0) {
            setAction('Download');
        }
        if (childSetStateGetter) {
            childSetStateGetter(setAction);
        }
    }, [props.parentState]);

    const PageLoading = () => {
        return (
            <div>
                <span>Loading.....</span>
            </div>
        );
    };

    const displayView = () => {
        if (action === 'Add' || action === 'Delete' || action == 'Download') {
            return PageLoading();
        }

        if (currentState.isOpen) {
            return (
                <dialog
                    aria-hidden="true"
                    style={{
                        position: 'fixed',
                        width: '80%',
                        height: '80%',
                        marginTop: '70px',
                        marginBottom: '70px',
                        marginLeft: '250px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        top: '0',
                        left: '0'
                    }}
                    open
                >
                    <span
                        aria-hidden="true"
                        onClick={handleShowDialog}
                        style={{
                            cursor: 'pointer',
                            paddingTop: '1px',
                            fontSize: '40px',
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        &times;
                    </span>

                    <img
                        style={{
                            position: 'relative',
                            margin: 'auto',
                            display: 'block',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: '90%',
                            height: '80%'
                        }}
                        src={src}
                        alt="no image"
                    />
                </dialog>
            );
        }
        const display =
            fileData && fileData?.type !== 'application/pdf' ? 'block' : 'none';
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <a
                        style={{marginRight: '100px'}}
                        href="#"
                        onClick={() => {
                            if (action == 'DownloadReady') {
                                downloadBase64File(
                                    fileData.image,
                                    file?.name || props.parentState.name
                                );
                            }
                        }}
                    >
                        {file?.name || props.parentState.name}
                    </a>
                    <i
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={() => {
                            setAction('Delete');
                        }}
                    />
                </div>
                <div>
                    <div style={{position: 'relative'}}>
                        {!props?.parentState?.hidePreview && (
                            <img
                                style={{
                                    height: '180px',
                                    width: '250px',
                                    border: '1px solid',
                                    display
                                }}
                                src={src}
                                aria-hidden="true"
                                onClick={handleShowDialog}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {action === undefined ? (
                <div className="custom-file">
                    <input
                        id={col.id}
                        type="file"
                        accept="image/*"
                        className={`custom-file-input ${inputClass}`}
                        hidden={hidden}
                        readOnly={disabled}
                        {...fieldRegister}
                    />
                    <label className="custom-file-label" htmlFor={col.id}>
                        Choose File
                    </label>
                </div>
            ) : (
                displayView()
            )}
        </>
    );
};

export default FileElement;
