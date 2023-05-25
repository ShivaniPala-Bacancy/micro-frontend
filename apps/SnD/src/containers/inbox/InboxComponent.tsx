import React from 'react';
import './style.css';

export interface InboxComponentProps {}

/* eslint-disable react/self-closing-comp,jsx-a11y/no-noninteractive-tabindex,react/button-has-type */
const InboxComponent: React.FC<InboxComponentProps> = () => {
    return (
        <div className="container-fluid">
            <div className="overflow-auto">
                <div className="email-app card-margin">
                    <div className="email-toolbars-wrapper">
                        <div className="toolbar-body">
                            <ul className="toolbar-menu">
                                <li className="active">
                                    <span className="fas fa-bell fa-lg mr-3 text-danger" />
                                    <a href="#">Pending</a>
                                    <span className="badge badge-sb-base">
                                        8
                                    </span>
                                </li>
                                <li>
                                    <span className="fas fa-check-square fa-lg mr-3 text-success" />
                                    <a href="#">Completed</a>
                                </li>
                                <li>
                                    <span className="fas fa-clock fa-lg mr-3 text-info" />
                                    <a href="#">On Hold</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="email-list-wrapper">
                        <div className="email-list-header">
                            <div className="dropdown">
                                <button
                                    className="btn btn-sm btn-flash-border-base shadow-none dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Recent
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <li className="dropdown-item">
                                        <a className="dropdown-link" href="#">
                                            Focused
                                        </a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a className="dropdown-link" href="#">
                                            Others
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            id="email-app-body"
                            className="email-list-scroll-container ps ps--active-y"
                        >
                            <ul className="email-list">
                                <li className="email-list-item">
                                    <div className="recipient">
                                        <a href="#" className="recipient-name">
                                            <i className="fas fa-users mr-3" />
                                            Pepper Potts
                                        </a>
                                        <div className="email-footer ml-1">
                                            <span className="email-time">
                                                11:50 AM
                                            </span>
                                        </div>
                                    </div>
                                    <a href="#" className="email-subject">
                                        Food App IOS &amp; Android - Need
                                        confirmation to start project execution
                                        <i className="unread">&nbsp;</i>
                                    </a>
                                </li>
                            </ul>
                            <div
                                className="ps__rail-x"
                                style={{left: 0, bottom: 0}}
                            >
                                <div
                                    className="ps__thumb-x"
                                    tabIndex={0}
                                    style={{left: 0, width: 0}}
                                />
                            </div>
                            <div
                                className="ps__rail-y"
                                style={{top: 0, height: 911, right: 0}}
                            >
                                <div
                                    className="ps__thumb-y"
                                    tabIndex={0}
                                    style={{top: 0, height: 50}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxComponent;
