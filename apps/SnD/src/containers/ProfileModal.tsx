import React from 'react';
import {Modal} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Box from '../containers/Box';

/* eslint-disable jsx-a11y/alt-text,react/button-has-type,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */

const ProfileModal = (props: any) => {
    const {show, setShow, user, currentRole, changeRole} = props;
    const [t] = useTranslation();
    const createRoleLI = (data: any) => {
        if (data.role === currentRole) {
            return (
                <li
                    key={data.role}
                    className="list-group-item list-group-sm bg-success"
                >
                    <small>{data.role}</small>
                </li>
            );
        }
        return (
            <li
                key={data.role}
                className="list-group-item list-group-sm clickable"
                onClick={() => {
                    changeRole(data.role);
                }}
            >
                <small>{data.role}</small>
            </li>
        );
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
            }}
            size="lg"
        >
            <Modal.Body>
                <Box
                    id="user-profile-modal-box"
                    title="header.user.profileModal.title"
                    dark
                    closable
                    loaded
                    onClose={() => {
                        setShow(false);
                    }}
                >
                    <div className="container-fluid">
                        <div className="card">
                            <div className="d-flex align-top">
                                <div className="image">
                                    {' '}
                                    <img
                                        src="img/avatar.png?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                                        className="rounded"
                                        width="155"
                                    />{' '}
                                </div>
                                <div className="ml-3 w-100">
                                    <h4 className="mb-0 mt-0">
                                        {`${user?.firstName} ${
                                            user?.lastName || ''
                                        }`}
                                    </h4>{' '}
                                    <span>@{`${user?.userName}`}</span>
                                    <div className="card d-flex rounded">
                                        <div className="card-body">
                                            <div className="row alternate-colored">
                                                <div className="col-lg-4">
                                                    <h6 className="mb-0">
                                                        {t(
                                                            'header.user.profileModal.label.email'
                                                        )}
                                                    </h6>
                                                </div>
                                                <div className="col-lg-8 text-secondary">
                                                    {user?.userEmailId}
                                                </div>
                                            </div>
                                            <div className="row alternate-colored">
                                                <div className="col-lg-4">
                                                    <h6 className="mb-0">
                                                        {t(
                                                            'header.user.profileModal.label.contactNo'
                                                        )}
                                                    </h6>
                                                </div>
                                                <div className="col-lg-8 text-secondary">
                                                    {user?.userContactNo}
                                                </div>
                                            </div>
                                            <div className="row alternate-colored">
                                                <div className="col-lg-4">
                                                    <h6 className="mb-0">
                                                        {t(
                                                            'header.user.profileModal.label.currentRole'
                                                        )}
                                                    </h6>
                                                </div>
                                                <div className="col-lg-8">
                                                    <ul className="list-group">
                                                        {user?.userRoles?.map(
                                                            createRoleLI
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileModal;
