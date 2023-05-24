import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import {Dates, Shops, ShopResponse, RoutePlan} from '../model/RoutePlan';
import IFilter from 'src/types/IFilter';

/* eslint-disable no-param-reassign */

export default class RoutePlanService {
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
                .getServiceUrl('ROUTE_PLAN_URL')
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

    public getAllDates(
        date: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<Array<Dates>> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Dates>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/dates/${date}`,
                headers
            );
        return response.pipe(
            map((d) => {
                return d.response;
            })
        );
    }

    public getShopsList(
        fields: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<ShopResponse> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<ShopResponse>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/pdvs`,
                fields,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public suggestRoute(
        payload: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<RoutePlan> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<RoutePlan>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/suggested`,
                payload,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public saveRoute(
        payload: RoutePlan,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<RoutePlan> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<RoutePlan>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/routes`,
                payload,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public editRoute(
        id: string,
        payload: RoutePlan,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<RoutePlan> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<RoutePlan>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}/routes/${id}`,
                payload,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllRoutes(
        fields?: string,
        offset?: number,
        limit?: number,
        observe: any = 'body',
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<RoutePlan> {
        let queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                'fields=' + encodeURIComponent(String(fields))
            );
        }
        if (offset !== undefined) {
            queryParameters.push(
                'offset=' + encodeURIComponent(String(offset))
            );
        }
        if (limit !== undefined) {
            queryParameters.push('limit=' + encodeURIComponent(String(limit)));
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
        const response: Observable<HttpResponse<RoutePlan>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/search?${queryParameters.join('&')}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getRouteById(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<RoutePlan> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<RoutePlan>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/routes/${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public deleteRoute(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<RoutePlan> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<RoutePlan>> =
            this.httpClient.delete(
                `${this.APIConfiguration.basePath}/routes/${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }
}
