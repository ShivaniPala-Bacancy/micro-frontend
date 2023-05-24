import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import {ReportMaster, ReportFields} from '../model/ReportMaster';

/* eslint-disable no-param-reassign */

export default class ReportMasterService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    urlFromLocalStorage = localStorage.getItem('REPORT_MASTER_URL');

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.30.35.120:6044/api/v1/reportMaster'
            basePath: ''
        };
        try {
            if (this.urlFromLocalStorage)
                this.APIConfiguration.basePath = this.urlFromLocalStorage;
        } catch (e) {
            console.log('error while fetching report master url', e);
        }
        this.httpClient = new HttpClient();
    }
    /**
     * Get all plans information
     @param headers
     */

    public getAllReports(
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ReportMaster>>> =
            this.httpClient.get(`${this.APIConfiguration.basePath}`, headers);
        return response.pipe(
            map((d) => {
                return d.response;
            })
        );
    }

    public createReport(
        fields: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ReportFields>>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}`,
                fields,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getAllParameters(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ReportFields>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getDropdownData(
        url: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<ReportFields>>> =
            this.httpClient.get(`${url}`, headers);
        return response.pipe(map((d) => d.response));
    }
}
