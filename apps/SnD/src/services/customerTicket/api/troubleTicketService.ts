/**
 * CRM System API
 * CRM System API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: test@gmail.com
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
import { TroubleTicket } from '../model/troubleTicket';
import MasterConfigService from '../../master/api/MasterConfigService';
/* eslint-disable no-param-reassign */

export default class GetTroubleTicket {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.16.10.94:9899/api/v1/'
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('TROUBLE_TICKET_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching trouble ticket url', e);
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

    public TroubleTicketLookUp(
        queryString: string,
        headers: Headers = {}
    ): Observable<any> {
        // if (!queryString) {
        //     throw new Error(
        //         'Required parameter accountID was null or undefined when calling TroubleTicketLookUp.'
        //     );
        // }
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<TroubleTicket>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}ticket-management/1.0.0/trouble_ticket/${queryString}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public createTroubleTicket(
        queryString: string,
        body: TroubleTicket,
        headers: Headers = {}
    ): Observable<any> {
        if (body === null || body === undefined) {
            throw new Error(
                'Required parameter body was null or undefined when calling createTroubleTicket.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<TroubleTicket>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}ticket-management/1.0.0/trouble_ticket`,
                body,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    deleteTicket(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling delete ticket.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${this.APIConfiguration.basePath}${id}`,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }
}