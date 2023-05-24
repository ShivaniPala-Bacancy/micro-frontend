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
import {ProductSpecification} from '../model/productSpecification';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from 'src/types/IFilter';

export class ProductSpecificationService {
    private APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    private httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: isDevelopment() ? DEV_BASE_PATH : PROD_BASE_PATH
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('PRODUCT_SPECIFICATION')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching product specification url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Creates a ProductSpecification
     * This operation creates a ProductSpecification entity.
     * @param productSpecification The ProductSpecification to be created
     
     */
    public createProductSpecificationAndGetBody(
        productSpecification: ProductSpecification,
        observe?: 'body',
        headers?: Headers
    ): Observable<ProductSpecification> {
        return this.createProductSpecification(
            productSpecification,
            observe,
            headers
        );
    }

    public createProductSpecification(
        productSpecification: ProductSpecification,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!productSpecification) {
            throw new Error(
                'Required parameter productSpecification was null or undefined when calling createProductSpecification.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductSpecification>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/productSpecification`,
                productSpecification as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Deletes a ProductSpecification
     * This operation deletes a ProductSpecification entity.
     * @param id Identifier of the ProductSpecification
     
     */
    public deleteProductSpecificationAndGetBody(
        id: string,
        observe?: 'body',
        headers?: Headers
    ): Observable<any> {
        return this.deleteProductSpecification(id, observe, headers);
    }

    public deleteProductSpecificationAndGetResponse(
        id: string,
        observe?: 'response',
        headers?: Headers
    ): Observable<any> {
        return this.deleteProductSpecification(id, observe, headers);
    }

    public deleteProductSpecification(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteProductSpecification.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }/productSpecification/${encodeURIComponent(String(id))}` as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * List or find ProductSpecification objects
     * This operation list or find ProductSpecification entities
     * @param fields Comma-separated properties to be provided in response
     * @param offset Requested index for start of resources to be provided in response
     * @param limit Requested number of resources to be provided in response
     
     */
    public listProductSpecificationAndGetBody(
        fields?: string,
        offset?: number,
        limit?: number,
        observe?: 'body',
        headers?: Headers
    ): Observable<HttpResponse<Array<ProductSpecification>>> {
        return this.listProductSpecification(
            fields,
            offset,
            limit,
            observe,
            headers
        );
    }

    public listProductSpecification(
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

        const response: Observable<HttpResponse<Array<ProductSpecification>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productSpecification?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Updates partially a ProductSpecification
     * This operation updates partially a ProductSpecification entity.
     * @param id Identifier of the ProductSpecification
     * @param productSpecification The ProductSpecification to be updated
     
     */
    public patchProductSpecification(
        id: string,
        productSpecification: ProductSpecification,
        observe?: 'body',
        headers?: Headers
    ): Observable<ProductSpecification>;

    public patchProductSpecification(
        id: string,
        productSpecification: ProductSpecification,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<ProductSpecification>>;

    public patchProductSpecification(
        id: string,
        productSpecification: ProductSpecification,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchProductSpecification.'
            );
        }

        if (!productSpecification) {
            throw new Error(
                'Required parameter productSpecification was null or undefined when calling patchProductSpecification.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductSpecification>> =
            this.httpClient.patch(
                `${
                    this.APIConfiguration.basePath
                }/productSpecification/${encodeURIComponent(String(id))}`,
                productSpecification as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Retrieves a ProductSpecification by ID
     * This operation retrieves a ProductSpecification entity. Attribute selection is enabled for all first level attributes.
     * @param id Identifier of the ProductSpecification
     * @param fields Comma-separated properties to provide in response
     
     */
    public retrieveProductSpecification(
        id: string,
        fields?: string,
        observe?: 'body',
        headers?: Headers
    ): Observable<ProductSpecification>;

    public retrieveProductSpecification(
        id: string,
        fields?: string,
        observe?: 'response',
        headers?: Headers
    ): Observable<HttpResponse<ProductSpecification>>;

    public retrieveProductSpecification(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveProductSpecification.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<ProductSpecification>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/productSpecification/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public validateSKU(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required sku id was null or undefined when calling validateSKU.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `http://172.30.35.130:8989/api/v2/productSpecification/validate/skuId/${encodeURIComponent(
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