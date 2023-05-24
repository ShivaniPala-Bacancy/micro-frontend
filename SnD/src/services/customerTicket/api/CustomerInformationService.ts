import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import {CustomerDetails} from '../model/customerDetails';
import {ServiceDetails} from '../model/serviceDetails';
import MasterConfigService from '../../master/api/MasterConfigService';

/* eslint-disable no-param-reassign */
export default class GetCustomerInformation {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.16.10.94:9091/api/v1/master'
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('CUSTOMER_INFORMATION_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching customer information url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
    * Get customer information for a given accountID
     * Get customer information for a given accountID
     * @param serviceID Get customer information for a given accountID
     @param accountID
     @param headers

     */
    public customerLookUp(
        serviceID: string,
        headers: Headers = {}
    ): Observable<any> {
        if (!serviceID) {
            throw new Error(
                'Required parameter accountID was null or undefined when calling customerLookUpAccountID.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<CustomerDetails>> =
            this.httpClient.get(
                `http://172.16.10.94:9079/auth/v1/crm/customerManagement/services/${serviceID}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public serviceIDLookUp(
        accountID: string,
        headers: Headers = {}
    ): Observable<any> {
        if (!accountID) {
            throw new Error(
                'Required parameter accountID was null or undefined when calling customerLookUpAccountID.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<ServiceDetails>> =
            this.httpClient.get(
                `http://172.16.10.94:9079/auth/v1/crm/customerManagement/accounts/123`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }
}
