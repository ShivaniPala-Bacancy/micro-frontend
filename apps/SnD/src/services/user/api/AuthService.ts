import {lastValueFrom, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {SystemParam} from 'src/services/master/model/SystemParam';
import {UserProfile} from 'src/services/user/model/UserProfile';
import {toast} from 'react-toastify';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import MasterConfigService from '../../master/api/MasterConfigService';
import {isDevelopment} from '../../../common/Util';
import RealmConfigService from '../../realm/api/realmConfigService';

interface IAuthDetails {
    isLoggedIn: boolean;
    token?: string;
    currentUser?: UserProfile;
    menus?: any;
}
const {host} = window.location;
const REDIRECT_URI =
    window?.location?.hostname == 'localhost' ||
    window?.location?.hostname == '172.30.35.120'
        ? `redirect_uri=http://${host}/&nonce=dfdasf`
        : `redirect_uri=https://${host}/&nonce=dfdasf`;
export default class AuthService {
    APIConfiguration: IAPIConfiguration;

    httpClient: IHttpClient;

    state: IAuthDetails;

    masterService = new MasterConfigService();
    realmConfigService = new RealmConfigService();

    // Singleton instance
    static instance: AuthService;

    constructor() {
        this.APIConfiguration = {
            basePath: '',
            redirectUrl: REDIRECT_URI
            // authUrl: 'http://172.30.35.130:9091/api/v1'
        };
        if (isDevelopment()) {
            this.loadBaseUrl('DEV_BASE_PATH', () => {});
        } else {
            this.loadBaseUrl('PROD_BASE_PATH', () => {});
        }

        this.httpClient = new HttpClient();
        this.state = {
            isLoggedIn: false,
            token: localStorage.getItem('token') || undefined
        };
        if (this.state.token) {
            this.state.isLoggedIn = true;
        }
    }

    loadBaseUrl(urlType: string, callback: any) {
        if (
            this.APIConfiguration &&
            this.APIConfiguration.basePath &&
            this.APIConfiguration.basePath.length > 5
        ) {
            callback();
            return;
        }
        try {
            this.masterService.getServiceUrl(urlType).subscribe((url) => {
                this.APIConfiguration.basePath = url;
                callback();
            });
            this.masterService
                .searchSystemParams('AUTHURL')
                .subscribe((res) => {
                    if (res != null) {
                        const param: SystemParam | undefined = res.find(
                            (item) =>
                                item != null &&
                                item.id.mdlParameterId === 'AUTHURL'
                        );
                        if (param != null) {
                            this.APIConfiguration.authUrl =
                                param.mdlParameterValue;
                        }
                    }
                });
        } catch (e) {
            console.log('error while fetching realm url', e);
        }
    }

    static getInstance(): AuthService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AuthService();
        return this.instance;
    }

    checkforIdToken() {
        const {hash} = window.location;
        if (hash && hash.indexOf('session_state') >= 0) {
            const result = hash.split('&').reduce((res: any, item) => {
                const [key, value] = item.split('=');
                res[key] = value;
                return res;
            }, {});
            if (result && result.id_token) {
                this.state.token = result.id_token;
                this.state.isLoggedIn = true;
                window.history.replaceState(
                    '',
                    document.title,
                    window.location.pathname
                );
                localStorage.setItem('token', this.state.token || '');
            }
        }
    }

    /**
     * Redirects to Keycloak for authentication
     */
    loginByKeycloak() {
        window.location.href = `${this.APIConfiguration.authUrl}${this.APIConfiguration.redirectUrl}`;
    }

    createSuccessHandler = (data: any) => {
        if (data.realmurl == 'TenantId is not mapped with realmUrl') {
            toast.error('Tenant not Allowed');
        } else {
            window.location.href = `${data.realmurl}${'&'}${
                this.APIConfiguration.redirectUrl
            }`;
        }
    };

    onHttpFailure = () => {
        toast.error('Failed');
    };

    loginByKeycloakforTenant(tenantId: any) {
        this.realmConfigService.getRealmUrl(tenantId).subscribe({
            next: this.createSuccessHandler,
            error: this.onHttpFailure
        });
    }

    /**
     * Gets user details of logged in user
     * This operation retrieves user details for logged in user.
     */
    async getLoggedInUser(): Promise<UserProfile | undefined> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<UserProfile>> =
            this.httpClient.get(
                window?.location?.hostname == 'localhost' ||
                    window?.location?.hostname == '172.30.35.120'
                    ? 'http://172.16.10.94:9091/api/v1/auth/self'
                    : window?.location?.origin + '/api/v1/auth/self',
                headers
            );
        const promise = lastValueFrom(
            response.pipe(
                first(),
                map((d) => d.response)
            )
        );
        const user = await promise;
        this.state.currentUser = user;
        return promise;
    }

    /**
     * Gets menus allowed for logged in user.
     * @param userRole: Fetch menus for this role.
     */
    getMenus(userRole: string): Observable<UserProfile> {
        const headers: any = {};

        headers.Accept = 'application/json;charset=utf-8';
        const response: Observable<HttpResponse<any>> = this.httpClient.get(
            `${this.APIConfiguration.authUrl}/auth/menus/${userRole}`,
            headers
        );
        return response.pipe(map((d) => d.response));
    }

    removeToken() {
        this.state.currentUser = undefined;
        this.state.menus = [];
        this.state.isLoggedIn = false;
    }

    logoutUser() {
        this.state.currentUser = undefined;
        this.state.menus = [];
        this.state.isLoggedIn = false;
        const response: Observable<HttpResponse<any>> = this.httpClient.post(
            `${this.APIConfiguration.authUrl}/auth/logout`,
            {}
        );
        this.masterService.getServiceUrl('REALM_URL').subscribe((url) => {
            this.APIConfiguration.basePath = url;
        });
        return response;
    }
}
