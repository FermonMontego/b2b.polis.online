'use client'

import React, { useCallback, useEffect, useState } from 'react';
import Article from '@/src/components/article/article';
import Button from '@/src/components/button/button';
import { LoaderSkeleton } from '@/src/components/article/loader';
import { useArticles } from '@/src/hooks/use-articles';
import { Pagination } from '@/src/components/pagination/pagination';
import Default from '@/src/layouts/default';

type Props = {};

const Home = (props: Props) => {
    const [page, setPage] = useState(1);

    const { getArticles } = useArticles();

    const {
        data: articles,
        isLoading,
        isRefetching,
        refetch,
    } = getArticles(page);

    const handleOnPageChange = useCallback((page: number) => {
        setPage(page);
    }, []);

    useEffect(() => {
        refetch();
    }, [page]);

    return (
        <Default>
            <Button isLink href="/articles/create">
                Новая статья
            </Button>
            <div className="grid auto-cols-fr grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
                {!!(isLoading || isRefetching) && <LoaderSkeleton items={6} />}

                {!isLoading &&
                    !isRefetching &&
                    articles?.data?.map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
            </div>

            {!isLoading && !isRefetching && articles && (
                <Pagination meta={articles} onPageChange={handleOnPageChange} />
            )}
        </Default>
    );
};

export default Home;
