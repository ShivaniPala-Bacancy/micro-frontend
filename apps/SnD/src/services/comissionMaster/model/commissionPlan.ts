/**
 * snd-commission-management API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0-SNAPSHOT
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {CommissionRule} from './commissionRule';

export interface Plans {
    id?: number;
    name?: string;
    fromDate: string;
    toDate: string;
    zoneId: number;
    hubId: number;
    areaId: number;
    userTypes: any;
    status?: string;
    userCategory?: string;
    posType?: string;
    rules?: Array<CommissionRule>;
}

export interface Zones {
    zoneDesc: string;
    zoneId: string;
    hubList: any;
}
