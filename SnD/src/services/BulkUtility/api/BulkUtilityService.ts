import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import IFilter from '../../../types/IFilter';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import client from '../../../common/AjaxClient';
import {HttpMethods} from '../../../types/CommonTypes';
import {BulkUtility} from '../model/BulkUtility';
/* eslint-disable no-param-reassign */

export default class BulkUtilityService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
            // basePath: 'http://172.30.35.130:9300/api/v1/bulkUtility '
        };
        try {
            this.masterService
                .getServiceUrl('BULK_UTILITY_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching bulk utility url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getListDetails(
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
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<BulkUtility>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}?${queryParameters.join(
                    '&'
                )}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public uploadFile(
        formdata: any,
        observe: any = 'body',
        headers: Headers = {'Content-Type': 'multipart/form-data'}
    ): Promise<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        return client(
            `${this.APIConfiguration.basePath}`,
            HttpMethods.POST,
            formdata,
            true
        );
    }

    public uploadData(
        body: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling createInventory.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}/bulkProcess`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }
}
