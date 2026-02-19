<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('articles', ArticleController::class);
Route::apiResource('articles.comments', CommentController::class);

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
