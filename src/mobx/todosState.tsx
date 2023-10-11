import { makeObservable, observable, action, computed } from 'mobx';

interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

class TodosState {
    todos: ITodo[] = [];

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

    addTodo = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const formData = new FormData(form);
        const todoText = formData.get('todo-input');
        if (todoText) {
            const newTodo: ITodo = {
                id: Math.ceil(Math.random() * 1000),
                text: todoText.toString(),
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

    removeTodo = (id: number) => {
        this.todos = this.todos.filter((prevTodo) => prevTodo.id !== id);
    };

    toggleTodo = (id: number) => {
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
