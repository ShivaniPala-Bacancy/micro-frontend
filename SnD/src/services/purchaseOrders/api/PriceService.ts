import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import {Price} from '../model/Price';

/* eslint-disable no-param-reassign */
export default class PurchasePriceService {
    masterService = new MasterConfigService();

    private APIConfiguration: IAPIConfiguration;

    private httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.16.10.94:9900/auth/v1'
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('PRODUCT_ORDER_INTERNAL_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching purchase order url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Gets all Purchase Orders.
     */
    getPrices(payload: any): Observable<Price> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const url = `${this.APIConfiguration.basePath}/productOffer/price`;
        const response: Observable<HttpResponse<Price>> = this.httpClient.post(
            url,
            payload,
            headers
        );
        return response.pipe(map((d) => d.response));
    }
}
