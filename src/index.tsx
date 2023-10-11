import React from 'react';
import ReactDOM from 'react-dom/client';
import PetDetails from './pages/PetDatails';
import TodoApp from './pages/TodoApp';
import AnimalsPage from './pages/AnimalsPage';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import { todoState } from './mobx/todosState';
import './index.css';

function Layout() {
    return (
        <>
            <header>
                <NavLink
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                    to='/'>
                    Main
                </NavLink>
                <NavLink
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                    to='/todo'>
                    Todo App{' '}
                </NavLink>
            </header>
            <Outlet />
        </>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <AnimalsPage />,
            },
            {
                path: '/details/:id',
                element: <PetDetails />,
            },
            {
                path: '/todo',
                element: <TodoApp todoState={todoState} />,
            },
        ],
    },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
