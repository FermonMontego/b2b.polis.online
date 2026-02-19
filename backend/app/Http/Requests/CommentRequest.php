<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'author_name' => 'required|min:3',
            'content' => 'required|min:10',
        ];
    }

    public function messages()
    {
        return [
            "author_name.required" => 'Обязательное поле',
            "author_name.min" => 'Имя должно быть не короче 3 символов',
            "content.required" => 'Напишите комментарий',
            "content.min" => 'Напишите минимум 10 символов',
        ];
    }
}
