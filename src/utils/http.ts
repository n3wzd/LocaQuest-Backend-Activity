import axios from '../libs/axios';

interface httpParam {
    url: string, 
    params?: Record<string, any>, 
}

const createUrl = (detailUrl: string) => {
    return process.env.NODEJS_API_SERVER_CORE_URL + detailUrl;
}

const request = async ({url, params = {}, method}: httpParam & { method: 'get' | 'post' | 'put' }) => {
    const fullUrl = createUrl(url);
    const dto = { url: fullUrl, params: params, header: {} };
    switch(method) {
        case 'get': return await axios.get(dto);
        case 'put': return await axios.put(dto);
        default: return await axios.post(dto);
    }
}

const get = async (params: httpParam) => {
    return await request({ ...params, method: 'get' });
};

const post = async (params: httpParam) => {
    return await request({ ...params, method: 'post' });
};

const put = async (params: httpParam) => {
    return await request({ ...params, method: 'put' });
};

export default {
    get: get,
    post: post,
    put: put,
};
