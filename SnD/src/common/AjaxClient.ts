import {HttpMethods} from '../types/CommonTypes';

/* eslint-disable no-param-reassign,dot-notation,prefer-template,no-shadow,import/prefer-default-export,prefer-promise-reject-errors */
async function client(
    endpoint: string,
    method?: HttpMethods,
    data?: any,
    isBlob?: boolean
) {
    const token = localStorage.getItem('token');
    const headers: string[][] = [
        ['Authorization', token ? `Bearer ${token}` : 'HSIKKA'],
        ['Content-Type', 'application/json']
    ];

    if (data && data instanceof FormData) {
        return fetch(endpoint, {
            method: method || 'post',
            body: data,
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        }).then(async (response) => {
            if (response.status === 401) {
                window.location.assign(window.location.href);
                return Promise.reject({message: 'Please re-authenticate.'});
            }
            if (isBlob) {
                const data = await response.blob();
                if (response.ok) {
                    return {
                        data,
                        type: response.headers.get('Content-Type')
                    };
                }
            } else {
                const data = await response.json();
                if (response.ok) {
                    return data;
                }
            }
            return Promise.reject(data);
        });
    }
    const config = {
        method: method || HttpMethods.GET,
        body: data ? JSON.stringify(data) : undefined,
        headers
    };

    return window.fetch(`${endpoint}`, config).then(async (response) => {
        if (response.status === 401) {
            window.location.assign(window.location.href);
            return Promise.reject({message: 'Please re-authenticate.'});
        }
        if (isBlob) {
            const data = await response.blob();
            if (response.ok) {
                return {
                    data,
                    type: response.headers.get('Content-Type')
                };
            }
        } else {
            const data = await response.json();
            if (response.ok) {
                return data;
            }
        }
        if (response.ok) {
            return data;
        }
        return Promise.reject(data);
    });
}

export default client;
