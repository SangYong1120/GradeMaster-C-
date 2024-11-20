import {
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout } from './userSlice';
import {
    getToken,
    removeCookie,
    removeToken,
    removeUserData,
} from '../../helper/helper';

const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const defaultFetchBase = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error.status === 401 || result.error.originalStatus === 401)) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // Handle failed refresh here
                    removeToken();
                    removeUserData();
                    removeCookie('refreshToken');
                    removeCookie('isLoggedIn');
                    api.dispatch(logout());
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export default defaultFetchBase;
