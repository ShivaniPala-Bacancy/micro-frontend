export interface IAPIConfiguration {
    apiKeys?: { [key: string]: string };
    username?: string;
    password?: string;
    accessToken?: string | (() => string);
    basePath?: string;
    withCredentials?: boolean;
    authUrl?: string;
    redirectUrl?: string;
    translationUrl?: string;
    partyManagementUrl?: string;
    partyAccountUrl?: string;
    paymentUrl?: string;
    geographicSiteUrl?: string;
    productOfferingUrl?: string;
    accountManagementUrl?: string;
    inventoryUrl?: string;
    promotionsUrl?: string;
}
