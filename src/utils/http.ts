import axios from '../libs/axios';

interface httpParam {
    url: string, 
    params?: Record<string, any>, 
    thenCallback: HttpResopnseCallback,
    errorCallback: HttpResopnseCallback,
}

const createUrl = (detailUrl: string) => {
    return process.env.NODEJS_API_SERVER_CORE_URL + detailUrl;
}

const request = async ({url, params = {}, method, thenCallback, errorCallback}: httpParam & { method: 'get' | 'post' }) => {
    const fullUrl = createUrl(url);
    const dto = { url: fullUrl, params: params, header: {}, thenCallback: thenCallback, errorCallback: errorCallback };
    return method === 'get' ? axios.get(dto) : axios.post(dto);
}

const get = async (params: httpParam) => {
    return request({ ...params, method: 'get' });
};

const post = async (params: httpParam) => {
    return request({ ...params, method: 'post' });
};

export default {
    get: get,
    post: post,
};
