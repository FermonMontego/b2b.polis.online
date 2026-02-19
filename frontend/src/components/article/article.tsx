import { type Article } from '@/src/types';
import Link from 'next/link';
import { FC, memo } from 'react';

type Props = {
    article: Article;
};

const Article: FC<Props> = (props) => {
    const { article } = props;

    return (
        <Link href={'/articles/' + article.id}>
            <article className="flex cursor-pointer flex-col gap-2 rounded-2xl border p-4 transition hover:shadow-2xl h-full">
                <h3 className="text-2xl">{article.title}</h3>
                <p className="line-clamp-4 text-base break-all">{article.content}</p>

                <p className="mt-auto ml-auto text-xs text-gray-600">
                    {new Date(article.created_at).toLocaleString()}
                </p>
            </article>
        </Link>
    );
};

export default memo(Article);
