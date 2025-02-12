import axios from 'axios';

interface HTTPRequestParam {
    url: string,
    params: any,
    header: any,
    thenCallback: HttpResopnseCallback,
    errorCallback: HttpResopnseCallback,
}

const request = async ({url, params, header, thenCallback, errorCallback, method}: HTTPRequestParam & { method: 'get' | 'post' | 'put' }) => {
    let response;
    switch(method) {
        case 'get': response = axios.get(url, { params: params, headers: header }); break;
        case 'put': response = axios.put(url, params, { headers: header }); break;
        default: response = axios.post(url, params, { headers: header } ); break;
    }
    return response
        .then((response) => thenCallback(response.data, response.status))
        .catch((error) => errorCallback(error.response?.data, error.response?.status));
}

const get = async (params: HTTPRequestParam) => {
    request({...params, method: 'get'});
}

const post = async (params: HTTPRequestParam) => {
    request({...params, method: 'post'});
}

const put = async (params: HTTPRequestParam) => {
    request({...params, method: 'put'});
}

export default {
    get: get,
    post: post,
    put: put,
};
