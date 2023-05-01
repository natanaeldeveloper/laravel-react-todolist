<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|min:3|max:255',
            'date_conclusion' => 'date',
            'responsible_id' => 'required|exists:users,id',
        ];
    }

    public function attributes(): array
    {
        return [
            'description' => 'descrição',
            'date_conclusion' => 'data conclusão',
            'responsible_id' => 'responsável',
        ];
    }
}
