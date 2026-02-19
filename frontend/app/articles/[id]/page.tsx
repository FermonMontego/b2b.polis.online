'use client'

import React, { FC, useCallback, useMemo } from 'react';
import Button from '@/src/components/button/button';
import { Comment } from '@/src/types/comment';
import CommentItem from '@/src/components/comment-item/comment-item';
import Input from '@/src/components/input/input';
import Textarea from '@/src/components/textarea/textarea';
import { type Article } from '@/src/types';
import { useForm } from 'react-hook-form';
import { useArticles } from '@/src/hooks/use-articles';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { LaravelErrors } from '@/src/components/types/LaravelErrors';
import z, { string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
};

const schema = z.object({
  author_name: string().min(3, 'Имя должно быть не менее 3 символов'),
  content: string().min(10, 'Введите минимум 10 символов'),
});

const Page: FC<Props> = ({}) => {
    const {id} = useParams<{ id: string }>();

    const {getArticleById, createComment} = useArticles();
    
    const {data: article, isLoading: isLoadingArticle} = getArticleById(Number(id))

    const { handleSubmit, register, reset, watch, formState: {isSubmitting, errors}, setError } = useForm({
        defaultValues: {
            author_name: '',
            content: '',
        },
        resolver: zodResolver(schema)
    });

    const { comments } = article ?? {};

    const commentsReverse = useMemo(() => {
        if (!comments) return;

        const commentsCopy = [...comments];

        return commentsCopy.reverse();
    }, [comments]);

    const handleSubmitForm = useCallback(
        async (data: Pick<Comment, 'author_name' | 'content'>) => {
            await createComment.mutateAsync({
                articleId: Number(id),
                data
            }).then(() => reset()).catch((error: AxiosError) => {
                const {errors} = error.response?.data as {errors?: LaravelErrors} ?? {}

                console.log(errors);
            });
        },
        [reset],
    );

    if(isLoadingArticle) 
        return <div className="container m-auto flex w-2/4 flex-col gap-4 py-8">
            Загрузка...
        </div>

    if(!article) 
        return <div className="container m-auto flex w-2/4 flex-col gap-4 py-8">
            Ошибка получения данных

            <Button isLink href="/">
                Вернуться на главную
            </Button>

        </div> 

    return (
        <div className="container m-auto flex w-2/4 flex-col gap-4 py-4 max-md:w-11/12">
            <Button isLink href="/">
                Вернуться на главную
            </Button>

            <div className="flex flex-col gap-4">
                <h3 className="text-3xl">{article.title}</h3>
                <p className="text-2xl break-all">{article.content}</p>
            </div>

            <div className="container m-auto mt-10 flex flex-col gap-2 border p-4">
                <h3 className="text-2xl">Ваш комментарий</h3>

                <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-2">
                    <Input
                        placeholder="Ваше имя"
                        {...register('author_name')}
                    />
                    <span className='text-red-500'>{errors.author_name?.message}</span>
                    <Textarea
                        placeholder="Комментарий"
                        {...register('content')}
                    />
                    <span className='text-red-500'>{errors.content?.message}</span>
                    <Button
                        disabled={isSubmitting || !watch('author_name') || !watch('content')}
                    >
                        {isSubmitting ? 'Отправка...' : 'Отправить'}
                    </Button>
                </form>
            </div>

            <h3>Комментарии ({comments?.length})</h3>

            <div className="flex flex-col gap-2">
                {commentsReverse?.map((comment) => renderComments(comment))}
            </div>
        </div>
    );
};

const renderComments = (comment: Comment) => {
    return <CommentItem comment={comment} key={comment.id} />;
};

export default Page;
