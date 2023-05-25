import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Headers} from '../../Headers';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import PurchaseOrder, {PurchaseOrderListResponse} from '../model/PurchaseOrder';
import MasterConfigService from '../../master/api/MasterConfigService';

/* eslint-disable no-param-reassign */
export default class PurchaseOrderService {
    masterService = new MasterConfigService();

    private APIConfiguration: IAPIConfiguration;

    private httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('PURCHASE_ORDER')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching purchase order url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Gets all Purchase Orders.
     */
    getPurchaseOrders(): Observable<PurchaseOrderListResponse> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const url = `${this.APIConfiguration.basePath}/`;
        const response: Observable<HttpResponse<PurchaseOrderListResponse>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }

    /**
     * Add puchase order
     */

    addPurchaseOrder(
        purchaseOrder: PurchaseOrder,
        userId: string,
        headers: Headers = {}
    ): Observable<PurchaseOrder> {
        if (!purchaseOrder) {
            throw new Error(
                'Required parameter purchaseOrder was null or undefined when calling addPurchaseOrder.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<PurchaseOrder>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/${userId}`,
                purchaseOrder,
                headers
            );
        return response.pipe(map((httpResponse) => httpResponse.response));
    }
}
