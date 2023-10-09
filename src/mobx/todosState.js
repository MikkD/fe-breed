import { makeObservable, observable, action, computed } from 'mobx';

class TodosState {
    todos = [];

    constructor() {
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            removeTodo: action,
            toggleTodo: action,
            completeAllTodos: action,
            resetAllTodos: action,
            completedTodosCount: computed,
            incompletedTodosCount: computed,
        });
    }

    addTodo(event) {
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

    completeAllTodos() {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => ({ ...prevTodo, completed: true }))
        );
    }

    resetAllTodos() {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => ({ ...prevTodo, completed: false }))
        );
    }

    removeTodo(id) {
        console.log('removeTod =>id', id);
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
    }

    toggleTodo(id) {
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
}

export const ObservableTodosState = new TodosState();
