import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Headers} from '../../Headers';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';

/* eslint-disable no-param-reassign, dot-notation */
export default class RealmConfigService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('REALM_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching realm url', e);
        }
        this.httpClient = new HttpClient();
    }

    public getRealmUrl(
        tenantId: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<HttpResponse<any>> {
        if (!tenantId) {
            throw new Error(
                'Required parameter tenantId was null or undefined when calling getRealmUrl.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `${
                this.APIConfiguration.basePath
            }/realm/getRealmUrl/${encodeURIComponent(
                String(tenantId)
            )}?${queryParameters.join('&')}` as any,

            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public getAllTenants(
        _tenantId?: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<HttpResponse<any>> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `${this.APIConfiguration.basePath}/tenant/viewAll` as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }
}
