/**
 * API CustomerBill
 * ## TMF API Reference: TMF 678 - Customer bill Management  ### Release: 19.5 - December 2019  The Customer Bill Management API allows to find and retrieve one or several customer bills (also called invoices) produced for a customer. A customer bill is an electronic or paper document produced at the end of the billing process. The customer bill gathers and displays different items (applied customer billing rates generated during the rating and billing processes) to be charged to a customer. It represents a total amount due for all the products during the billing period and all significant information like dates, bill reference... This API provides also operations to find and retrieve the details of applied customer billing rates presented on a customer bill.  Finally, this API allows to request in real-time a customer bill creation and to manage this request.  ### Resources  - customerBill - appliedCustomerBillingRate - customerBillOnDemand - billingCycle  ### Operations Customer Bill Management API performs the following operations : - Retrieve a customer bill or a collection of customer bills depending on filter criteria. - Partial update of  a customer bill (for administration purposes). -  Retrieve an applied customer billing rate or a collection of applied customer billing rates depending on filter criteria. -  Create a customer bill on demand request, retrieve one or a collection of  customer bill on demand request(s) depending on filter criteria.  - Manage notification of events on customer bill and customer bill on demand.  Copyright © TM Forum 2018. All Rights Reserved.
 *
 * OpenAPI spec version: 4.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';

import {CustomerBill} from '../model/customerBill';
import {CustomerBillUpdate} from '../model/customerBillUpdate';
import IFilter from 'src/types/IFilter';

export default class CustomerBillService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.30.35.130:9876'
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('CUSTOMER_BILL_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching basepath url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * List or find CustomerBill objects
     * This operation list or find CustomerBill entities
     * @param fields Comma-separated properties to be provided in response
     * @param offset Requested index for start of resources to be provided in response
     * @param limit Requested number of resources to be provided in response
     
     */
    public listCustomerBill(
        fields?: string,
        offset?: number,
        limit?: number,
        observe?: 'body',
        headers?: Headers,
        filters?: any
    ): Observable<Array<CustomerBill>>;
    public listCustomerBill(
        fields?: string,
        offset?: number,
        limit?: number,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<Array<CustomerBill>>>;
    public listCustomerBill(
        fields?: string,
        offset?: number,
        limit?: number,
        observe: any = 'body',
        headers: Headers = {},
        filter?: any
    ): Observable<any> {
        let queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                'fields=' + encodeURIComponent(String(fields))
            );
        }
        if (filter != undefined) {
            filter.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}${
                        filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        if (offset !== undefined) {
            queryParameters.push(
                'offset=' + encodeURIComponent(String(offset))
            );
        }
        if (limit !== undefined) {
            queryParameters.push('limit=' + encodeURIComponent(String(limit)));
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<CustomerBill>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/customerBill?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Updates partially a CustomerBill
     * This operation updates partially a CustomerBill entity.
     * @param id Identifier of the CustomerBill
     * @param customerBill The CustomerBill to be updated
     
     */
    public patchCustomerBill(
        id: string,
        customerBill: CustomerBillUpdate,
        observe?: 'body',
        headers?: Headers
    ): Observable<CustomerBill>;
    public patchCustomerBill(
        id: string,
        customerBill: CustomerBillUpdate,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<CustomerBill>>;
    public patchCustomerBill(
        id: string,
        customerBill: CustomerBillUpdate,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchCustomerBill.'
            );
        }

        if (!customerBill) {
            throw new Error(
                'Required parameter customerBill was null or undefined when calling patchCustomerBill.'
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<CustomerBill>> =
            this.httpClient.patch(
                `${
                    this.APIConfiguration.basePath
                }/customerBill/${encodeURIComponent(String(id))}`,
                customerBill as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Retrieves a CustomerBill by ID
     * This operation retrieves a CustomerBill entity. Attribute selection is enabled for all first level attributes.
     * @param id Identifier of the CustomerBill
     * @param fields Comma-separated properties to provide in response
     
     */
    public retrieveCustomerBill(
        id: string,
        fields?: string,
        observe?: 'body',
        headers?: Headers
    ): Observable<CustomerBill>;
    public retrieveCustomerBill(
        id: string,
        fields?: string,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<CustomerBill>>;
    public retrieveCustomerBill(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveCustomerBill.'
            );
        }

        let queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                'fields=' + encodeURIComponent(String(fields))
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<CustomerBill>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/customerBill/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }
}