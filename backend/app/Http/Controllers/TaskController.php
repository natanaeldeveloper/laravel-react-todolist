<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = Task::query();
        $per_page = $request->input('per_page') ? $request->input('per_page') : 10;

        if ($request->has('filters.description')) {
            $tasks->where('description', 'ilike', '%' . $request->input('filters.description')[0] . '%');
        }

        if ($request->has('filters.date_conclusion')) {
            $tasks->whereDate('date_conclusion', $request->input('filters.date_conclusion')[0]);
        }

        if ($request->has('filters.created_at')) {
            $tasks->whereDate('created_at', $request->input('filters.created_at')[0]);
        }

        if ($request->has('filters.responsible')) {
            $tasks->whereHas('responsible', function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('email', 'ilike', '%' . $request->input('filters.responsible')[0] . '%')
                        ->whereOr('name', 'ilike', '%' . $request->input('filters.responsible')[0] . '%');
                });
            });
        }


        if ($request->has('sorter') && $request->input('sorter.field') != 'responsible') {

            $column = 'tasks.' . $request->input('sorter.field');
            $order = $request->input('sorter.order') == 'ascend' ? 'ASC' : 'DESC';

            $tasks = $tasks
                ->with('responsible')
                ->orderBy($column, $order)
                ->paginate($per_page);
        } else if ($request->has('sorter') && $request->input('sorter.field') == 'responsible') {

            $order = $request->input('sorter.order') == 'ascend' ? 'ASC' : 'DESC';

            $tasks = $tasks
                ->join('users as responsible', 'responsible.id', '=', 'tasks.responsible_id')
                ->with('responsible')
                ->select(
                    'tasks.id',
                    'tasks.description',
                    'tasks.date_conclusion',
                    'tasks.created_at',
                    'responsible.id as responsible_id'
                )
                ->orderBy('responsible.name', $order)
                ->paginate($per_page);
        } else {

            $tasks = $tasks
                ->with('responsible')
                ->paginate($per_page);
        }

        return response()->json($tasks);
    }

    /**
     * Store the specified resource.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->only('description', 'date_conclusion', 'responsible_id');

        $task = Task::create($data);

        return response()->json([
            'data' => $task,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json([
            'data' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->only('description', 'date_conclusion', 'responsible_id');

        $task->update($data);

        return response()->json([
            'message' => 'Tarefa atualizada com sucesso!',
            'data' => $task,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'Tarefa removida com sucesso!',
            'id' => $task->id,
        ], 200);
    }
}
