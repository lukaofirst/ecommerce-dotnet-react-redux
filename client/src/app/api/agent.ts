import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { customHistory } from '../..';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response!;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateError: string[] = [];

                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateError.push(data.errors[key]);
                        }
                    }

                    throw modelStateError.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 500:
                customHistory.push({
                    pathname: '/server-error',
                    state: { error: data },
                });
                break;
            default:
                break;
        }
        console.log('caught by interceptor');
        return Promise.reject(error.response);
    }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
};

const TestError = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
};

const agent = {
    Catalog,
    TestError,
};

export default agent;
