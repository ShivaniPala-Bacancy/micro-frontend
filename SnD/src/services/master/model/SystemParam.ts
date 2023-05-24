interface SystemParamId {
    mod1ModId: string | null;
    mdlParameterId: string | null;
}
interface SystemParam {
    id: SystemParamId;
    mod1ModId?: string;
    mdlParameterId?: string;
    mdlParameterDescription?: string;
    mdlParameterValue?: string;
}

export type {SystemParam, SystemParamId};
