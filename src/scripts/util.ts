const axios = require('axios');

export const getFetch = (url: string, params: any = {}) => {
    return axios({ url: url, method: 'GET', params: params })
        .then((res: any) => res.data)
        .catch((error: any) => {
            console.log(error);
        });
};
