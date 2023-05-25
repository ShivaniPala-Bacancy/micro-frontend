import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import {SalesChannelTarget} from '../model/salesChannelTarget';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from 'src/types/IFilter';

/* eslint-disable no-param-reassign,prettier/prettier,indent,lines-between-class-members */

export default class ComissionMasterService {
    static createTargetAndGetBody(record: SalesChannelTarget) {
        throw new Error('Method not implemented.');
    }
    APIConfiguration: IAPIConfiguration;
    masterService = new MasterConfigService();
    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('COMMISSION_TARGET_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching commission target url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getAllTargets(
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
        const response: Observable<HttpResponse<Array<SalesChannelTarget>>> =
            this.httpClient.get(`${this.APIConfiguration.basePath}?${queryParameters.join(
                '&'
            )}` as any,
            headers);
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public createTarget(
        event: SalesChannelTarget,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!event) {
            throw new Error(
                'Required parameter individual was null or undefined when calling createIndividual.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';

        const response: Observable<HttpResponse<SalesChannelTarget>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}`,
                event,
                headers
            );
        if (observe === 'body') {
            return response.pipe(
                map((d) => {
                    return {
                        response: d.response,
                        id: d.location?.replace(
                            `${this.APIConfiguration.basePath}/`,
                            ''
                        )
                    };
                })
            );
        }
        return response;
    }

    public editTarget(
        event: SalesChannelTarget,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!event) {
            throw new Error(
                'Required parameter individual was null or undefined when calling createIndividual.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';

        const response: Observable<HttpResponse<SalesChannelTarget>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}/${event.id}`,
                event,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public getAddByDropdown(
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<SalesChannelTarget>>> =
            this.httpClient.get('http://localhost:3004/addBy', headers);
        return response.pipe(map((d) => d.response));
    }
}
