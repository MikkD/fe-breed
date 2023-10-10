import React from 'react';
import './TodoApp.scss';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import {
    TextField,
    Box,
    Button,
    Paper,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    Typography,
    IconButton,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { todoState } from '../mobx/todosState';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Todo = observer(({ todo: { completed, text, id } }) => {
    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton
                        onClick={() => todoState.removeTodo(id)}
                        edge='end'
                        aria-label='comments'>
                        <DeleteForeverIcon />
                    </IconButton>
                }>
                <ListItemIcon>
                    <Checkbox
                        onChange={() => todoState.toggleTodo(id)}
                        edge='start'
                        checked={completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': id }}
                    />
                </ListItemIcon>
                <ListItemText
                    sx={{ textDecoration: `${completed && 'line-through'}` }}
                    id={id}
                    primary={text}
                />
            </ListItem>
            <Divider />
        </>
    );
});

const TodoList = observer(() => {
    return (
        <Item sx={{ width: '100%' }}>
            <List sx={{ padding: 0 }}>
                <Divider />
                {!todoState.todos.length ? (
                    <ListItem>
                        <Typography variant='h6'>No Todos Added</Typography>
                    </ListItem>
                ) : (
                    todoState.todos.map((todo) => <Todo key={todo.id} todo={todo} />)
                )}
            </List>
        </Item>
    );
});

const TodoForm = observer(() => {
    return (
        <Box
            onSubmit={(event) => {
                event.preventDefault();
                todoState.addTodo(event);
                event.target.reset();
            }}
            component='form'
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete='off'>
            <TextField
                name='todo-input'
                required
                id='outlined-required'
                label='Add Todo'
            />
            <Button type='submit' sx={{ padding: 1.875 }} variant='outlined'>
                Add todo
            </Button>
        </Box>
    );
});

const TodoApp = observer(() => {
    return (
        <Grid container flexDirection='column'>
            <Grid
                item
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                <Typography variant='p'>
                    Completed Todos : {todoState.completedTodosCount}
                </Typography>
                <TodoForm />
                <Typography variant='p'>
                    Incompleted Todos :{todoState.incompletedTodosCount}
                </Typography>
            </Grid>
            <Grid item>
                <TodoList />
            </Grid>
        </Grid>
    );
});

export default TodoApp;
