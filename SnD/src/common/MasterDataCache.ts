import client from './AjaxClient';

interface IMasterCache {
    [index: string]: any;
}
interface IMasterCacheSubscribers {
    [index: string]: React.Dispatch<any>;
}
interface ICacheLoading {
    [index: string]: boolean;
}

const masterDataCache: IMasterCache = {};
const subscribers: IMasterCacheSubscribers = {};
const pehndingRequests: ICacheLoading = {};

const useFetch = (url: string, id: string, dispatch: React.Dispatch<any>) => {
    const fetchData = async () => {
        if (pehndingRequests[url]) {
            subscribers[id] = dispatch;
            return;
        }
        if (masterDataCache[url]) {
            dispatch({type: 'load', payload: masterDataCache[url]});
        } else {
            pehndingRequests[url] = true;
            const fetchedData = await client(url);
            if (subscribers) {
                if (!subscribers[id]) {
                    dispatch({type: 'load', payload: fetchedData});
                }
                for (const key in subscribers) {
                    subscribers[key]({type: 'load', payload: fetchedData});
                    delete subscribers[key];
                }
            }
            masterDataCache[url] = fetchedData;
            pehndingRequests[url] = false;
        }
    };
    fetchData();
};

export {useFetch};
