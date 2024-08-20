import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:1337',
    credentials: 'include',
});

const mutex = new Mutex();

// Function for executing requests with authorization
export const baseQueryWithReauth: BaseQueryFn<
    FetchArgs | string,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    const result = await baseQuery(args, api, extraOptions);
    return result;
};

export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    reducerPath: 'baseApi',
});

export const glassesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGlasses: builder.query<Response, { id: string; params: never }>({
            query: () => ({
                method: 'GET',
                url: `/api/glasses?populate=img`,
            }),
        }),
    }),
});

export const {useGetGlassesQuery} = glassesApi;

// response API
export type ImgType = {
    data?: {
        id: number
        attributes: {
            name: string
            alternativeText?: string
            caption?: string
            width: number
            height: number
            formats: {
                thumbnail: {
                    name: string
                    hash: string
                    ext: string
                    mime: string
                    path?: string
                    width: number
                    height: number
                    size: number
                    url: string
                }
                medium?: {
                    name: string
                    hash: string
                    ext: string
                    mime: string
                    path?: string
                    width: number
                    height: number
                    size: number
                    url: string
                }
                small?: {
                    name: string
                    hash: string
                    ext: string
                    mime: string
                    path?: string
                    width: number
                    height: number
                    size: number
                    url: string
                }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl?: string
            provider: string
            provider_metadata?: never
            createdAt: string
            updatedAt: string
        }
    } | null
}

export type Attributes = {
    createdAt: string;
    updatedAt: string;
    name: string;
    color?: string;
    size?: number;
    img: ImgType;
}

export type Data = {
    id: number;
    attributes: Attributes;
}

export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export type Meta = {
    pagination: Pagination;
}

export type Response = {
    data: Data[];
    meta: Meta;
}
