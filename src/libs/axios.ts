import axios from 'axios';

interface HTTPRequestParam {
    url: string,
    params: any,
    header: any,
    thenCallback: HttpResopnseCallback,
    errorCallback: HttpResopnseCallback,
}

const request = async ({url, params, header, thenCallback, errorCallback, method}: HTTPRequestParam & { method: 'get' | 'post' }) => {
    const response = method === 'get' ?
            axios.get(url, { params: params, headers: header }) : 
            axios.post(url, params, { headers: header } )
    return response
        .then((response) => thenCallback(response.data, response.status))
        .catch((error) => errorCallback(error.response.data, error.response.status));
}

const get = async (params: HTTPRequestParam) => {
    request({...params, method: 'get'});
}

const post = async (params: HTTPRequestParam) => {
    request({...params, method: 'post'});
}

export default {
    get: get,
    post: post,
};
