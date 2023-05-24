import {Headers} from './Headers';
/* eslint-disable no-unused-vars,no-useless-constructor,no-empty-function */
class HttpResponse<T = any> {
    response: T;

    status: number;

    headers: Headers | undefined;

    location: string | undefined;

    constructor(
        response: T,
        status: number,
        headers?: Headers,
        location?: string
    ) {
        this.response = response;
        this.status = status;
        this.headers = headers;
        this.location = location;
    }
}

export default HttpResponse;
