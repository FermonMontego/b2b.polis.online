import { Comment } from '@/src/types/comment';
import React, { memo } from 'react';

type Props = {
    comment: Comment;
};

const CommentItem = (props: Props) => {
    const { comment } = props;

    return (
        <div className="flex flex-col gap-1 rounded-2xl border p-4">
            <span>{comment.author_name}</span>
            <p>{comment.content}</p>
            <p className="mt-auto ml-auto text-xs text-gray-600">
                {new Date(comment.created_at).toLocaleString()}
            </p>
        </div>
    );
};

export default memo(CommentItem);
