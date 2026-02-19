import React, { memo } from 'react';

type Props = {
    items: number;
};

export const LoaderSkeleton = memo((props: Props) => {
    return new Array(6)
        .fill(0)
        .map((_, index) => (
            <article
                key={index}
                className="flex h-80 cursor-pointer flex-col gap-2 rounded-2xl border bg-gray-100 p-4 transition hover:shadow-2xl"
            ></article>
        ));
});
