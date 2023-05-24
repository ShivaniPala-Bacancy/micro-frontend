import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import {ProductOrder} from '../../productOrder/model/productOrder';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from 'src/types/IFilter';

/* eslint-disable no-param-reassign */

export default class InventoryListService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: '',
            partyManagementUrl: '',
            paymentUrl: '',
            inventoryUrl: ''
        };
        try {
            this.masterService
                .getServiceUrl('INVENTORY_LIST_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
            this.masterService
                .getServiceUrl('INDIVIDUAL_URL')
                .subscribe(
                    (url) => (this.APIConfiguration.partyManagementUrl = url)
                );
            this.masterService
                .getServiceUrl('PAYMENT_URL')
                .subscribe((url) => (this.APIConfiguration.paymentUrl = url));
            this.masterService
                .getServiceUrl('INVENTORY_SERIES_URL')
                .subscribe((url) => (this.APIConfiguration.inventoryUrl = url));
        } catch (e) {
            console.log('error while fetching inventory list url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getAllProductsList(
        fields?: string,
        offset?: number,
        limit?: number,
        observe: any = 'body',
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<any> {
        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }
        if (offset !== undefined) {
            queryParameters.push(
                `offset=${encodeURIComponent(String(offset))}`
            );
        }
        if (limit !== undefined) {
            queryParameters.push(`limit=${encodeURIComponent(String(limit))}`);
        }
        if (filters !== undefined) {
            filters.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}${
                        filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<ProductOrder>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }?type=CustomerOrder&${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Get all plans information
     @param id
     */

    public getCustomerDetails(
        id: string,
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ProductOrder>>> =
            this.httpClient.get(
                `${this.APIConfiguration.partyManagementUrl}/individual/${id}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllPayments(id: string, headers: Headers = {}): Observable<any> {
        const queryParameters: string[] = [];
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ProductOrder>>> =
            this.httpClient.get(
                `${this.APIConfiguration.paymentUrl}/payment/${id}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllSerials(id: string, headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ProductOrder>>> =
            this.httpClient.get(
                `${this.APIConfiguration.inventoryUrl}/inventorymanagement?posOrderId=${id}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public validateInventory(
        queryString: string,
        body: any,
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
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.inventoryUrl}/${queryString}`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    public soldInventory(
        url: string,
        body: any,
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
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.inventoryUrl}/${url}`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    public returnItems(body: any, headers: Headers = {}): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling validateInventory.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.inventoryUrl}/inventorymanagement/customer/returns`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }
}
