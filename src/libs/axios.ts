import axios from 'axios';

interface HTTPRequestParam {
    url: string,
    params: any,
    header: any,
}

const request = async ({url, params, header, method}: HTTPRequestParam & { method: 'get' | 'post' | 'put' }) => {
    switch(method) {
        case 'get': return await axios.get(url, { params: params, headers: header });
        case 'put': return await axios.put(url, params, { headers: header });
        default: return await axios.post(url, params, { headers: header } );
    }
}

const get = async (params: HTTPRequestParam) => {
    return await request({...params, method: 'get'});
}

const post = async (params: HTTPRequestParam) => {
    return await request({...params, method: 'post'});
}

const put = async (params: HTTPRequestParam) => {
    return await request({...params, method: 'put'});
}

export default {
    get: get,
    post: post,
    put: put,
};
