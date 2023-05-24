import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Headers} from '../../Headers';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import WorkflowOrderDetails from '../model/WorkflowOrderDetails';
import AsycTaskCallBackPojo from '../model/AsycTaskCallBackPojo';
import WorkflowResponsePojo from '../model/WorkflowResponsePojo';
import MasterConfigService from '../../master/api/MasterConfigService';
import IFilter from '../../../types/IFilter';

/* eslint-disable no-param-reassign,dot-notation */
export default class WorkflowOrderService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            // basePath: 'http://172.30.35.130:9876'
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('INBOX_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching basepath url', e);
        }
        this.httpClient = new HttpClient();
    }

    bulkTaskConfirmation(
        data: AsycTaskCallBackPojo[],
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!data) {
            throw new Error(
                'Required parameter data was null or undefined when calling createUser.'
            );
        }
        headers['Accept'] = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<WorkflowResponsePojo>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}/task/remarks`,
                data
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Add Task Confirmation.
     */
    taskConfirmation(
        data: AsycTaskCallBackPojo,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!data) {
            throw new Error(
                'Required parameter data was null or undefined when calling createUser.'
            );
        }
        headers['Accept'] = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<WorkflowResponsePojo>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/callback`,
                data,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Gets all Workflow Orders.
     */
    getWorkflowOrders(task: string, role: string): Observable<any> {
        if (!task) {
            throw new Error(
                'Required parameter task was null or undefined when calling getWorkflowOrders.'
            );
        }
        if (!role) {
            throw new Error(
                'Required parameter role was null or undefined when calling getWorkflowOrders.'
            );
        }
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const url = `${this.APIConfiguration.basePath}/tasks/${task}/${role}`;
        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }
    /**
     * Get TimeLine based on Request Id
     */

    getTimeLine(requestId: string | undefined): Observable<any> {
        if (!requestId) {
            throw new Error(
                'Required parameter requestId was null or undefined when calling getTimeLine.'
            );
        }
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const url = `${this.APIConfiguration.basePath}/inbox/task/${requestId}`;
        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }

    /**
     *
     * List workflow order
     */

    public listWorkflowOrder(
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

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<any>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/inbox/tasks?sort=-addDate&workflowName=Create Individual,Create Organization${queryParameters.join(
                    '&'
                )}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Add workflowOrder order
     */

    addWorkflowOrder(
        workflowOrder: WorkflowOrderDetails,
        id: string,
        headers: Headers = {}
    ): Observable<WorkflowOrderDetails> {
        if (!workflowOrder) {
            throw new Error(
                'Required parameter workflowOrder was null or undefined when calling addWorkflowOrder.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/inbox/${id}`,
                workflowOrder,
                headers
            );
        return response.pipe(map((httpResponse) => httpResponse.response));
    }

    /**
     * Delete workflowOrder order
     */

    deleteWorkflowOrder(
        id: string,
        headers: Headers = {}
    ): Observable<WorkflowOrderDetails> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteWorkflowOrder.'
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.delete(
                `${this.APIConfiguration.basePath}/inbox/${encodeURIComponent(
                    String(id)
                )}`,
                headers
            );

        return response.pipe(map((httpResponse) => httpResponse.response));
    }

    /**
     * Patch workflowOrder order
     */
    patchWorkflowOrder(
        id: string,
        workflowOrder: WorkflowOrderDetails,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchWorkflowOrder.'
            );
        }

        if (!workflowOrder) {
            throw new Error(
                'Required parameter workflowOrder was null or undefined when calling patchWorkflowOrder.'
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.patch(
                `${this.APIConfiguration.basePath}/inbox/${encodeURIComponent(
                    String(id)
                )}`,
                workflowOrder,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Get by id workflowOrder order
     */
    retrieveWorkflowOrder(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling  retrieveWorkflowOrder.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}/inbox/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}`,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    retrieveWorkflowJsonData(
        id: string,
        fields?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling  retrieveWorkflowOrder.'
            );
        }

        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/inbox/task/jsonData/${encodeURIComponent(
                    String(id)
                )}?${queryParameters.join('&')}`,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    approveWorkflow(
        workflowOrder: WorkflowOrderDetails,
        headers: Headers = {}
    ): Observable<WorkflowOrderDetails> {
        if (!workflowOrder) {
            throw new Error(
                'Required parameter workflowOrder was null or undefined when calling addWorkflowOrder.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/inbox/task/approve`,
                workflowOrder,
                headers
            );
        return response.pipe(map((httpResponse) => httpResponse.response));
    }

    rejectWorkflow(
        workflowOrder: WorkflowOrderDetails,
        headers: Headers = {}
    ): Observable<WorkflowOrderDetails> {
        if (!workflowOrder) {
            throw new Error(
                'Required parameter workflowOrder was null or undefined when calling addWorkflowOrder.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/inbox/task/reject`,
                workflowOrder,
                headers
            );
        return response.pipe(map((httpResponse) => httpResponse.response));
    }

    retrieveDocuments(
        id: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling  retrieveWorkflowOrder.'
            );
        }

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<WorkflowOrderDetails>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/inbox/task/documents/${encodeURIComponent(String(id))}`,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    public listAllInboxData(
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

        headers['Accept'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<any>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/inbox/tasks/requestedData${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }
}
