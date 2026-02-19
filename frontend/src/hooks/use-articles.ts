'use client'

import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { useAxiosInstance } from './use-axios-instance';
import { Article, Comment } from '@/src/types';
import { LaravelPagination } from '@/src/types/pagination';

export const useArticles = () => {
    const client = useAxiosInstance();
    const queryClient = useQueryClient();

    const getArticles = (page: number = 1) =>
        useQuery({
            queryKey: ['articles'],
            queryFn: async () => {
                const { data } = await client.get<LaravelPagination<Article>>(
                    `/articles?page=${page}`,
                );

                return data;
            },
            placeholderData: keepPreviousData,
            refetchOnWindowFocus: false,
        });

    const getArticleById = (id: number) =>
        useQuery({
            queryKey: ['article', id],
            queryFn: async () => {
                const { data } = await client.get<Article>(`/articles/${id}`);

                return data;
            },
            placeholderData: keepPreviousData,
            refetchOnWindowFocus: false,
        });

    const createArticle = useMutation({
        mutationFn: ({data}: {data: Pick<Article, 'title' | 'content'>}) =>
            client.post(`/articles`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ['articles'] 
            });
        },
    })

    const createComment = useMutation({
        mutationFn: ({articleId, data}: {articleId: number, data: Pick<Comment, 'author_name' | 'content'>}) =>
            client.post(`/articles/${articleId}/comments`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ['article', variables.articleId] 
            });
        },
    })

    return { getArticles, getArticleById, createArticle, createComment };
};
