import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserProfile} from 'src/services/user/model/UserProfile';
import IFilter from 'src/types/IFilter';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {Headers} from '../../Headers';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
export default class UserProfileService {
    APIConfiguration: IAPIConfiguration;

    masterService = new MasterConfigService();

    httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('USER_PROFILE_URL')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching user profile url', e);
        }
        this.httpClient = new HttpClient();
    }

    createUser(
        userProfile: UserProfile,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!userProfile) {
            throw new Error(
                'Required parameter userProfile was null or undefined when calling createUser.'
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<UserProfile>> =
            this.httpClient.post(
                `${this.APIConfiguration.basePath}/userProfiles`,
                userProfile,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    patchUser(
        id: string,
        user: UserProfile,
        observe: any = 'body',
        headers: Headers = {}
    ): Observable<any> {
        if (!id) {
            throw new Error(
                'Required parameter userId was null or undefined when calling patchUser.'
            );
        }

        if (!user) {
            throw new Error(
                'Required parameter user was null or undefined when calling patchUser.'
            );
        }

        headers.Accept = 'application/json;charset=utf-8';
        headers['Content-Type'] = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<UserProfile>> =
            this.httpClient.patch(
                `${
                    this.APIConfiguration.basePath
                }/userProfiles/${encodeURIComponent(String(id))}`,
                user,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    getUserProfile(
        fields?: string,
        headers: Headers = {},
        observe: any = 'body',
        filters?: IFilter[]
    ): Observable<any> {
        const queryParameters: string[] = [];
        if (fields !== undefined) {
            queryParameters.push(
                `fields=${encodeURIComponent(String(fields))}`
            );
        }
        headers.Accept = 'application/json;charset=utf-8';
        if (filters !== undefined) {
            // TODO
            filters.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}=${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        const response: Observable<HttpResponse<UserProfile>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/userProfiles?${queryParameters.join('&')}`,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    listUsers(
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
            // TODO
            filters.forEach((filter: IFilter) => {
                queryParameters.push(
                    `${filter.key}=${encodeURIComponent(String(filter.value))}`
                );
            });
        }
        headers.Accept = 'application/json;charset=utf-8';

        const response: Observable<HttpResponse<Array<UserProfile>>> =
            this.httpClient.get(
                `${
                    this.APIConfiguration.basePath
                }/userProfiles?${queryParameters.join('&')}`,
                headers
            );
        if (observe === 'body') {
            return response.pipe(map((httpResponse) => httpResponse.response));
        }
        return response;
    }

    /**
     * Gets menus allowed for logged in user.
     * @param userRole: Fetch menus for this role.
     */
    getMenus(userRole: string): Observable<UserProfile> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';
        headers['User-Role'] = userRole;

        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `${this.APIConfiguration.basePath}/auth/menus`,
            headers
        );
        return response.pipe(map((d) => d.response));
    }
}
