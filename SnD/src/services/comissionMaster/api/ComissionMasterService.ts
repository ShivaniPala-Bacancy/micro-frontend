import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import {Plans, Zones} from '../model/commissionPlan';
import MasterConfigService from '../../master/api/MasterConfigService';
/* eslint-disable no-param-reassign */

export default class ComissionMasterService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: '',
            geographicSiteUrl: '',
            partyManagementUrl: ''
        };
        try {
            this.masterService
                .getServiceUrl('COMMISSION_MASTER_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
            this.masterService
                .getServiceUrl('GEOGRAPHIC_SITE')
                .subscribe(
                    (url) => (this.APIConfiguration.geographicSiteUrl = url)
                );
            this.masterService
                .getServiceUrl('ORGANIZATION_URL')
                .subscribe(
                    (url) => (this.APIConfiguration.partyManagementUrl = url)
                );
        } catch (e) {
            console.log('error while fetching comission master url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getAllPlans(headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Plans>>> =
            this.httpClient.get(`${this.APIConfiguration.basePath}`, headers);
        return response.pipe(
            map((d) => {
                return d.response;
            })
        );
    }

    public getAllZones(headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.get(
                `${this.APIConfiguration.geographicSiteUrl}/geographicSite?offset=0&limit=20&type=region`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllHubs(
        type: string,
        id: string,
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.get(
                `${this.APIConfiguration.geographicSiteUrl}/geographicSite?offset=0&limit=20&type=${type}&siteRelationship.id=${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllUserTypes(headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.get('http://localhost:3004/userTypes', headers);
        return response.pipe(map((d) => d.response));
    }

    public getEventSubTypes(headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.get(`http://localhost:3004/eventType`, headers);
        return response.pipe(map((d) => d.response));
    }

    public getAllDealers(
        query?: string,
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.get(
                `${this.APIConfiguration.partyManagementUrl}/organization?offset=0&limit=20&name*=${query}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public addNewPlan(
        plan: any,
        url: string,
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${url}`,
                plan,
                headers
            );
        return response.pipe(
            map((d) => {
                return {
                    response: d.response,
                    id: d.location?.replace(
                        `${this.APIConfiguration.basePath}${url}/`,
                        ''
                    )
                };
            })
        );
    }

    public editPlan(
        plan: any,
        url: string,
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<Zones>>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}${url}/${plan.id}`,
                plan,
                headers
            );
        return response.pipe(map((d) => d.response));
    }
}
