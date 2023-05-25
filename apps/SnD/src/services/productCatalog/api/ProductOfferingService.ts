/**
 * Product Catalog Management
 * ## TMF API Reference: TMF620 - Product Catalog Management  ### Release : 20.5 - March 2021  Product Catalog API is one of Catalog Management API Family. Product Catalog API goal is to provide a catalog of products.   ### Operations Product Catalog API performs the following operations on the resources : - Retrieve an entity or a collection of entities depending on filter criteria - Partial update of an entity (including updating rules) - Create an entity (including default values and creation rules) - Delete an entity - Manage notification of events
 *
 * OpenAPI spec version: 4.1.0
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
import IFilter from '../../../types/IFilter';
import {ProductOffering} from '../model/productOffering';
import {ProductOfferingUpdate} from '../model/productOfferingUpdate';
import MasterConfigService from '../../master/api/MasterConfigService';
import HttpClient from '../../HttpClient';

export class ProductOfferingService {
    private APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    private httpClient: IHttpClient;

    urlFromLocalStorage = localStorage.getItem('PRODUCT_OFFERING');

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            if (this.urlFromLocalStorage)
                this.APIConfiguration.basePath = this.urlFromLocalStorage;
        } catch (e) {
            console.log('error while fetching product offering url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Creates a ProductOffering
     * This operation creates a ProductOffering entity.
     * @param productOffering The ProductOffering to be created
     
     */
    public createProductOffering(
        productOffering: ProductOffering,
        observe?: 'body',
        headers?: Headers
    ): Observable<ProductOffering>;

    public createProductOffering(
        productOffering: ProductOffering,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<ProductOffering>>;

    public createProductOffering(
        productOffering: ProductOffering,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!productOffering) {
            throw new Error(
                'Required parameter productOffering was null or undefined when calling createProductOffering.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductOffering>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/productOffering`,
                productOffering as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Deletes a ProductOffering
     * This operation deletes a ProductOffering entity.
     * @param id Identifier of the ProductOffering
     
     */
    public deleteProductOffering(
        id: string,
        observe?: 'body',
        headers?: Headers
    ): Observable<any>;

    public deleteProductOffering(
        id: string,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<any>>;

    public deleteProductOffering(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteProductOffering.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }/productOffering/${encodeURIComponent(String(id))}` as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * List or find ProductOffering objects
     * This operation list or find ProductOffering entities
     * @param fields Comma-separated properties to be provided in response
     * @param offset Requested index for start of resources to be provided in response
     * @param limit Requested number of resources to be provided in response
     
     */
    public listProductOffering(
        fields?: string,
        offset?: number,
        limit?: number,
        observe?: 'body',
        headers?: Headers,
        filters?: IFilter[]
    ): Observable<Array<ProductOffering>>;

    public listProductOffering(
        fields?: string,
        offset?: number,
        limit?: number,
        observe?: 'response',
        headers?: Headers,
        filters?: IFilter[]
    ): Observable<HttpResponse<Array<ProductOffering>>>;

    public listProductOffering(
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
                        filter.operator === 'eq' ? '*=(?i)' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<ProductOffering>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productOffering?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Updates partially a ProductOffering
     * This operation updates partially a ProductOffering entity.
     * @param id Identifier of the ProductOffering
     * @param productOffering The ProductOffering to be updated
     
     */
    public patchProductOffering(
        id: string,
        productOffering: ProductOfferingUpdate,
        observe?: 'body',
        headers?: Headers
    ): Observable<ProductOffering>;

    public patchProductOffering(
        id: string,
        productOffering: ProductOfferingUpdate,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<ProductOffering>>;

    public patchProductOffering(
        id: string,
        productOffering: ProductOfferingUpdate,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchProductOffering.'
            );
        }

        if (!productOffering) {
            throw new Error(
                'Required parameter productOffering was null or undefined when calling patchProductOffering.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductOffering>> =
            this.httpClient.patch(
                `${
                    this.APIConfiguration.basePath
                }/productOffering/${encodeURIComponent(String(id))}`,
                productOffering as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Retrieves a ProductOffering by ID
     * This operation retrieves a ProductOffering entity. Attribute selection is enabled for all first level attributes.
     * @param id Identifier of the ProductOffering
     * @param fields Comma-separated properties to provide in response
     
     */
    public retrieveProductOffering(
        id: string,
        fields?: string,
        observe?: 'body',
        headers?: Headers
    ): Observable<ProductOffering>;

    public retrieveProductOffering(
        id: string,
        fields?: string,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<ProductOffering>>;

    public retrieveProductOffering(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveProductOffering.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductOffering>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productOffering/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public createSkuMapping(
        productOffering: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!productOffering) {
            throw new Error(
                'Required parameter productOffering was null or undefined when calling createProductOffering.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}/productOffering/skus`,
            productOffering as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public patchSkuMapping(
        id: string,
        productOffering: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchProductOffering.'
            );
        }

        if (!productOffering) {
            throw new Error(
                'Required parameter productOffering was null or undefined when calling patchProductOffering.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.patch(
            `${
                this.APIConfiguration.basePath
            }/productOffering/skus/${encodeURIComponent(String(id))}`,
            productOffering as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public retrieveSkuMapping(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveSkuMapping.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductOffering>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productOffering/skus/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public retrieveSkuMappingOnSkuMapping(
        skuId: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!skuId) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveSkuMapping.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductOffering>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productOffering/skus/${encodeURIComponent(
                    String(skuId)
                )}${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public retrieveProductOfferingBasedOnName(
        name: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (name == undefined) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveSkuMapping.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductOffering>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productOffering?name=${encodeURIComponent(
                    String(name)
                )}${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public listSkuMapping(
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

        const response: Observable<HttpResponse<Array<ProductOffering>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productOffering/skus?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }
}