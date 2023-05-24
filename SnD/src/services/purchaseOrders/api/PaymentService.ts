import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Headers } from '../../Headers';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import { IAPIConfiguration } from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import Payment from '../model/Payment';
import IFilter from '../../../types/IFilter';

/* eslint-disable no-param-reassign */
export default class PaymentService {
    masterService = new MasterConfigService();

    private APIConfiguration: IAPIConfiguration;

    private httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('PAYMENT_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching payment url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Gets all Purchase Orders.
     */
    getPayments(
        fields?: string,
        offset?: number,
        limit?: number,
        observe: any = 'body',
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<Payment[]> {
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
                    `${filter.key}${filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }

        headers.Accept = 'application/json;charset=utf-8';
        const url = `${this.APIConfiguration.basePath
            }/payment?${queryParameters.join('&')}`;
        const response: Observable<HttpResponse<Payment[]>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }

    getPaymentsWithFilterCreated(
        payerId: any,
        correlatorId: any,
        fields?: string,
        offset?: number,
        limit?: number,
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<Payment[]> {
        headers.Accept = 'application/json;charset=utf-8';
        const url =
            `${this.APIConfiguration.basePath}/payment` +
            '?payer._id=' +
            payerId +
            '&status=Created' +
            '&type=Credit,Debit' +
            '&correlatorId=' +
            correlatorId +
            '&sort=-paymentDate';
        const response: Observable<HttpResponse<Payment[]>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }

    getPaymentsWithFilterApproveOrRejected(
        payerId: any,
        correlatorId: any,
        fields?: string,
        offset?: number,
        limit?: number,
        headers: Headers = {},
        filters?: IFilter[]
    ): Observable<Payment[]> {
        headers.Accept = 'application/json;charset=utf-8';
        const url =
            `${this.APIConfiguration.basePath}/payment` +
            '?payer._id=' +
            payerId +
            '&status=Approved,Rejected' +
            '&type=Credit,Debit' +
            '&correlatorId=' +
            correlatorId +
            '&sort=-paymentDate';
        const response: Observable<HttpResponse<Payment[]>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }

    makePayment(body: any, headers: any = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}/payment`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    patchPayment(id: string, payload: any): Observable<Payment> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const url = `${this.APIConfiguration.basePath}/payment/${id}`;
        const response: Observable<HttpResponse<Payment>> =
            this.httpClient.patch(url, payload, headers);
        return response.pipe(map((d) => d.response));
    }

    refundAmount(body: any, headers: any = {}): Observable<any> {
        headers.Accept = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}/refund`,
            body,
            headers
        );
        return response.pipe(map((d) => d.response));
    }
}
