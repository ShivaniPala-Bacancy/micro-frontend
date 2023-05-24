/**
 *
 *
 *
 *
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import { IAPIConfiguration } from '../../IAPIConfiguration';
import { Headers } from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import { InventoryTransfer } from '../model/inventoryTransfer';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from '../../../types/IFilter';

/* eslint-disable no-param-reassign */

export default class InventoryTransferService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.16.10.94:9500/api/v1'
            basePath: '',
            geographicSiteUrl: '',
        };
        try {
            this.masterService
                .getServiceUrl('INVENTORY_TRANSFER_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
            this.masterService
                .getServiceUrl('GEOGRAPHIC_SITE')
                .subscribe((url) => (this.APIConfiguration.geographicSiteUrl = url));
        } catch (e) {
            console.log('error while fetching inventory transfer url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get customer information for a given accountID
     * Get customer information for a given accountID
     * @param serviceID Get customer information for a given accountID
     @param queryString
     @param headers
     */

    public getInventoryTransfer(
        queryString: string,
        relatedSite?: string,
        type?: string,
        observe: any = 'body',
        headers: Headers = {},
        offset?: number,
        limit?: number,
        filter?: any
    ): Observable<any> {
        if (!queryString) {
            throw new Error(
                'Required parameter limit and offset was null or undefined when calling getInventoryTransfer.'
            );
        }
        const queryParameters: string[] = [];
        if (filter != undefined) {
            filter.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}${filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        if (offset !== undefined) {
            queryParameters.push(
                `offset=${encodeURIComponent(String(offset))}`
            );
        }
        if (limit !== undefined) {
            queryParameters.push(`limit=${encodeURIComponent(String(limit))}`);
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath
                }/${queryString}?sort=-orderDate&type=${type}&${relatedSite}&${queryParameters.join('&')}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getGeographicSite(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter limit and offset was null or undefined when calling getInventoryTransfer.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${this.APIConfiguration.geographicSiteUrl}/geographicSite?fields=id,name&relatedParty.id=${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getInventoryTransferType(
        type: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!type) {
            throw new Error(
                'Required parameter limit and offset was null or undefined when calling getInventoryTransfer.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/${type}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getSourceSite(
        url?: string,
        parentId?: any,
        type?: any,
        term?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${url}/geographicSite?fields=id,name,@type,subType&relatedParty.id=${parentId}&type=${type
                }&name*=${term}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getTargetSite(
        url?: string,
        type?: any,
        term?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${url}/geographicSite?fields=id,name,@type,subType&type=${type
                }&name*=${term}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getSiteAddress(
        url?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${url}/geographicAddress`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getProductName(
        url?: string,
        Category?: any,
        term?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                Category && Category[0] ?
                    `${url}/productOffering?fields=name,description,category,type&category.id=${Category[0] && Category[0].parent
                    }&type*(?i)Non&type*(?i)Ser&name*=${term}`
                    :
                    `${url}/productOffering?fields=name,description,category,type&type*(?i)Non&type*(?i)Ser&name*=${term}`
                ,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllProducts(
        url?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(`${url}/productOffering?type*(?i)Non&type*(?i)Ser`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getSerialNumbers(
        url?: string,
        queryString?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.get(
                `${url}${'/inventoryTransfer/transfers/'}${queryString}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public validateInventory(
        queryString: string,
        body: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling validateInventory.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/${queryString}`,
                body,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public dispatchOrder(
        queryString: string,
        body: InventoryTransfer,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling validateInventory.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}/${queryString}`,
                body,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public createOrder(
        queryString: string,
        body: InventoryTransfer,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling validateInventory.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/${queryString}`,
                body,
                headers
            );
        return response.pipe(map((d) => d.response));
    }


    public allocateInventory(
        queryString: string,
        body: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling allocateInventory.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}${queryString}`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    public acceptInventory(
        queryString: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}/${queryString}`,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    public rejectInventory(
        data: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}/${data}`,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    public submitInventory(
        queryString: string,
        body: [InventoryTransfer],
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling allocateInventory.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<InventoryTransfer>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/${queryString}`,
                body,
                headers
            );
        return response.pipe(map((d) => d.response));
    }
}
