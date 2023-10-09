import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PetDetails from './pages/PetDatails';
import TodoApp from './pages/TodoApp';
import { NavLink, Outlet } from 'react-router-dom';
import AnimalsPage from './pages/AnimalsPage';

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
                element: <TodoApp />,
            },
        ],
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
