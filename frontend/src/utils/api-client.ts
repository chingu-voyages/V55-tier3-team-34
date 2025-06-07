import {envVars} from "@/config/env";


type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    cookie?: string;
    params?: Record<string, string | number | boolean | undefined | null>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
    url: string,
    params?: RequestOptions['params'],
): string {
    if (!params) return url;
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) => value !== undefined && value !== null,
        ),
    );
    if (Object.keys(filteredParams).length === 0) return url;
    const queryString = new URLSearchParams(
        filteredParams as Record<string, string>,
    ).toString();
    return `${url}?${queryString}`;
}

export async function apiCall<T>(
    url: string,
    options: RequestOptions = {}
) {
    const {
        method = 'GET',
        headers = {},
        body,
        params,
        cache = 'no-store' as RequestCache,
        next,
    } = options;
     const BASE_URL = envVars.API_URL
     const API_URL = buildUrlWithParams(`${BASE_URL}${url}`, params);
     const isFormData = body instanceof FormData;
    const response = await fetch(API_URL, {
        method,
        credentials: "include",
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            Accept: 'application/json',
            ...headers,
        },
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        next,
        cache,
    });

    if (!response.ok) {
            const message = (await response.json()).message || response.statusText;
            throw new Error(message);
        }
        return await response.json()  as T;
}

export const api = {
    get<T>(url: string, options?: RequestOptions): Promise<T> {
        return apiCall<T>(url, { ...options, method: 'GET' });
    },
    post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return apiCall<T>(url, { ...options, method: 'POST', body });
    },
    put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return apiCall<T>(url, { ...options, method: 'PUT', body });
    },
    patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return apiCall<T>(url, { ...options, method: 'PATCH', body });
    },
    delete<T>(url: string, options?: RequestOptions): Promise<T> {
        return apiCall<T>(url, { ...options, method: 'DELETE' });
    },
};
