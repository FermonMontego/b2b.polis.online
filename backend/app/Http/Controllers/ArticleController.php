<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Services\ArticleService;
use App\Models\Article;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{
    public function __construct(
        protected ArticleService $service
    ) {}

    public function index()
    {
        return Article::query()->latest()->paginate(9);
    }

    public function show(Article $article)
    {
        $article->load('comments');

        return $article;
    }

    public function store(ArticleRequest $request)
    {
        $article = $this->service->createArticle($request->validated());

        return response()->json($article, Response::HTTP_CREATED);
    }
}
