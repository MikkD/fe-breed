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

    addTodo = (event) => {
        const form = event.target;
        const formData = new FormData(form);
        const todoText = formData.get('todo-input');
        if (todoText) {
            const newTodo = {
                id: Math.ceil(Math.random() * 1000),
                text: todoText,
                completed: false,
            };
            this.todos.push(newTodo);
        }
    };

    completeAllTodos = () => {
        this.todos = this.todos.map((prevTodo) => ({ ...prevTodo, completed: true }));
    };

    resetAllTodos = () => {
        this.todos = this.todos.map((prevTodo) => ({ ...prevTodo, completed: false }));
    };

    removeTodo = (id) => {
        this.todos = this.todos.filter((prevTodo) => prevTodo.id !== id);
    };

    toggleTodo = (id) => {
        this.todos = this.todos.map((prevTodo) => {
            if (prevTodo.id === Number(id)) {
                return {
                    ...prevTodo,
                    completed: !prevTodo.completed,
                };
            }
            return prevTodo;
        });
    };

    get completedTodosCount() {
        return this.todos.filter((todo) => todo.completed).length;
    }
    get incompletedTodosCount() {
        return this.todos.filter((todo) => !todo.completed).length;
    }
}

export const todoState = new TodosState();
