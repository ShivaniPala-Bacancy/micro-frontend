import {lastValueFrom} from 'rxjs';
import {ProductOfferingPriceService} from '../services/productCatalog/api/ProductOfferingPriceService';
import {POPAlteration} from '../services/productCatalog/model/pOPAlteration';
import {Price} from '../services/purchaseOrders/model/Price';
import {ProductOffering} from '../services/productCatalog/model/productOffering';
import {currencyFormatter} from './Util';

const taxService = new ProductOfferingPriceService();

export const handleActualPrice = (
    catalogId: string,
    p: ProductOffering,
    type: string,
    catalogs: any
) => {
    let selectedPrices = selectPriceFromCatalog(p, catalogs, []);

    //mow from the matched catalog filter the prices based on matching specifications
    let selectedPrice: any;
    if (selectedPrices && selectedPrices.length > 0) {
        selectedPrice = filterUsingsSpecs(p, [], selectedPrices);
    }
    if (!selectedPrice?.price) {
        //if no matching price then select the defualt price
        const price = p?.productOfferingPrice?.filter(
            (prc) => prc.name == 'Default Price'
        );
        selectedPrice = price?.[0];
    }
    selectedPrice = selectedPrice?.price?.dutyFreeAmount?.value;
    return selectedPrice == 'NA'
        ? 'NA'
        : currencyFormatter.format(selectedPrice);
};

const selectPriceFromCatalog = (
    product: ProductOffering,
    catalogs: any,
    specifications: any
) => {
    let priceArray = product?.productOfferingPrice;
    let selectedPrices = priceArray?.filter((price: any) => {
        let includesCatalog = false;
        let catalogConstraints = price?.constraint?.filter(
            (constraint: any) => constraint['@type'] == 'Catalog Type'
        );
        let catalogIdsArray = catalogs?.map((catalog: any) => catalog.id);
        catalogConstraints?.forEach((constraint: any) => {
            catalogIdsArray?.forEach((catalogId: any) => {
                if (constraint.values?.includes(catalogId)) {
                    includesCatalog = true;
                }
            });
        });
        return includesCatalog;
    });
    return selectedPrices;
};

export const handlePriceChange = async (
    catalogId: string,
    p: ProductOffering,
    quantity: any,
    type: string,
    specifications?: any,
    catalogs?: any
) => {
    //get all the prices that includes the catalog id in constraint
    let selectedPrices = selectPriceFromCatalog(p, catalogs, specifications);

    //mow from the matched catalog filter the prices based on matching specifications
    let selectedPrice: any;
    if (selectedPrices && selectedPrices.length > 0) {
        selectedPrice = filterUsingsSpecs(p, specifications, selectedPrices);
    }
    if (!selectedPrice?.price) {
        //if no matching price then select the defualt price
        const price = p?.productOfferingPrice?.filter(
            (prc) => prc.name == 'Default Price'
        );
        selectedPrice = price?.[0];
    }

    //now using selected price calculate discount and prepare the price object
    let priceFinal: Price = {
        subTotal: (selectedPrice?.price?.dutyFreeAmount?.value || 0) * quantity,
        discount:
            calculateDiscount(
                selectedPrice.priceAlteration,
                selectedPrice?.price?.dutyFreeAmount?.value || 0
            ) * quantity
    };

    //using selected price calculate and add all taxes
    const tax = await calculateTax(selectedPrice.priceAlteration, priceFinal);
    return {
        ...priceFinal,
        tax,
        totalPrice:
            (priceFinal.subTotal || 0) + tax - (priceFinal.discount || 0)
    };
};

const filterUsingsSpecs = (
    p: ProductOffering,
    specs: any,
    catalogPrices?: any
) => {
    let selected = {};

    //array that incluudes names of all the specification in that product offering
    let allSpecsOfProductOffering = p?.prodSpecCharValueUse?.map(
        (spec: any) => spec.name
    );

    //first convert the array of specification such that name will become key and value will become value for object
    let specifications = specs?.map((specification: any) => {
        return {
            [specification.name]: specification.value
        };
    });

    //then convert the array of object into single object
    specifications = Object.assign({}, ...specifications);

    //for every price with the matching catalog constraint now check which constraint matches the all specifications
    catalogPrices?.forEach((price: any) => {
        const specsValues: any = [];

        //for the given price add all the mapped specification into the array
        price.prodSpecCharValueUse?.forEach((val: any) => {
            val.productSpecCharacteristicValue?.forEach((inner: any) => {
                specsValues.push(inner.value);
            });
        });
        let matched = true;

        //with the help of all specification of product offering now match the values of each specification to the specification values inside the price
        allSpecsOfProductOffering?.forEach((spec: any) => {
            if (
                specifications[spec] &&
                specsValues?.includes(specifications[spec])
            ) {
                console.log('matched');
            } else {
                matched = false;
            }
        });
        if (matched) {
            selected = price;
            return selected;
        }
    });
    return selected;
};

export const calculateDiscount = (priceAlteration: any, totalPrice: number) => {
    const discountObject = priceAlteration?.filter(
        (price: any) => price.priceType == 'Discount'
    );
    let discount = 0;
    discountObject?.forEach((element: POPAlteration) => {
        const percentage = element?.price?.percentage || 0;
        if (element['@type'] && element['@type'] != 'percentage') {
            discount = discount + percentage;
        } else {
            discount += (totalPrice * percentage) / 100;
        }
    });
    return discount;
};

export const calculateTax = async (priceAlteration: any, finalPrice: Price) => {
    const totalPrice = finalPrice.subTotal || 0;
    const taxObject = priceAlteration?.filter(
        (price: any) =>
            price.priceType == 'tax' || price['@type'] == 'Reference'
    );
    let totalTax = 0;
    if (taxObject) {
        for (const tax of taxObject) {
            let addition = await addAllTaxes(tax, totalPrice);
            totalTax = totalTax + addition;
        }
    }
    return totalTax;
};

const addAllTaxes = async (tax: any, totalPrice: any) => {
    let totalTax = 0;
    if (tax['@type'] == 'Reference') {
        let res = await lastValueFrom(
            taxService.retrieveProductOfferingPrice(`${tax.id}`)
        );
        if (res.tax) {
            res.tax.forEach((element) => {
                if (element['@type'] == 'RATE') {
                    const amount = (totalPrice * (element?.taxRate || 0)) / 100;
                    totalTax = totalTax + amount;
                } else {
                    totalTax = totalTax + (element?.taxAmount?.value || 0);
                }
            });
        }
    } else if (tax['@type'] && tax['@type'] != 'Value') {
        totalTax = totalTax + (tax?.price?.taxRate || 0);
    } else {
        const amount = (totalPrice * tax?.price?.taxRate) / 100;
        totalTax = totalTax + amount;
    }
    return totalTax;
};

// export const {handlePriceChange, handleActualPrice};
