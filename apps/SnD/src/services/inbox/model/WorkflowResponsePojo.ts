interface WorkflowResponsePojo {
    requestId?: string;
    message?: string;
    success?: boolean;
    responseBoy?: Map<string, Object>;
    validationErrors?: Array<string>;
}

export default WorkflowResponsePojo;
