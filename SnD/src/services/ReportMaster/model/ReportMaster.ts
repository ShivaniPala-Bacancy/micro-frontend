interface ReportMaster {
    reportId?: string;
    description?: string;
}

interface ReportFields {
    reportId?: string;
    reportParameterList: ReportParameters[];
    headerName: string;
    description: string;
}

interface ReportParameters {
    reportId?: string;
    url?: string;
    htmlType?: string;
    required?: string;
    parameterId?: string;
    description: string;
}

export type {ReportFields, ReportMaster, ReportParameters};
