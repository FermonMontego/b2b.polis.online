<?php

namespace App\Services;

use App\Models\Article;

class ArticleService
{
    public function createArticle(array $data): Article
    {
        return Article::create($data);
    }
}
