import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Box from './Box';

interface ConfirmationBoxProps {
    ok: () => void;
    cancel: () => void;
    show?: boolean;
    message?: string;
}

const ConfirmationBox: FC<ConfirmationBoxProps> = (props) => {
    const {
        ok,
        cancel,
        show = false,
        message = 'app.common.confirmation.message'
    } = props;

    const [t] = useTranslation();

    const buttons = (
        <div style={{ display: 'flex', marginRight: '5px' }}>
            <Button
                size="sm"
                type="button"
                variant="success"
                onClick={ok}
                style={{ marginRight: '2px' }}
            >
                OK
            </Button>
            <Button size="sm" type="button" variant="danger" onClick={cancel}>
                Cancel
            </Button>
        </div>
    );
    return (
        <Modal
            show={show}
            onHide={cancel}
            size="sm"
            centered
            contentClassName="custom-model-content"
        >
            <Modal.Body>
                <Box
                    id="confirmation"
                    title="Confirmation"
                    closable
                    onClose={cancel}
                    dark
                    withFooter
                    nopadding
                    footerCenterContent={buttons}
                >
                    <div className="content-center">
                        <div className="confirmation-message">{t(message)}</div>
                    </div>
                </Box>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmationBox;
