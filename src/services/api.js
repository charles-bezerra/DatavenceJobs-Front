import axios from 'axios';

const data = require("../config/api.json");

export const config = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    proxy: {
        host: data.host,
        port: data.port
    }
};

export const api = axios.create({
    baseURL: data.domain,
    headers: config.headers,
    proxy: config.proxy
});
