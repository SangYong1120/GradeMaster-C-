import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getMeAPI } from './getMeAPI';
import { setToken, setUserData } from '../../helper/helper';

const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`;

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query(data) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation({
            query(data) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data,
                };
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data)
                    setToken(data.token);
                    // setUserData(JSON.stringify(data.userData));
                    await dispatch(getMeAPI.endpoints.getMe.initiate(null));
                } catch (error) { }
            },
        }),
        adminLoginUser: builder.mutation({
            query(data) {
                return {
                    url: '/auth/admin-login',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                };
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setToken(data.token);
                    setUserData(JSON.stringify(data.userData));
                    await dispatch(getMeAPI.endpoints.getMe.initiate(null));
                } catch (error) { }
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useAdminLoginUserMutation,
} = authAPI;
