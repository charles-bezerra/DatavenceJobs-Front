import axios from 'axios';

const data = require("../config/stream.json");

export const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multpart/form-data'
    },
    proxy: {
        host: data.host,
        port: data.port
    }
};

const stream = axios.create({
    baseURL: data.domain,
    headers: config.headers,
    proxy: config.proxy
});

export default stream;