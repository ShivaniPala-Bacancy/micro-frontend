/**
 * Cash Register Management API
 * APIs to manage Cash Register
 *
 * OpenAPI spec version: 1.6.10
 * Contact: yagyawal.thakur@comviva.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { RegisterSkimDetail } from './registerSkimDetail';


export interface RegisterSkim { 
    skimId?: string;
    registerId?: string;
    skimBy?: string;
    skimDateTime?: string;
    totalAmount?: number;
    status?: string;
    lineItems?: Array<RegisterSkimDetail>;
}