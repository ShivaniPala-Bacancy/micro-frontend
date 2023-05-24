import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {Modal, Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {v4 as uuidv4} from 'uuid';
import * as icons from 'react-icons/fa';
import {IFormElementProps} from '../../../types/IFormElementProps';
import IconComponent from '../IconComponent';

const IconPicker: React.FC<IFormElementProps> = (props) => {
    const [t] = useTranslation();
    const [show, setShow] = useState(false);
    const {col, error, touched, control, setValue} = props;

    const {id} = col;
    let inputClass = '';
    if (error && error.length > 0) {
        inputClass = `${inputClass} is-invalid`;
    } else if (touched) {
        inputClass = `${inputClass} is-valid`;
    }

    const popover = (
        <Modal
            size="xl"
            fullscreen
            scrollable
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {t('app.common.form.element.iconPicker.label')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.values(icons).map((icon) => (
                    <Button
                        variant="outline-dark"
                        onClick={() => {
                            setValue(col.id, icon.name);
                        }}
                        key={uuidv4()}
                    >
                        {icon({size: 30, title: `${icon}`})}
                    </Button>
                ))}
            </Modal.Body>
        </Modal>
    );
    return (
        <Controller
            name={id}
            control={control}
            defaultValue="FaSearch"
            render={({field}) => {
                return (
                    <>
                        <Button
                            variant="outline-dark"
                            className={inputClass}
                            onClick={() => setShow(true)}
                        >
                            <IconComponent iconName={field.value} />
                        </Button>
                        {popover}
                    </>
                );
            }}
        />
    );
};

export default IconPicker;
