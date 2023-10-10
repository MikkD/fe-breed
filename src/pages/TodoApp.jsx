import React from 'react';
import './TodoApp.scss';
import { observer } from 'mobx-react-lite';

const Todo = observer(({ todo: { completed, text, id }, removeTodo, toggleTodo }) => {
    return (
        <li>
            <div>
                {text}
                <input
                    type='checkbox'
                    checked={completed}
                    onChange={() => toggleTodo(id)}
                />
                <button onClick={() => removeTodo(id)}>X</button>
            </div>
        </li>
    );
});

const TodoList = observer(({ todoState }) => {
    const todos = todoState.todos || [];

    return (
        <ul className='todo-list'>
            {!todos?.length ? (
                <h4>....Add Todo</h4>
            ) : (
                todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        removeTodo={todoState.removeTodo}
                        toggleTodo={todoState.toggleTodo}
                    />
                ))
            )}
        </ul>
    );
});

const TodoApp = observer(({ todoState }) => {
    console.log('🚀 ~  todoState:', todoState);
    return (
        <div className='todo-wrapper'>
            <form onSubmit={(e) => todoState.addTodo(e)}>
                <label htmlFor='todo-input'>Enter todo </label>
                <input
                    name='todo-input-value'
                    id='todo-input'
                    type='text'
                    placeholder='enter todo'
                />
                <input type='submit' value='add todo' />
            </form>
            <br />
            <div>Number of completed todos: {todoState.completedTodoCount}</div>
            <div>
                <button onClick={() => todoState.completeAllTodos}>
                    {' '}
                    Complete all todos{' '}
                </button>
            </div>
            <br />
            <div> Number of incompleted todos: {todoState.incompletedTodoCount}</div>
            <div>
                <button onClick={todoState.resetAllTodos}> Reset all todos</button>
            </div>
            <TodoList todoState={todoState} />
        </div>
    );
});

export default TodoApp;
