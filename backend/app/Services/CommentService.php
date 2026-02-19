<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{
    public function createComment(array $data): Comment
    {
        return Comment::create($data);
    }
}
