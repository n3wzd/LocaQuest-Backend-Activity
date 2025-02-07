import axios from 'axios';

const makeUrl = (detailUrl) => {
    return process.env.NODEJS_API_SERVER_CORE_URL + detailUrl;
}

const get = async (url, params = {}) => axios.get(makeUrl(url), { params: params })

const post = async (url, body = {}) => axios.post(makeUrl(url), body)

export default {
    get: get,
    post: post,
};
