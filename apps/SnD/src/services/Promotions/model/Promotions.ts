interface Promotions {
    id?: string,
    productOfferId: string,
    skuId: string,
    promotionMessage: string,
    startDate: string,
    endDate: string,
    regionType: string,
    regionId: string,
    shopId: null
}

export type {
    Promotions
}