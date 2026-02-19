<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Article;
use App\Services\CommentService;

class CommentController extends Controller
{
    public function __construct(protected CommentService $service) {}

    public function store(Article $article, CommentRequest $request)
    {
        $article->comments()->create($request->validated());

        return back();
    }
}
