import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IHttpClient from '../../IHttpClient';
import { IAPIConfiguration } from '../../IAPIConfiguration';
import { Headers } from '../../Headers';
import HttpResponse from '../../HttpResponse';
import HttpClient from '../../HttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from 'src/types/IFilter';

/* eslint-disable no-param-reassign */

export default class InvoiceService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: '',
        };
        try {
            this.masterService
                .getServiceUrl('INVOICE_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching inventory list url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Get all plans information
     @param headers
     */

    public getPaymentInvoice(
        type: string,
        method: string,
        id: string,
        headers: Headers = {},
    ): Observable<any> {

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath
                }/${method}/${id}/${type}` as any, headers
            );
        return response.pipe(map((httpResponse) => httpResponse.response));
    }
}
