import axios from 'axios';

const interferencesApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/interferences`
});

interferencesApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    };
    return config;
});

export default interferencesApi;
