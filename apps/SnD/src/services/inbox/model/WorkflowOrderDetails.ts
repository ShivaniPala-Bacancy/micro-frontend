interface WorkflowOrderDetails {
    id?: string;
    requestId?: string;
    workflowName?: string;
    taskName?: string;
    taskUrl?: string;
    parentTask?: string;
    jsonData?: string;
    taskRequestBody?: string;
    taskResponseBody?: string;
    taskStatus?: string;
    transactionTime?: Date;
    completionTime?: Date;
    userName?: string;
    nextTask?: string;
    taskType?: string;
    asyncFlag?: boolean;
    retries?: number;
    referenceParameter?: string;
    referenceTask?: string;
    decisionBody?: string;
    maxRetries?: number;
    timeoutSeconds?: number;
    selfRetryFlag?: boolean;
    decisionTaskName?: string;
    rollbackTaskName?: string;
    rollbackRequestBody?: string;
    rollbackUrl?: string;
    previousTask?: string;
    userRole?: string;
    onReject?: string;
    workflowData?: string;
    addDate?: string;
    initBy?: string;
    requestStateDesc?: string;
    workflowId?: string;
    requestState?: string;
    pendingWith?: string;
    documents?: Array<any>;
    read?: boolean;
    formData?: any;
    remarks?: string;
}

interface WorkflowOrderDetailsWrapper {
    workflowOrderDetailsList: WorkflowOrderDetails[];
}
interface WorkflowOrderDetailsResponse {
    _embedded: WorkflowOrderDetailsWrapper;
}
export type { WorkflowOrderDetails, WorkflowOrderDetailsWrapper };
export default WorkflowOrderDetails;
