'use client'

import Button from '@/src/components/button/button';
import Input from '@/src/components/input/input';
import Textarea from '@/src/components/textarea/textarea';
import { useArticles } from '@/src/hooks/use-articles';
import { Article } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation'; 
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import z, { string } from 'zod';

type Props = {};

const schema = z.object({
  title: string().min(3, 'Заголовок должен быть длинее 3 символов'),
  content: string().min(10, 'Введите минимум 10 символов'),
});

const Page = (props: Props) => {
    const {createArticle} = useArticles()
    const navigation = useRouter()

    const { handleSubmit, register, reset, watch, formState: {isSubmitting, errors} } = useForm({
        defaultValues: {
            title: '',
            content: '',
        },
        resolver: zodResolver(schema)
    });

    const handleSubmitForm = useCallback(
        async (data: Pick<Article, 'title' | 'content'>) => {
            await createArticle.mutateAsync({data}).then(() => navigation.push('/'))
        },
        [reset],
    );

    return (
        <div className="container m-auto flex w-2/4 flex-col gap-4 py-4 max-md:w-11/12">
            <Button isLink href="/">
                Вернуться на главную
            </Button>

            <form className="flex flex-col gap-4 border p-4" onSubmit={handleSubmit(handleSubmitForm)}>
                <h3>Создать статью</h3>

                <Input
                    placeholder="Заголовок"
                    {...register("title", {required: true})}
                />
                <span className='text-red-500'>{errors.title?.message}</span>

                <Textarea
                    placeholder="Контент"
                    {...register('content', {required: true})}
                />
                <span className='text-red-500'>{errors.content?.message}</span>

                <Button type='submit' disabled={isSubmitting || !watch('title') || !watch('content')}>
                    {isSubmitting ? 'Создание...' : 'Создать'}
                </Button>
            </form>
        </div>
    );
};

export default Page;
