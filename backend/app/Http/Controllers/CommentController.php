<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Article;
use App\Services\CommentService;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends Controller
{
    public function __construct(protected CommentService $service) {}

    public function store(Article $article, CommentRequest $request)
    {
        $comment = $article->comments()->create($request->validated());

        return response()->json($comment, Response::HTTP_CREATED);
    }
}
