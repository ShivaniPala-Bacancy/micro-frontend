import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IFilter from 'src/types/IFilter';
import { Headers } from '../../Headers';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import { IAPIConfiguration } from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import { Currency } from '../model/Currency';

/* eslint-disable no-param-reassign */
export default class CurrencyService {
    masterService = new MasterConfigService();

    APIConfiguration: IAPIConfiguration;

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('CURRENCY_BASE_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching quota management url', e);
        }
        this.httpClient = new HttpClient();
    }

    public getCurrency(
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
                    `${filter.key}${filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Currency>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    retrieveCurrencyAndGetBody(
        id: string,
        fields?: string,
        observe?: 'body',
        headers?: Headers
    ): Observable<Currency> {
        return this.retrieveCurrency(id, fields, observe, headers);
    }

    retrieveCurrency(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling retrieveIndividual.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Currency>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath
                }getCurrencyExchangeRates/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}`,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public getCurrencyExchangeRates(
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
                    `${filter.key}${filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<Currency>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}getCurrencyExchangeRates?${queryParameters.join('&')}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    /**
     * Creates a Currency
     * This operation creates a Currency entity.
     * @param Currency The Currency to be created
     
     */

    public createCurrency(
        currency: Currency,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!currency) {
            throw new Error(
                'Required parameter currency was null or undefined when calling createCurrency.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';

        const response: Observable<HttpResponse<Currency>> = this.httpClient.post(
            `${this.APIConfiguration.basePath}`,
            currency as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    deleteCurrency(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling delete Currency.'
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${this.APIConfiguration.basePath}${encodeURIComponent(String(id))}` as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public putCurrency(
        id: string,
        currency: Currency,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchQuote.'
            );
        }

        if (!currency) {
            throw new Error(
                'Required parameter quote was null or undefined when calling patchQuote.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Currency>> = this.httpClient.put(
            `${this.APIConfiguration.basePath}${encodeURIComponent(
                String(id)
            )}`,
            currency as any,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }




}
    // public listQuote(
    //     fields?: string,
    //     offset?: number,
    //     limit?: number,
    //     observe: any = 'body',
    //     headers: Headers = {},
    //     filters?: IFilter[]
    // ): Observable<any> {
    //     const queryParameters: string[] = [];
    //     if (fields !== undefined) {
    //         queryParameters.push(
    //             `fields=${encodeURIComponent(String(fields))}`
    //         );
    //     }
    //     if (offset !== undefined) {
    //         queryParameters.push(
    //             `offset=${encodeURIComponent(String(offset))}`
    //         );
    //     }
    //     if (limit !== undefined) {
    //         queryParameters.push(`limit=${encodeURIComponent(String(limit))}`);
    //     }
    //     if (filters !== undefined) {
    //         filters.forEach((filter: IFilter) => {
    //             queryParameters.push(
    //                 `${filter.key}${
    //                     filter.operator === 'eq' ? '*=' : filter.operator
    //                 }${encodeURIComponent(String(filter.value))}`
    //             );
    //         });
    //     }

    //     headers.Accept = 'application/json;charset=utf-8';

    //     const response: Observable<HttpResponse<Array<Quote>>> =
    //         this.httpClient.get(
    //             `${this.APIConfiguration.basePath}?${queryParameters.join(
    //                 '&'
    //             )}` as any,
    //             headers
    //         );
    //     if (observe === 'body') {
    //         return response.pipe(map((httpResponse) => httpResponse.response));
    //     }
    //     return response;
    // }