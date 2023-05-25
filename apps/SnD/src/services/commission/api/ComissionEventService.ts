import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import LookupDetail from 'src/services/master/model/LookupDetail';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import {CommissionEvent} from '../model/commissionEvent';
import {CommissionMaster} from '../model/commissionMaster';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from 'src/types/IFilter';
/* eslint-disable no-param-reassign,prettier/prettier,indent,lines-between-class-members */

export default class ComissionMasterService {
    static createEventAndGetBody() {
        throw new Error('Method not implemented.');
    }
    APIConfiguration: IAPIConfiguration;
    masterService = new MasterConfigService();
    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: '',
            productOfferingUrl: ''
        };
        try {
            this.masterService
                .getServiceUrl('COMMISSION_EVENT_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
            this.masterService
                .getServiceUrl('PRODUCT_OFFERING')
                .subscribe(
                    (url) => (this.APIConfiguration.productOfferingUrl = url)
                );
        } catch (e) {
            console.log('error while fetching commission event url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getAllEvents( 
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
        
        const response: Observable<HttpResponse<Array<CommissionEvent>>> =
        this.httpClient.get(
            `${this.APIConfiguration.basePath}?${queryParameters.join(
                '&'
            )}` as any,
            headers
        );
    if (observe === 'body') {
        return response.pipe(map((httpResponse) => httpResponse.response));
    }
    return response;
    }

    public createEvent(
        event: CommissionEvent,
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

        const response: Observable<HttpResponse<CommissionMaster>> =
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

    public getProductTypeDropdown(headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<LookupDetail>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}?offset=0&limit=5`,
                headers
            );

        return response.pipe(map((d) => d.response));
    }

    public updateEvent(
        id: string,
        event: CommissionMaster,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchOrganization.'
            );
        }

        if (!event) {
            throw new Error(
                'Required parameter organization was null or undefined when calling patchOrganization.'
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<CommissionMaster>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}/${encodeURIComponent(
                    String(id)
                )}`,
                event as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    // public updateEvent(
    //     event: CommissionMaster,
    //     observe: any = 'body',
    //     headers: Headers = {}
    // ): Observable<any> {
    //     if (!event) {
    //         throw new Error(
    //             'Required parameter individual was null or undefined when calling createIndividual.'
    //         );
    //     }
    //     headers.Accept = 'application/json;charset=utf-8';
    //     headers['x-auth-token'] =
    //         'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';

    //     const response: Observable<HttpResponse<CommissionMaster>> =
    //         this.httpClient.put(
    //             `${this.APIConfiguration.basePath}/${event.commissionId}`,
    //             event,
    //             headers
    //         );
    //     if (observe === 'body') {
    //         return response.pipe(map((httpResponse) => httpResponse.response));
    //     }
    //     return response;
    // }
}
