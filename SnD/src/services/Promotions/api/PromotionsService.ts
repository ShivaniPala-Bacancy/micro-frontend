import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import { IAPIConfiguration } from '../../IAPIConfiguration';
import { Headers } from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import { Promotions } from '../model/Promotions';
import IFilter from 'src/types/IFilter';

/* eslint-disable no-param-reassign */

export default class PromotionsService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.30.35.120:6044/api/v1/reportMaster'
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('PROMOTIONS_SCREEN_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching report master url', e);
        }
        this.httpClient = new HttpClient();
    }
    /**
     * Get all plans information
     @param headers
     */

    public getAllPromotions(
        fields?: string,
        offset?: number,
        limit?: number,
        observe: any = 'body',
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<Array<Promotions>> {
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
                    `${filter.key}${filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Promotions>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}?${queryParameters.join('&')}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAppliedPromotions(
        fields?: string,
        offset?: number,
        limit?: number,
        observe: any = 'body',
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<Array<Promotions>> {
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
                    `${filter.key}${filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Promotions>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/search?${queryParameters.join('&')}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public createPromotion(
        payload: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<Promotions> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Promotions>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}`,
                payload,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public editPromotion(
        id: string,
        payload: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<Promotions> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Promotions>> =
            this.httpClient.patch(
                `${this.APIConfiguration.basePath}/${id}`,
                payload,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getPromotionById(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<Promotions> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Promotions>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public deletePromotion(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<Promotions> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Promotions>> =
            this.httpClient.delete(
                `${this.APIConfiguration.basePath}/${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }
}
