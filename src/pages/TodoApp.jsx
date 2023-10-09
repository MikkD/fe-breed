import React, { useState } from 'react';
import './TodoApp.scss';

const Todo = ({ todo: { completed, text, id }, removeTodo, toggleTodo }) => {
    return (
        <div>
            {text}
            <input type='checkbox' checked={completed} onChange={() => toggleTodo(id)} />
            <button onClick={() => removeTodo(id)}>X</button>
        </div>
    );
};

const TodoList = ({ todos, removeTodo, toggleTodo }) => {
    console.log('🚀 ~ todos:', todos);
    return (
        <ul className='todo-list'>
            {!todos?.length ? (
                <h4>....Add Todo</h4>
            ) : (
                todos.map((todo) => (
                    <li key={todo.id}>
                        <Todo
                            todo={todo}
                            removeTodo={removeTodo}
                            toggleTodo={toggleTodo}
                        />
                    </li>
                ))
            )}
        </ul>
    );
};

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const completedTodoCount = 5;
    const incompletedTodoCount = 10;

    function addTodo(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const todoText = formData.get('todo-input-value');
        if (todoText) {
            const newTodo = {
                id: Math.ceil(Math.random() * 1000),
                text: todoText,
                completed: false,
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            form.reset();
        }
    }

    function completeAllTodos() {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => ({ ...prevTodo, completed: true }))
        );
    }

    function resetAllTodos() {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => ({ ...prevTodo, completed: false }))
        );
    }

    function removeTodo(id) {
        console.log('removeTod =>id', id);
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
    }

    function toggleTodo(id) {
        console.log('🚀 ~ file: toggleTodo.jsx:70 ~ TodoApp ~ id:', id);
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => {
                if (prevTodo.id === Number(id)) {
                    return {
                        ...prevTodo,
                        completed: !prevTodo.completed,
                    };
                }
                return prevTodo;
            })
        );
    }

    return (
        <div className='todo-wrapper'>
            <form onSubmit={addTodo}>
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
            <div>Number of completed todos: {completedTodoCount}</div>
            <div>
                <button onClick={completeAllTodos}> Complete all todos </button>
            </div>
            <br />
            <div> Number of incompleted todos: {incompletedTodoCount}</div>
            <div>
                <button onClick={resetAllTodos}> Reset all todos</button>
            </div>
            <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
        </div>
    );
}

export default TodoApp;
