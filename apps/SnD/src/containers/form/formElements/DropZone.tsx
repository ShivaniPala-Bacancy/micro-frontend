import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Modal} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import {HttpMethods} from '../../../types/CommonTypes';
import client from '../../../common/AjaxClient';
import SlideShow from '../../SlideShow';
import './dropZone.css';
import MasterConfigService from '../../../services/master/api/MasterConfigService';
import {SystemParam} from 'src/services/master/model/SystemParam';

/* eslint-disable no-lonely-if,indent,no-shadow,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,no-param-reassign,no-case-declarations , react/jsx-boolean-value, prefer-template,operator-assignment */
const baseStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        transition: 'border .3s ease-in-out'
    }
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export interface DropZoneProps {
    uploadLength: number;
    desc: string;
    type: string;
    action?: string;
    updateAction?: string;
    createAttachment: (data: any, type: string) => void;
    deleteAttachment: (data: any, type: string) => void;
    deleteImageHandler: (data: any) => void;
    thumbnailData?: any[];
    additionalData?: any[];
}

const DropZone: React.FC<DropZoneProps> = (props) => {
    const {
        uploadLength,
        desc,
        type,
        createAttachment,
        deleteAttachment,
        thumbnailData,
        additionalData,
        action,
        updateAction,
        deleteImageHandler
    } = props;
    const [files, setFiles] = useState<any[]>([]);
    const [thumbnail, setThumbnail] = useState<any[]>([]);
    const [modal, setModal] = useState(false);
    const masterService = new MasterConfigService();

    useEffect(() => {
        if (additionalData && action == 'Update') {
            setFiles(additionalData);
        }
        if (thumbnailData && action == 'Update') {
            setThumbnail(thumbnailData);
        }
    });

    const onDrop = useCallback((acceptedFiles) => {
        if (type == 'thumbnail' && acceptedFiles.length <= uploadLength) {
            const formData = new FormData();
            const fileName = acceptedFiles[0].name;
            const newfile = new File([acceptedFiles[0]], fileName, {
                type: acceptedFiles[0].type
            });
            formData.append('file', newfile);
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
                                `${param.mdlParameterValue}/upload/` +
                                    'product' +
                                    '/' +
                                    type,
                                HttpMethods.POST,
                                formData
                            )
                                .then((res) => {
                                    toast.success('Image Added');
                                    setThumbnail([
                                        Object.assign(acceptedFiles[0], {
                                            preview: URL.createObjectURL(
                                                acceptedFiles[0]
                                            ),
                                            description: type,
                                            filePath: res.path
                                        })
                                    ]);
                                    createAttachment(
                                        Object.assign(res, {
                                            type: acceptedFiles[0].type
                                        }),
                                        type
                                    );
                                })
                                .catch((e) => {
                                    console.log('Invalid response');
                                });
                        }
                    }
                });
        } else if (
            type == 'additional' &&
            acceptedFiles.length <= uploadLength
        ) {
            acceptedFiles.map((file: any) => {
                const formData = new FormData();
                const fileName = uuidv4() + file.name;
                const newfile = new File([file], fileName, {
                    type: file.type
                });
                formData.append('file', newfile);

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
                                    `${param.mdlParameterValue}/upload/` +
                                        'product' +
                                        '/' +
                                        type,
                                    HttpMethods.POST,
                                    formData
                                )
                                    .then((res) => {
                                        toast.success('Image Added');
                                        setFiles((prevState) => {
                                            const file1 = Object.assign(file, {
                                                id: uuidv4(),
                                                filePath: res.path,
                                                fileName: res.fileName,
                                                preview:
                                                    URL.createObjectURL(file),
                                                description: type
                                            });
                                            createAttachment(file1, type);
                                            return [...prevState, file1];
                                        });
                                    })
                                    .catch((e) => {
                                        console.log('Invalid response');
                                    });
                            }
                        }
                    });
            });
        } else {
            toast.error(
                'Insert ' + uploadLength + ' ' + type + ' ' + 'image ' + ''
            );
        }
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject, isDragAccept]
    );
    const deleteHandler = (image: any) => {
        if (action == 'Update') {
            deleteImageHandler(image);
        }

        masterService.searchSystemParams('MINIO_URL').subscribe((res: any) => {
            if (res != null) {
                const param: SystemParam | undefined = res.find(
                    (item: any) =>
                        item != null && item.id.mdlParameterId === 'MINIO_URL'
                );
                if (param != null) {
                    client(
                        `${param.mdlParameterValue}/delete/` +
                            'product' +
                            '/' +
                            type +
                            '/' +
                            image.name,
                        HttpMethods.DELETE
                    )
                        .then((res) => {
                            toast.warn('Image Deleted');
                            deleteAttachment(image, type);
                            if (type == 'additional') {
                                if (files.includes(image)) {
                                    const lists = files.filter((x: any) => {
                                        return x.id != image.id;
                                    });
                                    setFiles(lists);
                                }
                            } else {
                                if (thumbnail.includes(image)) {
                                    const lists = files.filter((x: any) => {
                                        return x.id != image.id;
                                    });
                                    setThumbnail(lists);
                                }
                            }
                        })
                        .catch((e) => {
                            console.log('Invalid response');
                        });
                }
            }
        });
    };

    const renderModal = (e?: any) => {
        return (
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Preview Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SlideShow files={files} />
                </Modal.Body>
            </Modal>
        );
    };

    const thumbs =
        type == 'additional'
            ? files.map((file: any) => (
                  <>
                      <div
                          style={{
                              position: 'relative',
                              display: 'inline-flex',
                              borderRadius: 5,
                              border: '1px solid #eaeaea',
                              marginBottom: 8,
                              marginRight: 8,
                              width: 100,
                              height: 90,
                              padding: 4,
                              boxSizing: 'border-box'
                          }}
                          key={file.name}
                      >
                          <div
                              style={{
                                  display: 'inline-flex',
                                  minWidth: 0,
                                  overflow: 'hidden'
                              }}
                          >
                              <img
                                  src={file.preview}
                                  style={{
                                      display: 'block',
                                      width: 'auto',
                                      height: '100%'
                                  }}
                                  onClick={() => setModal(true)}
                              />
                          </div>
                          <i
                              className="fa fa-trash"
                              style={{
                                  position: 'absolute',
                                  right: 10,
                                  top: 10,
                                  background: 'white',
                                  color: 'red',
                                  border: 0,
                                  borderRadius: '.325em',
                                  cursor: 'pointer'
                              }}
                              onClick={() => deleteHandler(file)}
                          />
                      </div>
                  </>
              ))
            : thumbnail.map((file: any) => (
                  <>
                      <div
                          style={{
                              position: 'relative',
                              display: 'inline-flex',
                              borderRadius: 5,
                              border: '1px solid #eaeaea',
                              marginBottom: 8,
                              marginRight: 8,
                              width: '100%',
                              height: '100%',
                              padding: 4,
                              boxSizing: 'border-box'
                          }}
                          key={file.name}
                      >
                          <div
                              style={{
                                  display: 'inline-flex',
                                  minWidth: 0,
                                  overflow: 'hidden'
                              }}
                          >
                              <img
                                  src={file.preview}
                                  style={{
                                      display: 'block',
                                      width: 'auto',
                                      height: '100%'
                                  }}
                                  onClick={() => setModal(true)}
                              />
                          </div>
                          <i
                              className="fa fa-trash"
                              style={{
                                  position: 'absolute',
                                  right: 10,
                                  top: 10,
                                  background: 'white',
                                  color: 'red',
                                  border: 0,
                                  borderRadius: '.325em',
                                  cursor: 'pointer'
                              }}
                              onClick={() => deleteHandler(file)}
                          />
                      </div>
                  </>
              ));
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '25px',
                    borderWidth: 2,
                    borderRadius: 2,
                    height: 230,
                    width: 423,
                    maxHeight: '100%',
                    borderColor: '#eeeeee',
                    borderStyle: 'dashed',
                    backgroundColor: '#fafafa',
                    color: '#bdbdbd',
                    transition: 'border .3s ease-in-out',
                    overflowY: 'scroll'
                }}
            >
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div>{desc}</div>
                </div>
                <div>
                    <aside
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 16,
                            padding: 20
                        }}
                    >
                        {thumbs}
                    </aside>
                </div>
            </div>
            {modal ? renderModal() : <></>}
        </>
    );
};

export default DropZone;
