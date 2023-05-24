interface Dates {
    date: string;
    dateType: string;
}

interface Shops {
    pdvId: string;
    remainingVisits: number;
    lattitude: string;
    longitude: string;
    pdvNumber: number;
    pdvContactTe: string;
    userAddress: string;
    locationDesc: string;
    sequenceNo: number;
    pdvUserId: string;
    street: string;
    number: number;
    instanceId: string;
    routeType: string;
    score: number;
    distance: number;
    pdvName: string;
    visitFreq: number;
    critical: boolean;
}

interface ShopResponse {
    totalDays: number;
    remainingDays: number;
    totalPDVs: number;
    pdvPerDay: number;
    pdvList: Array<Shops>;
}

interface RoutePlan {
    routeId?: string;
    fosId: string;
    fosUserId?: string;
    activeInstanceId?: string;
    intervalDate: string;
    routeDate: string;
    toDate: string;
    fosType?: string;
    routes?: {
        SYSTEM: Array<Shops>;
    };
    allRoutes?: any;
    startingPDV?: string;
    startingPoint?: {
        longitude: string;
        latitude: string;
    };
    newRoute?: Array<Shops>;
    routeDateWithTime?: string;
}

export type {Dates, Shops, ShopResponse, RoutePlan};
