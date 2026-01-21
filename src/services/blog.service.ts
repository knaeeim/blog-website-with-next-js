import { env } from "@/env";

const API_URL = env.API_URL;

interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
}

export const blogServices = {
    getBlogPosts: async (params?: GetBlogsParams, option?: ServiceOption) => {
        try {
            const url = new URL(`${API_URL}/posts`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value)
                    }
                })
            }

            const config: RequestInit = {};

            if (option?.cache) {
                config.cache = option.cache;
            }

            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate }
            }

            const response = await fetch(url.toString(), config);

            const data = await response.json();
            return { data: data, error: null };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: { message: error.message } };
            }
            return { data: null, error: { message: 'An unknown error occurred' } };
        }
    },
    getBlogById: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { data: null, error: { message: error.message } }
            }
            return { data: null, error: { message: 'An unknown error occurred' } };
        }
    }
}