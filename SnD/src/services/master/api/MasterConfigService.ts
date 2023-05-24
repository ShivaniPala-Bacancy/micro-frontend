import {Observable, Subscriber} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserProfile} from 'src/services/user/model/UserProfile';
import {Headers} from '../../Headers';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import LookupDetail from '../model/LookupDetail';
import MenuDetail from '../model/MenuDetail';
import RoleMaster from '../model/RoleMaster';
import RoleMenuMapping from '../model/RoleMenuMapping';
import {SystemParam, SystemParamId} from '../model/SystemParam';
import IFilter from '../../../types/IFilter';

const BASE_PREFIX = 'api/v1/master';

/* eslint-disable no-param-reassign */
export default class MasterConfigService {
    APIConfiguration: IAPIConfiguration;

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: `${
                window?.location?.hostname == 'localhost' ||
                window?.location?.hostname == '172.30.35.120'
                    ? 'http://172.16.10.94:9091/'
                    : window?.location?.origin + '/'
            }`
        };
        this.httpClient = new HttpClient();
    }

    /**
     * Gets all Lookup IDs.
     */
    getIds(): Observable<UserProfile> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `${this.APIConfiguration.basePath}${BASE_PREFIX}/dropdowns`,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    /**
     * Gets lookup detaisl against provided id
     * @param id : lookup id
     */
    getLookupDetail(id: string): Observable<LookupDetail[]> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';
        headers['x-auth-token'] =
            'VQ/ZK9+z2gzgTOm1ZnMyn0Ev6byXWPqWgsj1TrbN74c=';
        const response: Observable<HttpResponse<LookupDetail[]>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/dropdowns/${id}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    /**
     * Creates a new  lookup entry
     * @param lookup : Loockup record,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    createLookupEntry(
        lookup: LookupDetail,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!lookup) {
            throw new Error(
                'Required parameter lookup was null or undefined when calling createIndividual.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<LookupDetail>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/dropdowns`,
                lookup,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Creates lookup entries in bulk
     * @param lookups : List of Loockup records,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    createLookupEntries(
        lookups: Array<LookupDetail>,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!lookups) {
            throw new Error(
                'Required parameter lookup was null or undefined when calling createIndividual.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<LookupDetail>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/dropdowns/all`,
                lookups,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Update lookup entry
     * @param lookup : Loockup record,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    updateLookupEntry(
        lookup: LookupDetail,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!lookup) {
            throw new Error(
                'Required parameter lookup was null or undefined when calling createIndividual.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<LookupDetail>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/dropdowns`,
                lookup,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
       * Deletes a Lookup entry
       * This operation deletes a Lookup entity.
       * @param id Identifier of the Lookup entry
       
       */
    deleteLookup(
        id?: number,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteLookup.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }${BASE_PREFIX}/dropdowns/${encodeURIComponent(String(id))}`,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Gets all System parameters matching the search term.
     */
    searchSystemParams(searchTerm: string): Observable<Array<SystemParam>> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<SystemParam>>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/parameters?term=${searchTerm}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    getServiceUrl(name: string): Observable<string> {
        // first check if the url is already loaded for given service.
        const urlFromLocalStorage = localStorage.getItem(name);
        if (urlFromLocalStorage) {
            // If url is already loaded, return it.
            // Following lines create a new observable of string type
            return new Observable<string>((sub: Subscriber<string>) =>
                sub.next(urlFromLocalStorage)
            );
        }
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';
        // Else call the serarch param api to fetch the url
        const paramListObservable = this.searchSystemParams(name);
        return paramListObservable.pipe(
            map((res) => {
                const param = res.find(
                    (item) => item != null && item.id.mdlParameterId === name
                );
                localStorage.setItem(name, param?.mdlParameterValue || '');
                return param?.mdlParameterValue || '';
            })
        );
    }

    public listParams(
        observe: any = 'body',
        headers: Headers = {},
        offset?: number,
        limit?: number,
        filter?: any
    ): Observable<any> {
        const queryParameters: string[] = [];
        if (filter != undefined) {
            filter.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}${
                        filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        if (offset !== undefined) {
            queryParameters.push(
                `offset=${encodeURIComponent(String(offset))}`
            );
        }
        if (limit !== undefined) {
            queryParameters.push(`limit=${encodeURIComponent(String(limit))}`);
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<any>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }${BASE_PREFIX}/parameters?${queryParameters.join('&')}` as any,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Creates a new  system parameter
     * @param systemParam : System parameter,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    createSystemParameter(
        systemParam: SystemParam,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!systemParam) {
            throw new Error(
                'Required parameter systemParam was null or undefined when calling createSystemParameter.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<SystemParam>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/parameters`,
                systemParam,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Updates a System Parameter
     * @param systemParam : System Parameter to be updated,
     * @param observe: return body or response?
     * @param headers: specific headers
     */

    public updateSystemParameter(
        id: any,
        surveyQuestion: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling patchGeographicSite.'
            );
        }

        if (!surveyQuestion) {
            throw new Error(
                'Required parameter surveyQuestion was null or undefined when calling patchGeographicSite.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<LookupDetail>> =
            this.httpClient.put(
                `${
                    this.APIConfiguration.basePath
                }${BASE_PREFIX}/parameters/${encodeURIComponent(
                    String(id.mod1ModId)
                )}/${encodeURIComponent(String(id.mdlParameterId))}`,
                surveyQuestion,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
       * Deletes a System Parameter
       * This operation deletes a SystemParameter entity.
       * @param id Identifier of the System parameter to be deleted entry
       
       */
    deleteSystemParameter(
        id?: SystemParamId,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteLookup.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }${BASE_PREFIX}/parameters/${encodeURIComponent(
                String(id.mod1ModId)
            )}/${encodeURIComponent(String(id.mdlParameterId))}`,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Gets all menus
     */
    getAllMenus(offset?: number, limit?: number, filter?: any) {
        const headers: any = {};
        const queryParameters: string[] = [];
        if (filter != undefined) {
            filter.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}${
                        filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        if (offset !== undefined) {
            queryParameters.push(
                `offset=${encodeURIComponent(String(offset))}`
            );
        }
        if (limit !== undefined) {
            queryParameters.push(`limit=${encodeURIComponent(String(limit))}`);
        }
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<MenuDetail[]>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }${BASE_PREFIX}/menus?${queryParameters.join('&')}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    getMenusForRole(role: string) {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMenuMapping[]>> =
            this.httpClient.get(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/privileges?role=${role}`,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    createMenu(
        menu: MenuDetail,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!menu) {
            throw new Error(
                'Required parameter menu was null or undefined when calling createMenu.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<MenuDetail>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/menus`,
                menu,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Update a menu
     * @param menu : menu to be updated,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    updateMenu(
        menu: MenuDetail,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!menu) {
            throw new Error(
                'Required parameter menu was null or undefined when calling updateMenu.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<MenuDetail>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/menus/${menu.menuId}`,
                menu,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
       * Deletes a role
       * This operation deletes a role.
       * @param id Identifier of the role
       
       */
    deleteMenu(
        id?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteMenu.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }${BASE_PREFIX}/menus/${encodeURIComponent(String(id))}`,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    // Roles CRUD

    /**
     * Gets all roles configured in the system
     */
    getRoles(offset?: number, limit?: number, filter?: any) {
        const headers: any = {};
        const queryParameters: string[] = [];
        if (filter != undefined) {
            filter.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}${
                        filter.operator === 'eq' ? '*=' : filter.operator
                    }${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        if (offset !== undefined) {
            queryParameters.push(
                `offset=${encodeURIComponent(String(offset))}`
            );
        }
        if (limit !== undefined) {
            queryParameters.push(`limit=${encodeURIComponent(String(limit))}`);
        }
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMaster[]>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }${BASE_PREFIX}/roles?${queryParameters.join('&')}` as any,
                headers
            );
        return response.pipe(map((d) => d.response));
    }

    /**
     * Creates a new  Role
     * @param role : new role to be created,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    createRole(
        role: RoleMaster,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!role) {
            throw new Error(
                'Required parameter RoleMaster was null or undefined when calling createRole.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMaster>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/roles`,
                role,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Update a role
     * @param role : role to be updated,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    updateRole(
        role: RoleMaster,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!role) {
            throw new Error(
                'Required parameter role was null or undefined when calling updateRole.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMaster>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/roles/${role.id}`,
                role,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
       * Deletes a role
       * This operation deletes a role.
       * @param id Identifier of the role
       
       */
    deleteRole(
        id?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteLookup.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }${BASE_PREFIX}/roles/${encodeURIComponent(String(id))}`,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /** Role privileges */

    /**
     * Creates a new Role-Menu mapping
     * @param mapping : new mapping to be created,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    createRoleMenuMapping(
        mapping: RoleMenuMapping,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!mapping) {
            throw new Error(
                'Required parameter mapping was null or undefined when calling createRoleMenuMapping.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMenuMapping>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/privileges`,
                mapping,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    createRoleMenuMappings(
        mappings: RoleMenuMapping[],
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!mappings) {
            throw new Error(
                'Required parameter mappings was null or undefined when calling createRoleMenuMappings.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMenuMapping>> =
            this.httpClient.patch(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/privileges`,
                mappings,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Update a mapping
     * @param mapping : mapping to be updated,
     * @param observe: return body or response?
     * @param headers: specific headers
     */
    updateRoleMenuMapping(
        mapping: RoleMenuMapping,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!mapping) {
            throw new Error(
                'Required parameter mapping was null or undefined when calling updateRole.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMenuMapping>> =
            this.httpClient.put(
                `${this.APIConfiguration.basePath}${BASE_PREFIX}/privileges/${mapping.mapId}`,
                mapping,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
           * Deletes a mapping
           * This operation deletes a mapping.
           * @param mapId Identifier of the mapping
           
           */
    deleteRoleMenuMapping(
        id?: string,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter id was null or undefined when calling deleteLookup.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${
                this.APIConfiguration.basePath
            }${BASE_PREFIX}/privileges/${encodeURIComponent(String(id))}`,
            headers
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    deleteRoleMenuMappings(
        idList?: (string | undefined)[],
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!idList) {
            throw new Error(
                'Required parameter idList was null or undefined when calling deleteRoleMenuMappings.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(
            `${this.APIConfiguration.basePath}${BASE_PREFIX}/privileges`,
            headers,
            idList
        );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    updateTranslations(
        locale: string,
        translation: any,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!locale) {
            throw new Error(
                'Required parameter locale was null or undefined when calling updateTranslations.'
            );
        }
        if (!translation) {
            throw new Error(
                'Required parameter translation was null or undefined when calling updateTranslations.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<RoleMenuMapping>> =
            this.httpClient.patch(
                `${this.APIConfiguration.basePath}locale/${locale}`,
                translation,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }
}
