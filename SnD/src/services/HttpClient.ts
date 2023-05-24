import { Observable, from } from 'rxjs';
import IHttpClient from './IHttpClient';
import IFilter from '../types/IFilter';
import HttpResponse from './HttpResponse';
import { Headers } from './Headers';

/* eslint-disable class-methods-use-this,prefer-object-spread,prefer-const,no-param-reassign,no-unused-vars */
class HttpClient implements IHttpClient {
    get(url: string, headers?: Headers): Observable<HttpResponse> {
        return this.performNetworkCall(url, 'get', undefined, headers);
    }

    post(
        url: string,
        body: {} | FormData,
        headers?: Headers
    ): Observable<HttpResponse> {
        return this.performNetworkCall(
            url,
            'post',
            this.getJsonBody(body),
            this.addJsonHeaders(headers)
        );
    }

    put(url: string, body: {}, headers?: Headers): Observable<HttpResponse> {
        return this.performNetworkCall(
            url,
            'put',
            this.getJsonBody(body),
            this.addJsonHeaders(headers)
        );
    }

    patch(url: string, body: {}, headers?: Headers): Observable<HttpResponse> {
        return this.performNetworkCall(
            url,
            'PATCH',
            this.getJsonBody(body),
            this.addJsonHeaders(headers)
        );
    }

    delete(
        url: string,
        headers?: Headers,
        body?: any
    ): Observable<HttpResponse> {
        if (body)
            return this.performNetworkCall(
                url,
                'delete',
                this.getJsonBody(body),
                this.addJsonHeaders(headers)
            );
        return this.performNetworkCall(url, 'delete', undefined, headers);
    }

    getJsonBody(body: {} | FormData) {
        return !(body instanceof FormData) ? JSON.stringify(body) : body;
    }

    addJsonHeaders(headers: Headers | undefined) {
        return Object.assign(
            {},
            {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            headers
        );
    }

    performNetworkCall(
        url: string,
        method: string,
        body?: any,
        headers?: Headers
    ): Observable<HttpResponse> {
        const token = localStorage.getItem('token');
        if (token) {
            if (headers === undefined) headers = {};
            headers.Authorization = `Bearer ${token}`;
        }
        const obj = {
            method,
            body,
            headers
        };
        const promise = fetch(url, obj).then((response) => {
            const responseHeaders: Headers = {};
            response.headers.forEach((value, name) => {
                responseHeaders[name.toString().toLowerCase()] = value;
            });
            return response.text().then((text) => {
                let contentType = responseHeaders['content-type'] || '';

                let payload = contentType.match('application/json')
                    ? text && JSON?.parse(text)
                    : text;
                let { location } = responseHeaders;
                let httpResponse = new HttpResponse(
                    payload,
                    response.status,
                    headers,
                    `${location}`
                );
                if (response.status >= 400) throw httpResponse;
                return httpResponse;
            });
        });
        return from(promise);
    }

    filtersToUriQuery(filters: IFilter[]): string {
        return filters
            .map(
                (filter) =>
                    `${filter.key}${filter.operator}${filter.value || filter.values
                    }`
            )
            .reduce((accu, curr) => `${accu}&${curr}`, '&');
    }
}

export default HttpClient;
