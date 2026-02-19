import { Comment } from './comment';

export type Article = {
    id: number;
    title: string;
    content: string;
    comments?: Comment[];
    created_at: string;
    updated_at: string;
};
