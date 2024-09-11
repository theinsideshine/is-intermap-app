const usersApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/users`
});

usersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    };
    return config;
});

export default usersApi;
