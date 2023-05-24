import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import {Headers} from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import client from '../../../common/AjaxClient';
import {HttpMethods} from '../../../types/CommonTypes';
import {InventorySeries} from '../model/InventorySeries';
import IFilter from '../../../types/IFilter';
import {InventoryTemplate} from '../model/InventoryTemplate';
/* eslint-disable no-param-reassign */

export default class InventorySeriesService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.16.10.94:9500/api/v1'
            basePath: '',
            redirectUrl: ''
        };
        try {
            this.masterService
                .getServiceUrl('INVENTORY_SERIES_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
            this.masterService
                .getServiceUrl('INVENTORY_SERIES_FILE_DOWNLOAD')
                .subscribe((url) => (this.APIConfiguration.redirectUrl = url));
        } catch (e) {
            console.log('error while fetching inventory series url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getSeriesList(
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
        const response: Observable<HttpResponse<Array<InventorySeries>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/inventorymanagement/master/inventorySeries?${queryParameters.join(
                    '&'
                )}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public getTemplateList(headers: Headers = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<InventoryTemplate>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/inventory/templates`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public validateSeries(
        payload?: any,
        headers: Headers = {}
    ): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Array<InventoryTemplate>>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/inventorymanagement/seriesConfig`,
                payload,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    public uploadFile(
        field: any,
        formdata: any,
        headers: Headers = {'Content-Type': 'multipart/form-data'}
    ): Promise<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        return client(
            `${this.APIConfiguration.basePath}/inventorymanagement/warehouse/inventory/template/uploadFile/${field.inventoryTypeId}/${field.actionType}/${field.inventoryTemplateId}/${field.warehouseId}`,
            HttpMethods.POST,
            formdata,
            false
        );
    }

    public downloadFile(
        fileName: any,
        headers: Headers = {'Content-Type': 'multipart/form-data'}
    ): Promise<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        return client(
            `${this.APIConfiguration.redirectUrl}/inventorymanagement/inventorySeries/download/${fileName}`,
            HttpMethods.GET,
            undefined,
            true
        );
    }

    public downloadLogFile(
        fileName: any,
        headers: Headers = {'Content-Type': 'multipart/form-data'}
    ): Promise<any> {
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        return client(
            `${this.APIConfiguration.redirectUrl}/inventorymanagement/inventorySeries/downloadLog/${fileName}`,
            HttpMethods.GET,
            undefined,
            true
        );
    }
}
