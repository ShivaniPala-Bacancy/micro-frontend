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
import MasterConfigService from '../../master/api/MasterConfigService';

/* eslint-disable no-param-reassign */

export default class InventoryAllocationService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
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

    public getGrnDetails(
        queryString: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `${this.APIConfiguration.basePath}/inventorymanagement/${queryString}`,
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
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
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

    public approveRejectInventory(
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
        const response: Observable<HttpResponse<any>> = this.httpClient.patch(
            `${this.APIConfiguration.basePath}/${queryString}`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    public acceptRejectGRN(
        queryString: string,
        body: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling accept/reject grn.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.patch(
            `${this.APIConfiguration.basePath}/${queryString}`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }
}
