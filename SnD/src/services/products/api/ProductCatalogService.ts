import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import IFilter from 'src/types/IFilter';
import HttpClient from '../../HttpClient';
import HttpResponse from '../../HttpResponse';
import {IAPIConfiguration} from '../../IAPIConfiguration';
import IHttpClient from '../../IHttpClient';
import InventoryListResponse from '../model/InventoryMaster';
import MasterConfigService from '../../master/api/MasterConfigService';

/* eslint-disable no-param-reassign */
export default class ProductCatalogService {
    masterService = new MasterConfigService();

    private APIConfiguration: IAPIConfiguration;

    private httpClient: IHttpClient;

    constructor() {
        this.APIConfiguration = {
            basePath: ''
        };
        try {
            this.masterService
                .getServiceUrl('PRODUCT_CATALOG')
                .subscribe((url) => (this.APIConfiguration.basePath = url));
        } catch (e) {
            console.log('error while fetching product catalog url', e);
        }
        this.httpClient = new HttpClient();
    }

    /**
     * Gets all products.
     */
    loadProducts(
        pageUrl?: string,
        filters?: IFilter[]
    ): Observable<InventoryListResponse> {
        const headers: any = {};
        headers.Accept = 'application/json;charset=utf-8';

        let url = `${this.APIConfiguration.basePath}/product/searchProduct`;
        if (pageUrl) url = pageUrl;
        else if (filters && filters.length > 0) {
            const queryString = filters
                .map((filter) => {
                    const [, , , fieldName] = filter.key.split('.');
                    return `${fieldName}=${filter.value}`;
                })
                .reduce((prev, curr) => `${prev}${prev ? '&' : ''}${curr}`);
            url = `${url}?${queryString}`;
        }
        const response: Observable<HttpResponse<InventoryListResponse>> =
            this.httpClient.get(url, headers);
        return response.pipe(map((d) => d.response));
    }
}
