import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './styles.css';

interface IProductBox {
    inventoryTypeDescription: string;
    pricePerUnit: number;
    thumbnailImage: any;
    onAddItemClick: any;
    selected?: boolean;
}
/* eslint-disable  jsx-a11y/anchor-is-valid,no-param-reassign */
const SmallBox: FC<IProductBox> = (props) => {
    const {
        inventoryTypeDescription,
        pricePerUnit,
        thumbnailImage,
        onAddItemClick,
        selected
    } = props;
    const [t] = useTranslation();
    const imageNotFound = (event: any) => {
        event.target.src = 'img/noImage.png';
    };
    return (
        <>
            <div className="col-12">
                <div className="card mb-2 bg-gradient-dark">
                    {selected && (
                        <span className="badge badge-danger navbar-badge">
                            {`\u2713`}
                        </span>
                    )}
                    <img
                        onError={imageNotFound}
                        className="card-img-top"
                        src={`data:image/png;base64, ${thumbnailImage}`}
                        alt={inventoryTypeDescription}
                    />
                    <Link
                        to="#"
                        className="small-box-footer text-center"
                        style={{ background: 'white' }}
                    >
                        <div className="text-start">
                            <span className="enMoney">
                                {Number(pricePerUnit).toLocaleString('en')}
                            </span>
                            <br />
                            <span>{inventoryTypeDescription}</span>
                        </div>
                        <button
                            type="button"
                            className="mr-2 btn btn-warning btn-sm"
                            style={{ color: 'black', marginBottom: '6px' }}
                            onClick={() => onAddItemClick(1)}
                        >
                            {t('pages.orders.product.add')}
                            <i className="fa fa-shopping-cart" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SmallBox;
