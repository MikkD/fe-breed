import React from 'react';
import ReactDOM from 'react-dom/client';
import PetDetails from './pages/PetDatails';
import TodoApp from './pages/TodoApp';
import AnimalsPage from './pages/AnimalsPage';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import { todoState } from './mobx/todosState';
import './index.css';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import MovieApp from './pages/MovieApp';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['home,cats,movies'];
function Layout() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending ? 'pending' : isActive ? 'active' : 'white'
                            }
                            to='/'>
                            Main
                        </NavLink>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending ? 'pending' : isActive ? 'active' : 'white'
                            }
                            to='/todo'>
                            Todo App
                        </NavLink>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending ? 'pending' : isActive ? 'active' : 'white'
                            }
                            to='/movie'>
                            MovieApp
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
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
            {
                path: '/movie',
                element: <MovieApp />,
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
